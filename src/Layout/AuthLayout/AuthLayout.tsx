import { Outlet } from "react-router-dom";
import imageUrl from '../../assets/news-side-image2.jpg'
import { ToastContainer } from "react-toastify";


export const AuthLayout = () => {


  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-1 gap-4 max-w-full md:grid-cols-2">
        <Outlet />
        <div >
          <img className="lg:flex invisible md:visible h-screen w-auto" src={imageUrl} alt="test" />
        </div>
      </div>
    </>
  );
};
