import React, { useState, useContext, useEffect } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const getLocalStorage = () => {
  const listCocktail = localStorage.getItem("listCocktail");
  if (listCocktail) {
    return JSON.parse(listCocktail);
  } //To convert into Object
  else {
    return [];
  }
};

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerms, setSearchTerms] = useState("a");
  const [cocktails, setCocktails] = useState(getLocalStorage);

  const fetchDrinks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url} ${searchTerms}`);
      const data = await response.json();
      const { drinks } = data;

      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrinks();
    localStorage.setItem("listCocktail", JSON.stringify(cocktails));
  }, [searchTerms]);

  return (
    <AppContext.Provider
      value={{
        loading,
        cocktails,
        setSearchTerms,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
