import { useSelector } from "react-redux";
import { selectToasts } from "../../store/toastSlice";
import "./ToastsArea.scss";
import ToastBody from "react-bootstrap/ToastBody";
import { ToastHeader, Toast } from "react-bootstrap";
import { toast } from "../../store/middleware/toast";
export default function ToastsArea() {
  const toasts = useSelector(selectToasts);

  return (
    <div id="toastsArea">
      <Toast>
        <Toast.Header>Some Thing is Wrong!!!</Toast.Header>
        {toasts.map((toast, index) => (
          <Toast.Body key={index}>{toast.message}</Toast.Body>
        ))}
      </Toast>
    </div>
  );
}
