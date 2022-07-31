import * as React from "react";
import "./styles/modal.css";

const Modal = ({ onClose, children }: { onClose: Function; children: any }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // const onOuterClick = (e: any) => {
    //   if (ref.current !== null && !ref.current.contains(e.target)) {
    //     onClose();
    //   }
    // };
    // window.addEventListener("click", onOuterClick);
    // return () => {
    //   window.removeEventListener("click", onOuterClick);
    // };
  }, [onClose]);

  return (
    <div className="modal">
      <div className="modal__box" ref={ref}>
        <button
          className="modal__toggle"
          type="button"
          onClick={() => onClose()}
        >
          X
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
