import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default HomeLayout;