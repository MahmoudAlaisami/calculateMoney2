import React, { useState , useRef} from "react";
import html2canvas from "html2canvas";
import Img from "./theme";
import styles from "@/styles/settings.module.css";

const Settings = () => {
    const [openMenu, setOpenMenu] = React.useState<boolean>(false);
    let screenshot:any;

    const handlePrint = () => {
        console.log("....booo");
        
        let printedArea:any = document.getElementById('to-be-printed');
        setOpenMenu(false);
        printedArea.print();
        return false;
    }
    
    const handleScreenshot = () => {
        setOpenMenu(false);
        let screenshotBtn:any = document.getElementById('to-be-printed');// as HTMLDivElement;
        let result = document.querySelector(".result") as HTMLDivElement;

        const promise = html2canvas(screenshotBtn);
        //  console.log('....', {promise, screenshotBtn});

        promise.then(function (canvas) { 
            result.appendChild(canvas);

            screenshot = canvas.toDataURL();
            // console.log(screenshot);

            var link:any = document.createElement('a');
            link.href = screenshot;
            link.download = 'CalculateMoney.png';
    
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
           
        });
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Calculate Money',
                // url: "https://www.youtube.com",
                url: screenshot,
            })
                .then(() => console.log('Image shared successfully'))
                .catch((error) => console.log('Error sharing image:', error));
        } else {
            console.log('Sharing not supported');
        }
    }
    

    return(
        <div>
            <div className={styles.container} onClick={() => setOpenMenu(!openMenu)}>
                <img src={"./menu.png"} className={styles.image} alt=""/>
            </div>

            <div style={{display:"none"}} className="result"></div>

            {openMenu && (

                <div className={styles.menuContainer}>
                    <ul className={styles.menu}>
                        <li className={styles.list} onClick={handlePrint}>print</li>
                        <li className={styles.list} onClick={handleScreenshot}>Screenshot</li>
                        <li className={styles.list} onClick={handleShare}>Share</li>
                        <li className={styles.list} onClick={()=>setOpenMenu(false)}><Img isDarkTheme={false}/></li>
                        <li className={styles.list} onClick={()=>setOpenMenu(false)}>Hello</li>
                    </ul>
                </div>
            )} 

        </div>
        
        
        
          
    )

}

export default Settings;