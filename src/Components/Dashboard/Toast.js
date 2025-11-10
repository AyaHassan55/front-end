export default function ToastMessage({ show, message, onClose }) {
  return (
    <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
      <div className={`toast text-white bg-success border-0 ${show ? "show" : "hide"}`} role="alert">
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={onClose}></button>
        </div>
      </div>
    </div>
  );
}
