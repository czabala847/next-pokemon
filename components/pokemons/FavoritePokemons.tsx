import React from "react";

interface Props {
  favoritePokemons: number[];
  render: (item: number) => JSX.Element;
}

export const FavoritePokemons: React.FC<Props> = ({
  favoritePokemons,
  render,
}) => {
  return (
    <div className="container mx-auto gap-2 flex justify-start">
      <div className="grid grid-cols-2 md:grid-cols-6 xl:grid-cols-10 gap-4">
        {favoritePokemons.map(render)}
      </div>
    </div>
  );
};
