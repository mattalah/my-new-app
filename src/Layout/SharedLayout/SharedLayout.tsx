import { HeaderComponent } from "Components/HeaderComponent/HeaderComponent";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";


export const SharedLayout = () => {


  return (
    <>
      <ToastContainer />
      <HeaderComponent />
      <Outlet />
    </>
  );
};
