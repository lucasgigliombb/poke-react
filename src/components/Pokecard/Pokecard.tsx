import { WbCard, WbCardLayoutNba, WbText } from "@workbench/react";
import { PokemonSprites } from "pokedex-promise-v2";
import { Link } from "react-router-dom";

type Props = {
  name?: string;
  sprites?: PokemonSprites;
};

export function Pokecard({ name, sprites }: Props) {
  console.log("Rendering Pokecard");
  return (
    <Link to={`/details/${name}`}>
      <WbCard interactive variant="dark-grey">
        <WbCardLayoutNba>
          <img
            src={sprites?.front_default ? sprites.front_default : ""}
            alt={name}
          />
          <WbText size="l" strong>
            {name}
          </WbText>
        </WbCardLayoutNba>
      </WbCard>
    </Link>
  );
}
