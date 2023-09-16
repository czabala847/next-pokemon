import React, { useState, useEffect } from "react";

import { FavoriteCardPokemon, FavoritePokemons } from "@/components/pokemons";
import { NoFavorites } from "@/components/ui";
import { Layout } from "@/components/layouts";

import { localFavorites } from "@/utils";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const pokemons = localFavorites.pokemons();
    setFavorites(pokemons);
  }, []);

  return (
    <Layout title="Pokémons - Favoritos">
      {favorites.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons
          favoritePokemons={favorites}
          render={(id) => <FavoriteCardPokemon id={id} key={id} />}
        />
      )}
    </Layout>
  );
};

export default FavoritesPage;
