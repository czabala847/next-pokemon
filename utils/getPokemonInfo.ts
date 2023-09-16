import { pokeApi } from "@/api";
import { PokemonFull, Sprites } from "@/interfaces";

export const getPokemonInfo = async (
  nameOrId: string
): Promise<{
  id: number;
  name: string;
  sprites: Sprites;
}> => {
  const { data } = await pokeApi.get<PokemonFull>(`/pokemon/${nameOrId}`);

  const pokemon = {
    id: data.id,
    name: data.name,
    sprites: data.sprites,
  };

  return pokemon;
};
