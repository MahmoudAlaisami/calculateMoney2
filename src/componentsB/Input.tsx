import styles from "@/styles/Input.module.css";

import { Chunk } from "./types";
import SignButton from "./SignButton";

type inputTpes = {
  chunk: Chunk;
  onChange: Function;
  isFocused: boolean;
  onFocus: Function;
  valueS: string;
  valueL: string;
  currency: string;
};

const Input = ({ chunk, onChange, isFocused, onFocus, valueS, valueL, currency }: inputTpes) => {
  const valueSS = parseFloat(valueS);
  const valueLL = parseFloat(valueL);
  console.log('....value', valueSS, valueLL);

  

  return (
    <div className={styles.container}>
      <SignButton
        value={chunk.value + ""}
        onClick={() => onChange({ ...chunk, value: -1 * valueSS + "" })}
      />
      <div className={`${styles.inputContainer} ${isFocused && currency == "S" ? styles.isFocusedConatiner : ''}`} onClick={() => {onFocus("S")}}>
        <div className={`${styles.inputText} ${isFocused && currency == "S" && styles.isFocusedInput}`} >
          {Math.abs(valueSS)}
        </div>
      </div>
      <div className={`${styles.inputContainer} ${isFocused && currency == "L" ? styles.isFocusedConatiner : ''}`} onClick={() => {onFocus("L")}}>
        <div className={`${styles.inputText} ${isFocused && currency == "L" && styles.isFocusedInput}`} >
            {Math.abs(valueLL)}
        </div>
      </div>
    </div>
  );
};
export default Input;
