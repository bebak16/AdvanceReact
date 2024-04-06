import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const Pokemons = () => {
  const [pokemonNameList, setPokemonNameList] = useState([]);
  const [pokemonAbilitiesList, setPokemonAbilitiesList] = useState([]);

  const fetchData = async () => {
    try {
      const pokemonResponse = await axios.get(
        "https://pokeapi.co/api/v2/pokemon"
      );
      const result = pokemonResponse.data.results;
      setPokemonNameList(result.map((itr) => itr.name));

      const abilitiesURLs = result.map((itr) => itr.url);

      const abilitiesPromises = abilitiesURLs.map((url) => axios.get(url));

      const abilitiesResponses = await Promise.all(abilitiesPromises);

      const abilitiesData = abilitiesResponses.map((res) => {
        const data2 = res.data.abilities.map((i) => i.ability.name);
        return data2;
      });

      setPokemonAbilitiesList(abilitiesData);
    } catch (error) {
      console.log("Error loading data");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Button onClick={fetchData}>Fetch Pokemon Data</Button>
      {pokemonNameList?.map((name, index) => {
        return (
          <div>
            <ul key={index}>Pokemon Name - {name}</ul>
            Features -
            {pokemonAbilitiesList[index]?.map((itr) => (
              <li>{itr}</li>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Pokemons;
