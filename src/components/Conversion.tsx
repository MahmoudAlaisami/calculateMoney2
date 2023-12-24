
import React, { useState, useEffect } from "react";
import styles from "@/styles/Conversion.module.css";

import Settings from "@/settings";


type propsTypes = {
  value: number;
  onChange: Function;
  onTugglePrompt: Function;
};

const Conversion = ({ value, onChange, onTugglePrompt }: propsTypes) => {
  const [autoConvValue, setAutoConvValue] = React.useState<number>(15000);
  const [isDarkParent, setISDarkParent] =useState(false);
  
  const fetchConversionValue = async () => {
    // try {
    let apiConversionValue: any = await fetch(
      "https://rate.onrender.com/api/v1/dollarRate"
    )
      .then((response) => response.json())
      .then(data => setAutoConvValue(data.buy_rate))
      .catch(error => console.error("Error:", error));
    value = parseFloat(String(autoConvValue).replace(/,/g, ""));
    onChange(value);
    // }
  };

  useEffect(() => {
    fetchConversionValue();
  }, []);
  
  const isParentTheme = (data:any) => {
    setISDarkParent(data);
  }

  return (
    <div className={styles.container}>
      <div className={styles.themeContainer}>
        <Settings func={isParentTheme}/>
      </div>
      <div
        className={styles.conversionRate}
        onClick={() => {
          onTugglePrompt(true);
          // console.log('....promptvalue changed', );
        }}
      >
        <img src={isDarkParent ? './editW.png' : './edit.svg'} alt='' className={styles.image} />
        {value}
      </div>

      
        <span
          className={styles.updateButton}
          onClick={() => {
            fetchConversionValue();
          }}
        >
          update
        </span> 
      
    </div>
  );
};

export default Conversion;
