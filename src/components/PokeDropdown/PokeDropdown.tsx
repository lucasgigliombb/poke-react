import { WbSelect } from "@workbench/react";
import styles from "./pokeDrodown.module.scss";
import { ChangeEvent } from "react";

type Props = {
  label: string;
  options: number[];
  selectedValue: number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export function PokeDropdown({
  label,
  options,
  selectedValue,
  onChange
}: Props) {
  console.log("Rendering PokeDropdown: ", label);

  return (
    <WbSelect compact className={styles.pokeDropdown}>
      <span slot="label">{label}</span>
      <select name="values" value={selectedValue} onChange={onChange}>
        <option value="" disabled>
          {label}
        </option>
        {options.map((o) => {
          return (
            <option value={o} key={o}>
              {o}
            </option>
          );
        })}
      </select>
    </WbSelect>
  );
}
