import Pokedex, { Pokemon } from "pokedex-promise-v2";
import { useEffect, useState } from "react";

export type GetPokemonDetailsProps = {
  pokemonName: string;
  simulateError: boolean;
};

export type PokemonDetailsResult = {
  pokemon: Pokemon;
  isLoading: boolean;
  error: string;
};

export function useGetPokemonDetails({
  pokemonName,
  simulateError
}: GetPokemonDetailsProps): PokemonDetailsResult {
  console.log("Rendering useGetPokemonDetails");
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchPokemonDetails();
  }, [pokemonName]);

  async function fetchPokemonDetails() {
    setIsLoading(true);
    const P = new Pokedex();
    try {
      if (simulateError) throw new Error("Simulating error");
      setPokemon(await P.getPokemonByName(pokemonName));
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return { pokemon, isLoading, error };
}
