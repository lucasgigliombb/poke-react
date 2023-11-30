import { WbErrorSection, WbHeading, WbText } from "@workbench/react";

type Props = {
  body: string;
};

export function PokeErrorSection({ body }: Props) {
  console.error("Rendering PokeErrorSection: ", body);
  return (
    <WbErrorSection
      imageSrc={require("../../assets/pkmn_sad.jpg")}
      imageLabel="Error image"
    >
      <WbHeading>Ups, something went wrong here!</WbHeading>
      <WbText>{body}</WbText>
    </WbErrorSection>
  );
}
