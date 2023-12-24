import Switch from "./Switch";
import styles from "@/styles/Input.module.css";

import { Chunk } from "./types";
import SignButton from "./SignButton";

type inputTpes = {
  chunk: Chunk;
  onChange: Function;
  isFocused: boolean;
  onFocus: Function;
  
};
const Input = ({ chunk, onChange, isFocused, onFocus }: inputTpes) => {
  const value = parseFloat(chunk.value);

  

  return (
    <div className={styles.container}>
      <div className={`${styles.inputContainer} ${isFocused ? styles.isFocusedConatiner : ''}`} onClick={() => {onFocus()}}>
        <div className={`${styles.inputText} ${isFocused && styles.isFocusedInput}`} >
          <SignButton
            value={chunk.value + ""}
            onClick={() => onChange({ ...chunk, value: -1 * value + "" })}
          />
          <div>
            {Math.abs(value)}
          </div>
        </div>

        <Switch>
          <Switch.Item
            onClick={() => onChange({ value: chunk.value, currency: "$" })}
            selected={chunk.currency === "$"}
          >
            $
          </Switch.Item>
          <Switch.Item
            onClick={() => onChange({ value: chunk.value, currency: "L" })}
            selected={chunk.currency == "L"}
          >
            LL
          </Switch.Item>
        </Switch>
      </div>
    </div>
  );
};
export default Input;
