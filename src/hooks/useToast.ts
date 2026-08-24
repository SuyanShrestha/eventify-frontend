import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "error";

export const useToast = () => {
  const showToast = (messages: string[], type: ToastType = "error") => {
    messages.forEach((msg) => {
      toast(msg, {
        type,
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
  };

  return { showToast };
};
