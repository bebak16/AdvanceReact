import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

function CreditCard() {
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [focus, setFocus] = useState("");

  return (
    <div>
      <Cards
        number={cardNumber}
        name={name}
        expiry={expiry}
        cvc={cvv}
        focused={focus}
      />
      <form className="form">
        <input
          type="tel"
          name="cardNumber"
          value={cardNumber}
          placeholder="Card  Number"
          onChange={(e) => setCardNumber(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />

        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name on Card"
          onChange={(e) => setName(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />

        <input
          type="tel"
          name="expiry"
          value={expiry}
          placeholder="Expiry Date MM/YY"
          onChange={(e) => setExpiry(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />

        <input
          type="tel"
          name="cvc"
          value={cvv}
          placeholder="CVV"
          onChange={(e) => setCvv(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
      </form>
    </div>
  );
}

export default CreditCard;
