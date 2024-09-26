import { Button, Input, message } from "antd";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("result", result);
        const user = result.user;
        message.success("Successfully signed in with Google");
        navigate('/');
      }).catch((error) => {
        console.error("Google Sign-in Error:", error.message);
        message.error("Failed to sign in with Google");
      });
  }

  const handleSignInWithEmailAndPassword = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        message.success("Successfully signed in");
        navigate('/');
      })
      .catch((error) => {
        console.error("Email/Password Sign-in Error:", error.message);
        message.error("Failed to sign in");
      });
  }

  return (
    <div className="mb-2 my-10 flex flex-col items-center justify-center">
      <form onSubmit={handleSignInWithEmailAndPassword}>
        <div className="flex flex-col max-w-xs md:flex-nowrap gap-4">
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
          <Button type="primary" htmlType="submit" className="my-5">
            Sign In
          </Button>
        </div>
      </form>

      <h1 className="text-center my-4">Or</h1>

      <Button onClick={handleSignInWithGoogle} type="primary">Sign In with Google</Button>
    </div>
  );
}

export default Signin;