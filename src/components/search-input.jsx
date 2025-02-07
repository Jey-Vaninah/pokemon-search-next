import { useEffect } from "react";

export const SearchInput = ({ searchValue, setSearch, suggestions, showSuggestion }) => {
  useEffect(() => {
    const handleClickOutside = () => {
      setSearch(prev => ({ ...prev, showSuggestion: false }));
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setSearch]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        className="w-full text-black p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Pokémon Name"
        value={searchValue}
        onChange={(event) => setSearch(prev => ({ ...prev, value: event.target.value }))}
        onClick={(event) => {
          event.stopPropagation();
          setSearch(prev => ({ ...prev, showSuggestion: true }));
        }}
      />
      {showSuggestion && (
        <ul className="absolute left-0 mt-1 max-h-48 w-full overflow-auto bg-white border border-gray-200 shadow-md rounded-md z-50">
          {suggestions.map((pokemon) => (
            <SuggestionItem key={pokemon.name} setSearch={setSearch} pokemon={pokemon} />
          ))}
        </ul>
      )}
    </div>
  );
};

const SuggestionItem = ({ pokemon, setSearch }) => {
  return (
    <li
      className="p-2 hover:bg-gray-100 text-black cursor-pointer"
      onClick={(event) => {
        event.stopPropagation();
        setSearch(prev => ({
          ...prev,
          selectedPokemon: pokemon,
          value: pokemon.name,
          showSuggestion: false,
        }));
      }}
    >
      {pokemon.name}
    </li>
  );
};
