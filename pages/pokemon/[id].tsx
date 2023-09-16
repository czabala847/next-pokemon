import React, { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";

import { Layout } from "@/components/layouts";

import { pokeApi } from "@/api";
import { localFavorites } from "@/utils";
import { PokemonFull } from "@/interfaces";

interface Props {
  pokemon: PokemonFull;
}

const PokemonPage: React.FC<Props> = ({ pokemon }) => {
  const { sprites, name, id } = pokemon;
  const [isInFavorite, setIsInFavorite] = useState(
    localFavorites.existInFavorite(id)
  );
  const route = useRouter();

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(id);
    setIsInFavorite(!isInFavorite);
  };

  return (
    <Layout title={`Pokemon | ${name}`}>
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
            <h1 className="text-3xl md:text-5xl font-bold capitalize">
              {name}
            </h1>
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
    </Layout>
  );
};

export default PokemonPage;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemon151.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get<PokemonFull>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data,
    },
  };
};
