import React, { useEffect, useState, useContext } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import { auth, db } from "../utils/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CartContext } from "../Context/CartContext"; // 

const CheckOutModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const [continueAsGuest, setContinueAsGuest] = useState(false);
  const isLogin = auth.currentUser;
  const { cartItems, clearCart } = useContext(CartContext);

  useEffect(() => {
    return () => setContinueAsGuest(false);
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      message.success("Signed in successfully");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      message.error("Failed to sign in");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      message.success("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      message.error("Failed to sign out");
    }
  };

  const checkoutOrder = async (values) => {
    try {
      const user = auth.currentUser;
      const orderData = {
        ...values,
        userId: user ? user.uid : 'guest',
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "orders"), orderData);
      message.success(`Order placed successfully! Order ID: ${docRef.id}`);
      clearCart(); // Clear the cart after successful order
      handleOk(); // Close the modal
    } catch (error) {
      console.error("Error adding order to Firestore:", error);
      message.error("Failed to place order. Please try again.");
    }
  };

  return (
    <Modal
      title="Checkout Modal"
      open={isModalOpen}
      onOk={handleOk}
      closable={false}
      footer={null}
      onCancel={handleCancel}
    >
      {!isLogin && !continueAsGuest && (
        <div className="flex flex-col items-center">
          <h1 className="text-center my-5">
            Login to Save your Order's and See Progress
          </h1>
          <Button onClick={handleGoogleSignIn} type="primary">
            Sign in with Google
          </Button>
          <h1 className="text-center my-5">----- OR -----</h1>
          <Button onClick={() => setContinueAsGuest(true)}>
            Continue as a Guest
          </Button>
        </div>
      )}

      {isLogin || continueAsGuest ? (
        <Form onFinish={checkoutOrder} layout="vertical">
          {isLogin && (
            <div className="mb-4">
              <Button onClick={handleLogout} danger>
                Logout
              </Button>
            </div>
          )}
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="number" label="Phone Number" rules={[{ required: true, message: 'Please input your phone number!' }]}>
            <Input type="tel" />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input your address!' }]}>
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Place Order
            </Button>
          </Form.Item>
        </Form>
      ) : null}
    </Modal>
  );
};

export default CheckOutModal;