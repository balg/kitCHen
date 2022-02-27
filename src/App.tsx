import React from "react";
import { v4 as uuidv4 } from "uuid";
import Ingredient from "./Ingredient";
import Meal, { MealType } from "./Meal";

import type { IngredientType } from "./Ingredient";
import useLocalStorageState from "./hooks/useLocalStorage";

function App() {
  const [ingredients, setIngredients] = useLocalStorageState(
    "ktCHn-ingredients",
    []
  );
  const [meals, setMeals] = useLocalStorageState("ktCHn-meals", []);

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
    </div>
  );
}

export default App;
