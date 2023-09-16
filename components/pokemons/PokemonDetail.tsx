import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import confetti from "canvas-confetti";

import { localFavorites } from "@/utils";
import { PokemonFull } from "@/interfaces";

interface Props {
  pokemon: PokemonFull;
}

export const PokemonDetail: React.FC<Props> = ({ pokemon }) => {
  const { sprites, name, id } = pokemon;
  const [isInFavorite, setIsInFavorite] = useState(false);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(id);
    setIsInFavorite(!isInFavorite);

    if (isInFavorite) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  useEffect(() => {
    setIsInFavorite(localFavorites.existInFavorite(id));
  }, [id]);

  return (
    <div className="flex flex-col md:flex-row container gap-4 mx-auto">
      <Card isHoverable className="w-full md:w-[40%] p-8">
        <CardBody>
          <Image
            className="w-full object-cover"
            width={200}
            height={200}
            src={sprites.other?.dream_world.front_default || "/no-image.png"}
            alt={`Pokemon $$name`}
          />
        </CardBody>
      </Card>

      <Card className="flex-1 p-8">
        <CardHeader className="flex flex-col md:flex-row justify-between items-center gap-2">
          <h1 className="text-3xl md:text-5xl font-bold capitalize">{name}</h1>
          <Button
            onClick={onToggleFavorite}
            color={isInFavorite ? "secondary" : "primary"}
          >
            {isInFavorite ? "En favoritos" : "Guardar en favoritos"}
          </Button>
        </CardHeader>
        <CardBody>
          <h3 className="text-xl text-center md:text-left">Sprites:</h3>

          <div className="container grid grid-cols-4 gap-2 md:px-8">
            <Image
              src={sprites.front_default}
              alt={name}
              width={100}
              height={100}
            />
            <Image
              src={sprites.back_default}
              alt={name}
              width={100}
              height={100}
            />
            <Image
              src={sprites.front_shiny}
              alt={name}
              width={100}
              height={100}
            />
            <Image
              src={sprites.back_shiny}
              alt={name}
              width={100}
              height={100}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
