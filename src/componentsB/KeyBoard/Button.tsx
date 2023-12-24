import React, { useEffect, useRef } from "react";
import styles from "@/styles/KeyBoard.module.css";

type propsTypes = {
  label: React.ReactNode;
  onClick: Function;
  value?: string;
  isSpecial: boolean;
};

const Key = ({ value, label, onClick, isSpecial }: propsTypes) => {
  const buttonInnerContainerClass = isSpecial
    ? `${styles.buttonInnerContainer} ${styles.specialInnerButtonContainer}`
    : styles.buttonInnerContainer;

    const buttonClass = isSpecial
    ? `${styles.button} ${styles.specialButton}`
    : styles.button

  const handleKeyDown = (event: KeyboardEvent) => {
    const pressedKey = event.key;

    if (/^[0-9]$/.test(pressedKey)) {
      onClick(event, pressedKey);
    } else if (pressedKey === "Backspace") {
      onClick(event, "clear");
    } else if (pressedKey === ".") {
      onClick(event, ".");
    } else if (pressedKey === "-") {
      onClick(event, "-");
    } else if (pressedKey === "+") {
      onClick(event, "+");
    } else if (pressedKey === "Delete") {
      onClick(event, "reset");
    } //else if (pressedKey === "Enter") {} upon pressing enter
    //we can switch the animation of the cursor off along with the focused chunk
    // console.log(pressedKey);
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyDown);

    return () => {
      window.removeEventListener("keyup", handleKeyDown);
    };
  });

  return (
    <div className={styles.buttonContainer}>
      <div
        className={buttonInnerContainerClass}
        onClick={(event) => onClick(event, value || label)}
      >
        <div className={buttonClass}>
        {label}
        </div>
      </div>
    </div>
  );
};
export default Key;
