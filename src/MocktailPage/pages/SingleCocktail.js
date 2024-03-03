import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [data, setData] = React.useState([]);

  const cocktail = async () => {
    const Response = await fetch(`${url}${id}`);
    const cocktailData = await Response.json();
    setData(cocktailData.drinks[0]);
  };

  React.useEffect(() => {
    cocktail();
  }, []);

  const {
    strDrinkThumb,
    strInstructions,
    strCategory,
    idDrink,
    strAlcoholic,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
  } = data;
  return (
    <div>
      <h1 style={{ textAlign: "center", color: "green", marginTop: "30px" }}>
        Cocktail Details of {id}
      </h1>

      <div style={{ display: "flex", textAlign: "justify" }}>
        <img
          src={strDrinkThumb}
          alt={idDrink}
          style={{
            borderRadius: "8px",
            display: "grid",
            marginRight: "10px",
            width: "30%",
            marginLeft: "20%",
          }}
        />

        <div>
          <p>
            {" "}
            <b>Ingredient 1 : </b> {strIngredient1}
          </p>
          <p>
            {" "}
            <b>Ingredient 2 : </b> {strIngredient2}
          </p>
          <p>
            {" "}
            <b>Ingredient 3 : </b> {strIngredient3}
          </p>
          <p>
            {" "}
            <b>Ingredient 4 : </b> {strIngredient4}
          </p>
          <p>
            {" "}
            <b>Instructions: </b>
            {strInstructions}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleCocktail;
