import { ToastOptions, ToastPosition, TypeOptions, toast as toastify } from "react-toastify";

const TIMER:number = 2000;
const POSITION:ToastPosition = "top-center";
const OPTIONS: ToastOptions = {
  position: POSITION,
  autoClose: TIMER,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored"
};

export default function useToast(message:any = "", type:TypeOptions = "default") {
  toastify(message, {
    ...OPTIONS,
    type: type,
    ...(type === "warning" ? {autoClose: 3000}:{})
  })
}