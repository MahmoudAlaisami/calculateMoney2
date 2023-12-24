import React, {useState} from "react";
import styles from "@/styles/theme.module.css";

interface ChildProps {
  isDarkTheme: boolean;
}

const Img = (props: ChildProps) => {

  const { isDarkTheme } = props;


  

  const changeTheme = () => {
    document.body.classList.toggle('dark-theme');
  };

    return (
      <div className={styles.container} onClick={changeTheme}>
        <img 
        src={isDarkTheme ? './sun.png' : './moon.png'}  
        className={styles.theme} 
        alt=""
        />
      </div>
    )
      
        
}

export default Img;