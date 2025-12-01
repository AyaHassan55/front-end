import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import './plusMunis.css'
export default function PlusMinusBtn(props) {
  const [btn, setBtn] = useState(1);

  useEffect(() => {
    props.setCount(btn);

    if (props.changeCount) {
      props.changeCount(props.id, btn);
    }
  }, [btn]);

  useEffect(() => {
    if (props.count) {
      setBtn(props.count);
    }
  }, [props.count]);

  return (
    <div className="qty-container d-flex align-items-center">
      <button
        className="qty-btn minus"
        onClick={() => btn > 1 && setBtn(prev => prev - 1)}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>

      <input
        type="text"
        className="qty-input"
        value={btn}
        readOnly
      />

      <button
        className="qty-btn plus"
        onClick={() => setBtn(prev => prev + 1)}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}
