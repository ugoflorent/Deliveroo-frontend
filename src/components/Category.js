import Meal from "./Meal";

const Category = ({ category }) => {
  console.log(category);
  return (
    <section className="category-container">
      <h2>{category.name} </h2>
      <div className="meals-container">
        {category.meals.map((meal, index) => {
          return <Meal meal={meal} key={meal.id} />;
        })}
      </div>
    </section>
  );
};

export default Category;
