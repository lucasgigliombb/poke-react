import { WbHeading } from "@workbench/react";
import styles from "./pokeDetailsSection.module.scss";
import { useParams } from "react-router-dom";
import {
  GetPokemonDetailsProps,
  useGetPokemonDetails
} from "../../utils/hooks/useGetPokemonDetails";
import { PokeAccordion } from "../PokeAccordion/PokeAccordion";
import { PokeErrorSection } from "../PokeErrorSection/PokeErrorSection";
import { PokeSpinner } from "../PokeSpinner/PokeSpinner";

export function PokeDetailsSection() {
  console.log("Rendering PokeDetailsPage");
  const params = useParams();
  const getDetailsProps: GetPokemonDetailsProps = {
    pokemonName: params.pokemon,
    simulateError: false
  };
  const pkmnDetails = useGetPokemonDetails(getDetailsProps);
  if (pkmnDetails.error !== undefined) {
    return (
      <PokeErrorSection
        body={`Error while trying to catch ${params.pokemon}`}
      />
    );
  } else if (pkmnDetails.isLoading) {
    return <PokeSpinner />;
  } else {
    return (
      <>
        <div className={styles.detailHeader}>
          <WbHeading>{pkmnDetails.pokemon?.name}</WbHeading>
          <img src={pkmnDetails.pokemon?.sprites?.front_default} />
        </div>
        <PokeAccordion pokemon={pkmnDetails.pokemon} />
      </>
    );
  }
}
