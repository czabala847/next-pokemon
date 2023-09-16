import React from "react";
import Image from "next/image";

export const NoFavorites = () => {
  return (
    <div
      className="container mx-auto flex flex-col items-center justify-center text-center"
      style={{ height: "calc(100vh - 136px)" }}
    >
      <h1 className="text-4xl mb-4">No hay favoritos</h1>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/16.svg"
        alt="Logo"
        width={150}
        height={150}
      />
    </div>
  );
};
