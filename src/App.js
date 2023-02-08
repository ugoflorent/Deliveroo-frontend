import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Category from "./components/Category";
import logo from "./assets/img/logo-teal.svg";
//import font from "./assets/font/fonts";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3200/");
        //console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (meal) => {
    const cartCopy = [...cart];
    //let isPresent = false;
    //for (let i = 0; i < cartCopy.length; i++) {
    // if (cartCopy[i].id === meal.id) {
    //   cartCopy[i].quantity++;
    //    isPresent = true;
    //    break;
    //  }
    //}

    //if (isPresent === false) {
    //  const mealCopy = { ...meal, quantity: 1 };
    //cartCopy.push(mealCopy);
    //}

    const mealPresent = cartCopy.find((elem) => elem.id === meal.id);
    if (mealPresent) {
      mealPresent.quantity++;
    } else {
      cartCopy.push({ ...meal, quantity: 1 });
    }

    setCart(cartCopy);
  };

  const handleRemoveFromCart = (meal) => {
    const cartCopy = [...cart];
    const mealInCart = cartCopy.find((elem) => elem.id === meal.id);
    if (mealInCart.quantity === 1) {
      const index = cartCopy.indexOf(mealInCart);
      cartCopy.splice(index, 1);
    } else {
      mealInCart.quantity--;
    }

    setCart(cartCopy);
  };

  let total = 0;

  //for (let i = 0; i < cart.length; i++) {
  //  total += cart[i].price * cart[i].quantity;
  //}
  //console.log(total);

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
                  return (
                    <Category
                      category={category}
                      key={index}
                      handleAddToCart={handleAddToCart}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </section>
            <section className="right-part">
              {cart.length === 0 ? (
                <p>Votre panier est vide</p>
              ) : (
                <div>
                  <h2>Votre panier contient : </h2>
                  {cart.map((meal) => {
                    total += meal.price * meal.quantity;
                    return (
                      <div key={meal.id}>
                        <button
                          onClick={() => {
                            handleRemoveFromCart(meal);
                          }}
                        >
                          -
                        </button>
                        <span>{meal.quantity}</span>
                        <button
                          onClick={() => {
                            handleAddToCart(meal);
                          }}
                        >
                          +
                        </button>
                        <span>{meal.title}</span>
                        <span>{(meal.price * meal.quantity).toFixed(2)} €</span>
                      </div>
                    );
                  })}
                  <p>Total : {total.toFixed(2)} €</p>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
