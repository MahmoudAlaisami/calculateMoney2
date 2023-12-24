import React from "react";
import Board from "./KeyBoard/Board";
import InputComponent from "./Input";
import styles from "@/styles/Calculator.module.css";
import { Chunk } from "./types";
import Results from "./Results";
import Conversion from "./Conversion";
import { Modal, Input } from "antd";
import { isNumber } from "util";

const Calculator = () => {
  const [chunks, setChunks] = React.useState<Chunk[]>([getInitialChunk(false)]);
  const [conversionValue, setConversionValue] = React.useState<number>(15000); //15260
  const [focusIndex, setFocusIndex] = React.useState<number | null>(0);
  const [promptScreen, setPromptScreen] = React.useState<boolean>(false);
  const [lastFocusIndex, setlastFocusIndex] = React.useState<number>(0);

  // console.log("....", { chunks });

  const onButtonclick = (event: any, value: any) => {
    if (typeof focusIndex !== "number") {
      return;
    }
    if (value == "clear") {
      const value = chunks[focusIndex].value.slice(0, -1);
      chunks[focusIndex].value = value == "" ? "0" : value;
      setChunks([...chunks]);
    } else if (value == "-") {
      setChunks([getInitialChunk(true), ...chunks]);
    } else if (value == "+") {
      setChunks([getInitialChunk(false), ...chunks]);
    } else if (value == "reset") {
      // chunks[focusIndex].value = "0";
      setChunks([getInitialChunk(false)]);
    } else {
      chunks[focusIndex].value += value;
      setChunks([...chunks.map((_) => _)]);
    }
  };

  const onInputChange = (chunk: any, chunkIndex: number) => {
    chunks[chunkIndex] = chunk;
    setChunks([...chunks]);
  };

  const handlePromptScreen = () => {
    // if(promptScreen) setPromptScreen(false)
    // return
  };

  const handleManualvalue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocusIndex(null);
    let stringNum = e.target.value;
    let num = (stringNum == '')? 0 : parseInt(stringNum);
    setConversionValue(num);
  };

  const onOk = () => {
    setFocusIndex(lastFocusIndex);
    setPromptScreen(false);
  };

  const result = {
    $: 0,
    L: 0,
  };
  chunks.forEach((chunk) => {
    if (chunk.currency == "$") {
      const dollarValue = parseFloat(chunk.value);
      const lebaneseValue = dollarValue * conversionValue;
      result["$"] = result["$"] + dollarValue;
      result.L = result.L + lebaneseValue;
      return;
    }
    if (chunk.currency == "L") {
      const lebaneseValue = parseFloat(chunk.value);
      const dollarValue = lebaneseValue / conversionValue;
      result["$"] = parseFloat((result["$"] + dollarValue).toFixed(3));
      result.L = result.L + lebaneseValue;
    }
  });

  console.log("....promptScreen", promptScreen);

  return (
    <div className={styles.container} onClick={handlePromptScreen}>
      <div id="to-be-printed">
        <Conversion value={conversionValue} onChange={setConversionValue} onTugglePrompt={setPromptScreen} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexFlow: "column-reverse",
          }}
        >
          {[...chunks].map((chunk, index) => (
            <InputComponent
              key={"chunk" + index}
              chunk={chunk}
              isFocused={index == focusIndex}
              onFocus={() => {
                setFocusIndex(index);
                setlastFocusIndex(index);
                // console.log("onFocus");
              }}
              onChange={(chunk: any) => {
                onInputChange(chunk, index);
              }}
            />
          ))}
        </div>
        <div id="result">
          <Results result={result} />
        </div>
      </div>

      <div style={{ justifyContent: "flex-end" }}>
        <Board onButtonClick={onButtonclick} />
      </div>
      <Modal open={promptScreen} onOk={onOk} onCancel={onOk} cancelButtonProps={{ className: styles.cancelButton }} className={styles.modal} wrapClassName={styles.modalWrapper} >
        <div className={styles.modalText}>Please Enter the Conversion Rate</div>
        <span className={styles.modalText}>
          Official Rate: <span style={{ fontWeight: "bold" }}>15000</span>
        </span>
        <Input placeholder="Enter Here" value={conversionValue} onChange={handleManualvalue} className={styles.modalInput}/>
      </Modal>
    </div>
  );
};

export default Calculator;

const getInitialChunk = (isNegative: boolean): Chunk => ({
  value: isNegative ? "-0" : "0",
  currency: "$",
});
