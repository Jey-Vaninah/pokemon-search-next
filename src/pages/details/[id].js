"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PokemonShow } from "@/components/pokemon-show";
import { axioInstance } from "@/config/axios";

export default function PokemonDetailsPage() {
  const { query } = useRouter();
  const { id } = query;
  const [pokemonDetails, setPokemonDetails] = useState({
    name: "",
    description: "",
    isLoading: true,
  });

  useEffect(() => {
    if (id) {
      const fetchPokemon = async () => {
        try {
          const { data: speciesResponse } = await axioInstance.get(`/pokemon-species/${id}`);
          const { data: pokemonResponse } = await axioInstance.get(`/pokemon/${id}`);

          const description =
            speciesResponse?.flavor_text_entries.find((entry) => entry?.language?.name === "en")
              ?.flavor_text ?? "";
          const name =
            speciesResponse?.names.find((entry) => entry?.language?.name === "en")?.name ?? "";

          setPokemonDetails({
            description,
            name,
            isLoading: false,
            ...pokemonResponse,
          });
        } catch (error) {
          console.error(error);
          window.location.href = "/404";
          setPokemonDetails({ isLoading: false });
        }
      };

      fetchPokemon();
    }
  }, [id]);

  if (!id) {
    return null;
  }

  return (
    <div className="w-full h-screen">
      <div className="f-c-c w-full flex-col h-full">
        <PokemonShow pokemonDetails={pokemonDetails} />
      </div>
    </div>
  );
}
