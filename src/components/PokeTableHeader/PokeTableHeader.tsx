import { WbText } from "@workbench/react";
import { PokeDropdown } from "../PokeDropdown/PokeDropdown";
import { ChangeEvent } from "react";
import styles from "./pokeTableHeader.module.scss";

const OPTIONS: number[] = [10, 100, 500, 1000, 1500];

type Props = {
  totalResults: number;
  totalFilteredResults: number;
  selectedMaxResults: number;
  onMaxResultChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export function PokeTableHeader({
  totalResults,
  totalFilteredResults,
  selectedMaxResults,
  onMaxResultChange
}: Props) {
  return (
    <div className={styles.headerBar}>
      <PokeDropdown
        label="Max results"
        options={OPTIONS}
        selectedValue={selectedMaxResults}
        onChange={onMaxResultChange}
      />
      <WbText>
        Total results ({totalResults}) / Filtered ({totalFilteredResults})
      </WbText>
    </div>
  );
}
