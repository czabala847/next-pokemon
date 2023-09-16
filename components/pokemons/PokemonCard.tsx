import React from "react";
import Image from "next/image";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { SmallPokemon } from "@/interfaces";

interface Props {
  pokemon: SmallPokemon;
}

export const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const { id, image, name } = pokemon;

  return (
    <Card isHoverable isPressable>
      <CardBody className="py-2">
        <figure className="overflow-hidden max-h-52 flex items-center">
          <Image
            alt={`Image ${name}`}
            className="rounded-xl h-full self-center"
            src={image}
            width={270}
            height={140}
          />
        </figure>
      </CardBody>
      <CardFooter className="flex justify-between">
        <span>{name}</span>
        <span>#{id}</span>
      </CardFooter>
    </Card>
  );
};
