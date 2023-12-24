import styles from "@/styles/Results.module.css";

type propsTypes = {
  result: { $: number; L: number };
};
const Results = ({ result }: propsTypes) => {
  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>{/*convert*/(result["$"])}$</div>
      <div className={styles.itemContainer}>{result.L}LL</div>
    </div>
  );
};

export default Results;

