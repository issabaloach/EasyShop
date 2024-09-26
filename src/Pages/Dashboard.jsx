import { Outlet } from "react-router";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function Dashboard() {
  return (
    <div>
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
}

export default Dashboard;