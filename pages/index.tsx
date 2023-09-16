import { GetStaticProps } from "next";

import { Layout } from "@/components/layouts";

import { pokeApi } from "@/api";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";

interface Props {
  pokemons: SmallPokemon[];
}

export default function HomePage({ pokemons }: Props) {
  return (
    <Layout title="Listado de pokémons">
      <div>
        <ul>
          {pokemons.map(({ id, name }) => (
            <li key={id}>
              {id} - {name}
            </li>
          ))}
        </ul>
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
