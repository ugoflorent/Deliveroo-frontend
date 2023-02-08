import Meal from "./Meal";

const Category = ({ category, handleAddToCart }) => {
  console.log(category);
  return (
    <section className="category-container">
      <h2>{category.name} </h2>
      <div className="meals-container">
        {category.meals.map((meal) => {
          return (
            <Meal meal={meal} key={meal.id} handleAddToCart={handleAddToCart} />
          );
        })}
      </div>
    </section>
  );
};

export default Category;
