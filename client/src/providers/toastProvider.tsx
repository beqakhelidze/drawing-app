import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider:React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ToastContainer position="top-center"/>
      {children}
    </>
  );
};

export default ToastProvider;
