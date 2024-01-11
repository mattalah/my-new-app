import { HeaderComponent } from "Components/HeaderComponent/HeaderComponent";
import { Outlet } from "react-router-dom";


export const SharedLayout = () => {


  return (
    <>
      <HeaderComponent />
      <Outlet />
    </>
  );
};
