import styles from "@/styles/Sign.module.css";

type propsTpes = {
  value: string;
  onClick: React.MouseEventHandler;
};
const SignButton = ({ value, onClick }: propsTpes) => {
  return (
    <div className={`${styles.container} ${value.startsWith('-') ? styles.negativeValue : ''}`} onClick={onClick}>
      {value.startsWith("-") ? "-" : "+"}
    </div>
  );
};

export default SignButton;
