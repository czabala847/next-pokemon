import React from "react";
import Image from "next/image";

import { Card } from "@nextui-org/react";
import { useRouter } from "next/router";

interface Props {
  id: number;
}

export const FavoriteCardPokemon: React.FC<Props> = ({ id }) => {
  const router = useRouter();

  const onGoToPokemon = () => {
    router.push(`/pokemon/${id}`);
  };

  return (
    <Card
      isHoverable
      isPressable
      key={id}
      className="p-4 flex items-center justify-center"
      onClick={onGoToPokemon}
    >
      <figure className="max-h-[150px] overflow-hidden">
        <Image
          className="h-full object-cover w-full"
          alt={`Pokémon ${id}`}
          width={120}
          height={120}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        />
      </figure>
    </Card>
  );
};
