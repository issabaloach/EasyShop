import { Button, Input, message } from "antd";
import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("result", result);
        const user = result.user;
        message.success("Successfully signed up with Google");
        navigate('/');
      }).catch((error) => {
        console.error("Google Sign-up Error:", error.message);
        message.error("Failed to sign up with Google");
      });
  }

  const handleManualSignup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        message.success("Successfully signed up");
        navigate('/');
        
      })
      .catch((error) => {
        console.error("Manual Sign-up Error:", error.message);
        message.error("Failed to sign up");
      });
  }

  return (
    <div className="mb-2 my-10 flex flex-col items-center justify-center">
      <form onSubmit={handleManualSignup}>
        <div className="flex flex-col max-w-xs md:flex-nowrap gap-4">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter Your Username"
          />
          <Input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Your Email"
          />
          <Input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
          />
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </div>
      </form>
      
      <h1 className="text-center my-7">Or</h1>

      <Button onClick={handleSignInWithGoogle} type="primary">Sign Up with Google</Button>
    </div>
  );
}

export default Signup;