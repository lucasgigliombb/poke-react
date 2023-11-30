import { WbSpinner } from "@workbench/react";
import styles from "./pokeSpinner.module.scss";

export function PokeSpinner() {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinnerContainer}>
        <WbSpinner theme="dark" className={styles.spinner} />;
      </div>
    </div>
  );
}
