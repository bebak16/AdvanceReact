import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
import DatePickerApp from "./DatePickerApp";
import CreditCard from "./CreditCard";
import Mock from "./Mock";

const url = "https://course-api.com/react-tours-project";

const TourApp = () => {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log("Error in Fetching Data" + error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return (
    <main>
      <Mock />
      <DatePickerApp />
      <CreditCard />
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};

export default TourApp;
