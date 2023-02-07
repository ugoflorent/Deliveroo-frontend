import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Category from "./components/Category";
import logo from "./assets/img/logo-teal.svg";
//import font from "./assets/font/fonts";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3200/");
    //console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <div className="App">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="top-container container">
          <div>
            <h1> {data.restaurant.name} </h1>
            <p className="top-description">{data.restaurant.description} </p>
          </div>
          <img src={data.restaurant.picture} alt="pic-resto" />
        </div>
        <main>
          <div className="container main-part">
            <section className="left-part">
              {data.categories.map((category, index) => {
                if (category.meals.length !== 0) {
                  return <Category category={category} key={index} />;
                } else {
                  return null;
                }
              })}
            </section>
            <section className="right-part">hello</section>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
