"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { PokemonShow } from "@/components/pokemon-show";

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
          const { data: speciesResponse } = await axios.get(`/api/pokemon-species/${id}`);
          const { data: pokemonResponse } = await axios.get(`/api/pokemon/${id}`);

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
    <div className="w-full min-h-screen">
      <div className="f-c-c">
        <PokemonShow pokemonDetails={pokemonDetails} />
      </div>
    </div>
  );
}
