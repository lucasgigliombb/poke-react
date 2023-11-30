import { ChangeEvent, useCallback, useState } from "react";
import {
  GetPokemonListProps,
  PokeResult,
  useGetPokemonList
} from "../../utils/hooks/useGetPokemonList";
import { PokeSpinner } from "../PokeSpinner/PokeSpinner";
import { PokeErrorSection } from "../PokeErrorSection/PokeErrorSection";
import { PokeResultTable } from "../PokeResultTable/PokeResultTable";
import { PokeTableHeader } from "../PokeTableHeader/PokeTableHeader";
import { PokeFooter } from "../PokeFooter/PokeFooter";
import { PokeGrid } from "../PokeGrid/PokeGrid";

export function PokeResultSection() {
  console.log("Rendering PokeResultSection");
  const [maxResults, setMaxResults] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [pkmnPerPage, setPkmnPerPage] = useState(5);
  const [searchString, setSearchString] = useState("");
  const getProps: GetPokemonListProps = {
    maxResults: maxResults,
    pkmnPerPage: pkmnPerPage,
    currPage: currentPage,
    searchString: searchString,
    simulateError: false,
    interval: { limit: maxResults, offset: 0 }
  };
  const pokeResult: PokeResult = useGetPokemonList(getProps);

  const handlePageChange = useCallback(
    (event: CustomEvent) => {
      setCurrentPage(event.detail);
    },
    [currentPage]
  );

  const handlePageSize = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const pageSize = parseInt(event.target.value);
      if (Number.isNaN(pageSize)) console.error("Invalid page size");
      setPkmnPerPage(Number(event.target.value));
    },
    [pkmnPerPage]
  );

  const handleSearch = useCallback(
    (str: string) => {
      setSearchString(str);
    },
    [searchString]
  );
  const handleMaxResults = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const maxRes = parseInt(event.target.value);
      if (Number.isNaN(maxRes)) console.error("Invalid page size");
      setMaxResults(maxRes);
    },
    [maxResults]
  );

  if (pokeResult.error !== undefined) {
    return (
      <PokeErrorSection body={"Error while trying to catch some Pokémons"} />
    );
  } else if (pokeResult.isLoading) {
    return <PokeSpinner />;
  } else {
    return (
      <div>
        <PokeTableHeader
          totalResults={pokeResult.totalResults}
          totalFilteredResults={pokeResult.totalFilteredResults}
          selectedMaxResults={maxResults}
          onMaxResultChange={handleMaxResults}
        />
        <PokeGrid
          pokemonList={pokeResult.currentPage}
          searchHandler={handleSearch}
        />
        <PokeResultTable
          pokemonList={pokeResult.currentPage}
          totalResults={pokeResult.totalResults}
          totalFilteredResults={pokeResult.totalFilteredResults}
          searchHandler={handleSearch}
          maxResultHandler={handleMaxResults}
        />
        {pokeResult.currentPage.length === 0 && searchString !== "" ? (
          <PokeErrorSection
            body={"No Pokémons found with the current selection"}
          />
        ) : (
          <PokeFooter
            maxResults={pokeResult.totalFilteredResults}
            pkmnPerPage={getProps.pkmnPerPage}
            currentPage={getProps.currPage}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSize}
          />
        )}
      </div>
    );
  }
}
