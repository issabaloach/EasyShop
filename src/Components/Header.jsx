import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Image } from "antd";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

function Header() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/"); 
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="text-gray-600 shadow body-font">
      <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
        <Link to={"/"}>
          <Image
            height={50}
            width={50}
            className="rounded-full"
            preview={false}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThCF0lXNsbXTjAaRLHxx3LoRv5XJTtBUNoVw&s"
          />
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link to={"/Products"} className="mr-5 hover:text-gray-900">
            Products
          </Link>
          <Link to={"/Orders"} className="mr-5 hover:text-gray-900">
            Orders
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="mr-2">{user.displayName || user.email}</span>
              <Avatar size={40} icon={<UserOutlined />} />
              <Button 
                className="cursor-pointer" 
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button 
              className="cursor-pointer" 
              onClick={() => navigate("/auth")}
            >
              Login
            </Button>
          )}
          <Link to={"/cart"}>
            <Badge count={cartItems.length}>
              <ShoppingCartOutlined
                style={{
                  fontSize: 30,
                  color: "green",
                }}
              />
            </Badge>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;