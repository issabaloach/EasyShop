import { Button } from "antd";
import { Link } from "react-router-dom";

function Auth() {
  return (
    <div
      className="h-screen w-screen flex flex-col 
        items-center
        justify-center space-y-4"
    >
      {/* Login with Google Button */}
      <Link to="/auth/login">
      <Button type="primary">Login With Google</Button>
      </Link>
      

      {/* Login with Email Button wrapped in Link */}
      <Link to="/auth/login">
        <Button type="default">Login with Email</Button>
      </Link>

      {/* Sign-up link */}
      <h1 className="text-lg">
        Don't have an account?{" "}
        <Link to="/auth/signup" className="text-blue-500">
          Create Account
        </Link>
      </h1>
    </div>
  );
}

export default Auth;