import { useSelector } from "react-redux";
import { selectToasts } from "../../store/toastSlice";
import "./ToastsArea.scss";

export default function ToastsArea() {
  const toasts = useSelector(selectToasts);

  return (
    <div id="toastsArea">
      {toasts.map((toast, index) => (
        <div key={index}>{toast.message}</div>
      ))}
    </div>
  );
}
