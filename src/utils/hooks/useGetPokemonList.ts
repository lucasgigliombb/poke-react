import Pokedex, { Pokemon } from "pokedex-promise-v2";
import { useEffect, useMemo, useState } from "react";

export type GetPokemonListProps = {
  maxResults: number;
  pkmnPerPage: number;
  currPage: number;
  searchString: string;
  simulateError: boolean;
  interval: { limit: number; offset: number };
};

export type PokeResult = {
  currentPage: Pokemon[];
  totalResults: number;
  totalFilteredResults: number;
  isLoading: boolean;
  error: string;
};

export function useGetPokemonList(props: GetPokemonListProps): PokeResult {
  console.log("Rendering useGetPokemonList");
  const [results, setResults] = useState<Pokemon[]>([]);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const currentPage: Pokemon[] = useMemo(() => {
    return getCurrentPage();
  }, [props, results]);
  const totalFilteredResults = useMemo(() => {
    return getFilteredResults().length;
  }, [currentPage]);

  useEffect(() => {
    fetchPokemons();
  }, [props.maxResults]);

  async function fetchPokemons() {
    setIsLoading(true);
    const P = new Pokedex();
    try {
      if (props.simulateError) throw new Error("Simulating error");
      const pkmnList = await P.getPokemonsList(props.interval);
      const pokeUrlList: string[] = pkmnList.results.map((res) => res.url);
      setResults(await P.getResource(pokeUrlList));
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  function getCurrentPage() {
    const filteredResults = getFilteredResults();
    const iLastPkmn = props.currPage * props.pkmnPerPage;
    const iFirstPkmn = iLastPkmn - props.pkmnPerPage;
    return filteredResults.slice(iFirstPkmn, iLastPkmn);
  }

  function getFilteredResults(): Pokemon[] {
    if (props.searchString !== "") {
      return results.filter((p) => {
        return p.name.toLowerCase().includes(props.searchString.toLowerCase());
      });
    } else {
      return results;
    }
  }

  return {
    currentPage: currentPage,
    totalResults: results.length,
    totalFilteredResults: totalFilteredResults,
    isLoading: isLoading,
    error: error
  };
}
