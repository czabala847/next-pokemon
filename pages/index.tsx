import { GetStaticProps } from "next";

import { Layout } from "@/components/layouts";
import { PokemonCard } from "@/components/pokemons";

import { pokeApi } from "@/api";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";

interface Props {
  pokemons: SmallPokemon[];
}

export default function HomePage({ pokemons }: Props) {
  return (
    <Layout title="Listado de pokémons">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 py-8">
        {pokemons.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => {
    const id = index + 1;
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    return { ...pokemon, id: id.toString(), image };
  });

  return {
    props: {
      pokemons,
    },
  };
};
