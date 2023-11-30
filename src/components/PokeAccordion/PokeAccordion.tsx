import { WbAccordion, WbAccordionItem } from "@workbench/react";
import { Pokemon } from "pokedex-promise-v2";
import { PokeDetailTable } from "../PokeDetailsSection/PokeDetailTable/PokeDetailTable";
import styles from "./pokeAccordion.module.scss";

type Props = {
  pokemon: Pokemon;
};
export function PokeAccordion({ pokemon }: Props) {
  if (pokemon === undefined) {
    return <></>;
  } else {
    return (
      <WbAccordion>
        {Object.keys(pokemon).map((field) => {
          return (
            <WbAccordionItem key={field} className={styles.item}>
              <span slot="header">{field}</span>
              <span slot="mobile-header">Close</span>
              <div slot="content">
                {!Array.isArray(pokemon[field]) &&
                pokemon[field] === Object(pokemon[field]) ? (
                  <PokeDetailTable pokeJson={[pokemon[field]]} />
                ) : Array.isArray(pokemon[field]) ? (
                  <PokeDetailTable pokeJson={pokemon[field]} />
                ) : (
                  pokemon[field]
                )}
              </div>
            </WbAccordionItem>
          );
        })}
      </WbAccordion>
    );
  }
}
