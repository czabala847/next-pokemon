import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";

import { Layout } from "@/components/layouts";
import { pokeApi } from "@/api";
import { PokemonFull } from "@/interfaces";

interface Props {
  pokemon: PokemonFull;
}

const PokemonPage: React.FC<Props> = ({ pokemon }) => {
  console.log(pokemon);

  return (
    <Layout title="Pokemon #">
      <h1>Pokemon</h1>
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
