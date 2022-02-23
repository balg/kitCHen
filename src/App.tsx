import React from "react";
import { v4 as uuidv4 } from "uuid";
import Ingredient from "./Ingredient";
import Meal, { MealType } from "./Meal";

import type { IngredientType } from "./Ingredient";
import useLocalStorageState from "./hooks/useLocalStorage";

// const ingredients: IngredientType[] = [
// {
//   id: "001",
//   name: "Something",
//   chPerGram: 0.42,
// },
//   {
//     id: "002",
//     name: "Onions",
//     chPerGram: 0.2,
//   },
// ];

function App() {
  // const [grams, setGrams] = React.useState("");
  const [ingredients, setIngredients] = useLocalStorageState(
    "ktCHn-ingredients",
    []
  );
  const [meals, setMeals] = useLocalStorageState("ktCHn-meals", []);

  // const chAmount = grams && ingredients[0].chPerGram * Number(grams);

  // const handleGramsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setGrams(event.target.value);
  // };

  // const handleCHChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const targetCH = event.target.value;
  //   const newGrams = targetCH && Number(targetCH) / ingredients[0].chPerGram;
  //   setGrams(`${newGrams}`);
  // };

  const handleIngredientChanged = (ingredient: IngredientType) => {
    const ingredientsCopy = [...ingredients] as IngredientType[];

    const changedIndex = ingredientsCopy.findIndex(
      (i) => i.id === ingredient.id
    );

    ingredientsCopy.splice(changedIndex, 1, ingredient);

    setIngredients(ingredientsCopy);
  };

  const handleAddNewIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        id: uuidv4(),
      },
    ]);
  };

  const handleIngredientRemoved = (id: string) => {
    setIngredients(
      (ingredients as IngredientType[]).filter((i) => i.id !== id)
    );
  };

  const handleMealChanged = (meal: MealType) => {
    const mealsCopy = [...meals] as MealType[];

    const changedIndex = mealsCopy.findIndex((i) => i.id === meal.id);

    mealsCopy.splice(changedIndex, 1, meal);

    setMeals(mealsCopy);
  };

  const handleAddNewMeal = () => {
    setMeals([
      ...meals,
      {
        id: uuidv4(),
      },
    ]);
  };

  const handleMealRemoved = (id: string) => {
    setMeals((meals as MealType[]).filter((i) => i.id !== id));
  };

  return (
    <div>
      <h2>Ingredients</h2>
      {ingredients.map((ingredient: IngredientType) => (
        <Ingredient
          key={ingredient.id}
          ingredient={ingredient}
          onChange={handleIngredientChanged}
          onRemove={handleIngredientRemoved}
        />
      ))}
      <button onClick={handleAddNewIngredient}>Add new ingredient</button>

      <h2>Meals</h2>
      {meals.map((meal: MealType) => (
        <Meal
          key={meal.id}
          meal={meal}
          ingredients={ingredients}
          onChange={handleMealChanged}
          onRemove={handleMealRemoved}
        />
      ))}
      <button onClick={handleAddNewMeal}>Add new meal</button>
      {/* <label>
        Grams
        <input
          name="Grams"
          type="number"
          value={grams}
          onChange={handleGramsChange}
        />
      </label>
      <label>
        CH
        <input
          name="ch"
          type="number"
          value={chAmount}
          onChange={handleCHChange}
        />
      </label> */}
    </div>
  );
}

export default App;
