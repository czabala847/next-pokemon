import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";

import { Layout } from "@/components/layouts";
import { PokemonDetail } from "@/components/pokemons";

import { pokeApi } from "@/api";
import { PokemonFull, PokemonListResponse } from "@/interfaces";

interface Props {
  pokemon: PokemonFull;
}

const PokemonByNamePage: React.FC<Props> = ({ pokemon }) => {
  return (
    <Layout title={`Pokémon name ${pokemon.name}`}>
      <PokemonDetail pokemon={pokemon} />
    </Layout>
  );
};

export default PokemonByNamePage;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemon151Names: string[] = data.results.map(({ name }) => name);

  const paths = pokemon151Names.map((name) => ({
    params: { name },
  }));

  return {
    paths: pokemon151Names.map((name) => ({
      params: { name },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  const { data } = await pokeApi.get<PokemonFull>(`/pokemon/${name}`);

  return {
    props: {
      pokemon: data,
    },
  };
};
