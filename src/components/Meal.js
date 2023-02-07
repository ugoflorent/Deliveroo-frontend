const Meal = ({ meal }) => {
  return (
    <article>
      <div>
        <p className="meal-title">{meal.title} </p>
        <p className="meal-description">{meal.description} </p>
        <div className="price-popular-container">
          <p>{meal.price} € </p>
          {meal.popular && (
            <p style={{ color: "orange" }}>
              <i class="fa-solid fa-star"></i> Populaire
            </p>
          )}
        </div>
      </div>
      {meal.picture && <img src={meal.picture} alt="meal" />}
    </article>
  );
};

export default Meal;
