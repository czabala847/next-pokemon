import Image from "next/image";
import React from "react";

export const Navbar = () => {
  return (
    <div
      className="flex w-full flex-row items-center justify-between px-5"
      style={{ background: "rgba(255,255,255,0.1)" }}
    >
      <div className="flex items-center">
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
          alt="Logo"
          width={70}
          height={70}
        />

        <h2 className="text-xl font-bold">P</h2>
        <h3>okémon</h3>
      </div>

      <span>Favoritos</span>
    </div>
  );
};
