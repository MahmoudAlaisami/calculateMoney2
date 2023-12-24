import React from "react";
import Board from "./KeyBoard/Board";
import Input from "./Input";
import styles from "@/styles/Calculator.module.css";
import { Chunk } from "./types";
import Results from "./Results";
import Conversion from "./Conversion";

const Calculator = () => {
  const [chunks, setChunks] = React.useState<Chunk[]>([getInitialChunk(false)]);
  const [conversionValue, setConversionValue] = React.useState<number>(15000); //15260
  const [focusIndex, setFocusIndex] = React.useState<number | null>(0);
  const [promptScreen, setPromptScreen] = React.useState<boolean>(false);
  const [lastFocusIndex, setlastFocusIndex] = React.useState<number>(0);
  const [focusSubIndex, setFocusSubIndex] = React.useState<string>("S"); //....
  const [style, setStyle] = React.useState<string>("B"); //.....

  console.log("....chunks", { chunks, focusSubIndex });

  const onButtonclick = (event: any, value: any) => {
    if (typeof focusIndex !== "number") {
      return;
    }
    if (value == "clear") {
      const chunk = chunks[focusIndex];
      const val: string = chunk.value[focusSubIndex];
      const value: string = val.slice(0, -1);
      chunks[focusIndex].value[focusSubIndex] = value == "" ? "0" : value;
      setChunks([...chunks]);
    } else if (value == "-") {
      setChunks([getInitialChunk(true), ...chunks]);
    } else if (value == "+") {
      setChunks([getInitialChunk(false), ...chunks]);
    } else if (value == "reset") {
      // chunks[focusIndex].value = "0";
      setChunks([getInitialChunk(false)]);
    } else {
      chunks[focusIndex].value[focusSubIndex] += value;
      console.log('....value', value);
      setChunks([...chunks.map((_) => _)]);
    }
  };

  const onInputChange = (chunk: any, chunkIndex: number) => {
    chunks[chunkIndex] = chunk;
    setChunks([...chunks]);
  };

  const result = {
    $: 0,
    L: 0,
  };
  {
    style === "A" &&
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
  }
  {
    style === "B" &&
      chunks.forEach((chunk) => {
        if (focusSubIndex === "S") {
          const dollarValue = parseFloat(chunk.value["S"]);
          const lebaneseValue = dollarValue * conversionValue;
          chunk.value["L"] = lebaneseValue.toString();
          result["$"] = result["$"] + dollarValue;
          result.L = result.L + lebaneseValue;
          return;
        }
        if (focusSubIndex === "L") {
          const lebaneseValue = parseFloat(chunk.value["L"]);
          const dollarValue = lebaneseValue / conversionValue;
          chunk.value["S"] = dollarValue.toString();
          result["$"] = parseFloat((result["$"] + dollarValue).toFixed(3));
          result.L = result.L + lebaneseValue;
          return;
        }
      });
  }

  // console.log(focusIndex);

  return (
    <div className={styles.container}>
      <div id="to-be-printed">
        <Conversion value={conversionValue} onChange={setConversionValue} />

        {[...chunks].map((chunk, index) => (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* ADD: the parent div and the other input */}
            <Input
              key={"chunk" + index}
              chunk={chunk}
              valueS={chunk.value["S"]}
              valueL={chunk.value["L"]}
              currency={focusSubIndex}
              isFocused={index == focusIndex}
              onFocus={(currency: string) => {
                setFocusIndex(index);
                setFocusSubIndex(currency)
              }}
              onChange={(chunk: any) => {
                onInputChange(chunk, index);
              }}
            />
          </div>
        ))}

        <div id="result">
          <Results result={result} />
        </div>
      </div>

      <div style={{ justifyContent: "flex-end" }}>
        <Board onButtonClick={onButtonclick} />
      </div>
    </div>
  );
};

export default Calculator;

const getInitialChunk = (isNegative: boolean): Chunk => ({
  value: isNegative ? { L: "-0", S: "-0" } : { L: "0", S: "0" },
  currency: "",
});
