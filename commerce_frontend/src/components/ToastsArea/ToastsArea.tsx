import { useSelector } from "react-redux";
import { selectToasts } from "../../store/toastSlice";
import "./ToastsArea.scss";
import { ToastBody, Toast } from "react-bootstrap";
import { toast } from "../../store/middleware/toast";
export default function ToastsArea() {
  const toasts = useSelector(selectToasts);

  return (
    <div id="toastsArea">
      <Toast>
        {toasts.map((toast, index) => (
          <Toast.Body key={index} style={{color:"black"}}>{toast.message}</Toast.Body>
        ))}
      </Toast>
    </div>
  );
}
