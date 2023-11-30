import { WbDataTable, WbTable, WbVerticalScroll } from "@workbench/react";
import { PokeCardRows } from "../PokeCardRows/PokeCardRows";
import { Pokemon } from "pokedex-promise-v2";
import { useEffect, useState } from "react";
import styles from "./pokeResultTable.module.scss";

type Props = {
  pokemonList: Pokemon[];
  totalResults: number;
  totalFilteredResults: number;
  searchHandler: Function;
  maxResultHandler: Function;
};

export function PokeResultTable({ pokemonList, searchHandler }: Props) {
  console.log("Rendering PokeResultTable");
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const delayFunction = setTimeout(() => {
      searchHandler(searchString);
    }, 1000);

    return () => clearTimeout(delayFunction);
  }, [searchString]);

  return (
    <WbDataTable onWbsearch={handleSearch}>
      <WbTable>
        {pokemonList.length > 0 ? (
          <WbVerticalScroll className={styles.verticalScroll}>
            <PokeCardRows pokemonList={pokemonList} />
          </WbVerticalScroll>
        ) : (
          <></>
        )}
      </WbTable>
    </WbDataTable>
  );

  function handleSearch(event: CustomEvent) {
    setSearchString(event.detail.value); // this is causing all related components to re-render.. maybe I should try something different
  }
}
