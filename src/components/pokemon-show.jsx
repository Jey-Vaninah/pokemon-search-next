"use client"

import { useRouter } from "next/router";
import Image from "next/image"

export const PokemonShow = ({ pokemonDetails }) => {
  const router = useRouter();
  const { other, versions, ...sprites } = pokemonDetails?.sprites ?? {};
  const images = Object.values(sprites ?? {});
  const defaultImage = other?.home?.front_default ?? "";

  return (
    <>
      <button onClick={() => router.push("/")} className="absolute top-10 left-10">
        Go Home
      </button>
      <div className="flex gap-8 w-full">
        <div className="flex flex-col p-4 w-[500px] bg-white rounded-md shadow-lg">
          <p className="text-xl font-bold capitalize text-black">
            {pokemonDetails?.isLoading ? "Loading..." : pokemonDetails?.name}
          </p>
          <img src={defaultImage} className="w-[250px]" />
          <p className="text-black text-center">
            {pokemonDetails?.isLoading ? "Loading..." : pokemonDetails?.description}
          </p>
        </div>
        <div className="flex flex-col p-4 w-[500px] bg-white rounded-md shadow-lg">
          <p className="text-xl font-bold capitalize text-black">Sprites</p>
          <div className="flex gap-4 flex-wrap w-full">
            {images.map((image, index) => (
              <Image key={index} src={image} className="w-[100px]" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
