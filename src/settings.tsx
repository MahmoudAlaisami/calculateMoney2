import React, { ReactElement, useState } from "react";
import html2canvas from "html2canvas";
import Img from "./components/theme";
import styles from "@/styles/settings.module.css";
import { Modal } from "antd";
import { backgroundClip } from "html2canvas/dist/types/css/property-descriptors/background-clip";

const Settings = (props: any) => {
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  let screenshot: any;
  props.func(isDarkTheme);

  const handlePrint = () => {
    setOpenMenu(false);
    setTimeout(
      () => window.print(), 
      100
    );
    return false;
  };

  const handleScreenshot = () => {
    setOpenMenu(false);
    let screenshotDiv: any = document.getElementById("to-be-printed"); // as HTMLDivElement;
    let result = document.querySelector(".result") as HTMLDivElement;

    const promise = html2canvas(screenshotDiv);
    //  console.log('....', {promise, screenshotDiv});

    promise.then(function (canvas) {
      result.appendChild(canvas);

      screenshot = canvas.toDataURL();
      // console.log(screenshot);

      var link: any = document.createElement("a");
      link.href = screenshot;
      link.download = "CalculateMoney.png";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleShare = () => {
    setOpenMenu(false);
    if (navigator.share) {
      navigator
        .share({
          title: "Calculate Money",
          url: "https://www.youtube.com",
          // url: screenshot,
        })
        .then(() => console.log("Image shared successfully"))
        .catch((error) => console.log("Error sharing image:", error));
    } else {
      alert("Sharing not supported");
      console.log("Sharing not supported");
    }
  };

  const handleTheme = () => {
    setOpenMenu(false);
    setIsDarkTheme(!isDarkTheme);
  };

  const handlePageShare = () => {
    setOpenMenu(false);
    if (navigator.share) {
      navigator
        .share({
          title: "Calculate Money",
          url: "calculatemoney.click",
        })
        .then(() => console.log("Image shared successfully"))
        .catch((error) => console.log("Error sharing image:", error));
    } else {
      console.log("Sharing not supported");
    }
  };

  return (
    <div>
      <div className={styles.container} onClick={() => setOpenMenu(!openMenu)}>
        <img src={isDarkTheme ? "./menuW.png" : "./menu.png"} className={styles.image} alt="" />
      </div>

      <div style={{ display: "none" }} className="result"></div>

      <Modal open={openMenu} footer={null} onCancel={() => setOpenMenu(false)} className={styles.modal} wrapClassName={styles.modalWrapper}>
        <ul className={styles.menu}>
          {[
            { label: "print", onClick: handlePrint },
            { label: "Screenshot", onClick: handleScreenshot },
            { label: "Share", onClick: handleShare },
            { label: <Img isDarkTheme={isDarkTheme} />, onClick: handleTheme },
            { label: "Share Page", onClick: handlePageShare },
          ].map((item, index) => (
            <li key={index} className={styles.list} onClick={item.onClick}>
              {item.label}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default Settings;
