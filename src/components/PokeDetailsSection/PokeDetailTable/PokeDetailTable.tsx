import {
  WbTable,
  WbTableCell,
  WbTableHeader,
  WbTableRow
} from "@workbench/react";
import styles from "./pokeDetailTable.module.scss";

type Props = {
  pokeJson: Object[];
};
export function PokeDetailTable({ pokeJson }: Props) {
  if (pokeJson.length > 0)
    return (
      <WbTable lined="all">
        <WbTableRow>
          {Object.keys(pokeJson[0]).map((field) => (
            <WbTableHeader key={field}>{field}</WbTableHeader>
          ))}
        </WbTableRow>
        {Object.entries(pokeJson).map(([key, entry]) => (
          <WbTableRow key={key}>
            {Object.values(entry).map((value) => (
              <WbTableCell
                className={styles.tableCell}
                key={JSON.stringify(value)}
              >
                {value !== null && value.hasOwnProperty("name") ? (
                  value.name
                ) : value === Object(value) ? (
                  <PokeDetailTable pokeJson={value} />
                ) : (
                  value?.toString()
                )}
              </WbTableCell>
            ))}
          </WbTableRow>
        ))}
      </WbTable>
    );
  else {
    return <></>;
  }
}
