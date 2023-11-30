import { WbGrid, WbGridCol, WbGridRow } from "@workbench/react";
import { useGetMediaQuery } from "../../utils/hooks/useGetMediaQuery";
import styles from "./pokeGrid.module.scss";
import { Pokemon } from "pokedex-promise-v2";
import { MediaQuery } from "@workbench/core";
import { Pokecard } from "../Pokecard/Pokecard";

const MEDIA_QUERIES: MediaQuery[] = ["mq1", "mq2", "mq3", "mq4", "mq5", "mq6"];

type Props = {
  pokemonList: Pokemon[];
  searchHandler: Function;
};

export function PokeGrid({ pokemonList, searchHandler }: Props) {
  const mediaQuery = useGetMediaQuery({ breakpoints: MEDIA_QUERIES });
  return (
    <WbGrid fullWidth className={styles.marginY}>
      {<h1>{mediaQuery.toString()}</h1>}
      {buildGridRows()}
    </WbGrid>
  );

  function buildGridRows() {
    if (mediaQuery === "mq1" || mediaQuery === "mq2") {
      console.log("rendering mq1");
      return _buildRow(1);
    } else if (
      mediaQuery === "mq3" ||
      mediaQuery === "mq4" ||
      mediaQuery === "mq5"
    ) {
      console.log("rendering mq3");
      return _buildRow(2);
    } else if (mediaQuery === "mq6") {
      console.log("rendering mq6");
      return _buildRow(3);
    }
  }

  function buildCards() {
    return pokemonList.map((pokemon) => (
      <Pokecard
        key={pokemon.name}
        name={pokemon.name}
        sprites={pokemon.sprites}
      />
    ));
  }

  function _buildRow(columns: number) {
    const cards = buildCards();
    const rows = [];
    const totalRows = cards.length / columns;
    let currIndex = 0;
    for (let i = 0; i < totalRows; i++) {
      rows.push(<WbGridRow>{buildColumns(currIndex, columns)}</WbGridRow>);
      currIndex += columns;
    }
    return rows;
  }

  function buildColumns(currIndex: number, columns: number) {
    const cols = [];
    for (let i = 0; i < columns && currIndex < pokemonList.length; i++) {
      cols.push(
        <WbGridCol mq1="12" mq3="6" mq6="3" style={{ overflow: "visible" }}>
          <Pokecard
            key={pokemonList[currIndex].name}
            name={pokemonList[currIndex].name}
            sprites={pokemonList[currIndex].sprites}
          />
        </WbGridCol>
      );
      currIndex++;
    }
    return cols;
  }
}
