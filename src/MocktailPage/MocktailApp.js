import React from "react";
import CocktailList from "./components/CocktailList";
import SearchForm from "./components/SearchForm";

const MocktailApp = () => {
  return (
    <div>
      <SearchForm />
      <CocktailList />
    </div>
  );
};

export default MocktailApp;
