import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import ReactDOM from "react-dom";

const SearchForm = () => {
  const { setSearchTerms } = useGlobalContext();
  var searchValue = React.useRef("");

  const [clearBtn, setClearBtn] = useState(0);

  const searchCocktail = () => {
    setSearchTerms(searchValue.current.value);
    setClearBtn(searchValue.current.value.length);
  };

  const clearHandler = () => {
    setSearchTerms("");
    searchValue.current.value = "";
    setClearBtn(0);
  };

  useEffect(() => {
    searchValue.current.focus();
  }, []);

  return (
    <section className="section search">
      <form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input
            type="text"
            id="name"
            ref={searchValue}
            onChange={searchCocktail}
          ></input>
          {clearBtn >= 1 ? (
            <button className="clear-btn" onClick={clearHandler}>
              Clear
            </button>
          ) : (
            <> </>
          )}
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
