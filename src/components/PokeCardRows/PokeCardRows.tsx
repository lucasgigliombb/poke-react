import { WbTableCell, WbTableRow } from "@workbench/react";
import { Pokemon } from "pokedex-promise-v2";
import { Pokecard } from "../Pokecard/Pokecard";
import styles from "./pokeCardRows.module.scss";

type Props = {
  pokemonList: Pokemon[];
};

export function PokeCardRows({ pokemonList }: Props) {
  console.log("Rendering PokeCardRows");

  return pokemonList.map((pokemon) => {
    return (
      <WbTableRow key={pokemon.name} className={styles.tableRow}>
        <WbTableCell>
          <Pokecard name={pokemon.name} sprites={pokemon.sprites} />
        </WbTableCell>
      </WbTableRow>
    );
  });
}
