import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './assets/toasts.css';

export default function Toasts() {
  return (
    <ToastContainer
      hideProgressBar
      closeButton={false}
      icon={false}
      theme='dark'
      position={'bottom-left'}
    />
  );
}
