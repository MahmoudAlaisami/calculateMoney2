import styles from "@/styles/Row.module.css";
type inputTpes = {
  children: any;
};
const Row = ({ children }: inputTpes) => {
  return <div className={styles.container}>{children}</div>;
};

export default Row;
