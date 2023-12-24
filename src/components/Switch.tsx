import styles from "@/styles/Switch.module.css";

type switchType = { children: JSX.Element[] };
const Switch = ({ children }: switchType) => {
  return <div className={styles.container}>{children}</div>;
};

type itemProps = {
  children: any;
  selected?: boolean;
  onClick: React.MouseEventHandler;
};
const Item = ({ children, selected, onClick }: itemProps) => {
  return (
    <div
      onClick={onClick}
      className={[
        styles.itemContainer,
        selected && styles.itemContainerSelected,
      ].join(" ")}
    >
      <div className={styles.itemInnerContainer}>{children}</div>
    </div>
  );
};

Switch.Item = Item;
export default Switch;
