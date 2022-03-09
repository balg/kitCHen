import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Ingredient from "./Ingredient";
import Meal, { MealType } from "./Meal";

import type { IngredientType } from "./Ingredient";
import useLocalStorageState from "./hooks/useLocalStorage";
import UnstyledButton from "./components/UnstyledButton";
import { spacing } from "./styles/constants";

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
      {
        id: uuidv4(),
      },
      ...ingredients,
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
      {
        id: uuidv4(),
      },
      ...meals,
    ]);
  };

  const handleMealRemoved = (id: string) => {
    setMeals((meals as MealType[]).filter((i) => i.id !== id));
  };

  return (
    <div>
      <SectionHeader>
        <h2>Alapanyagok</h2>
        <AddButton onClick={handleAddNewIngredient}>Új</AddButton>
      </SectionHeader>
      {ingredients.map((ingredient: IngredientType) => (
        <Ingredient
          key={ingredient.id}
          ingredient={ingredient}
          onChange={handleIngredientChanged}
          onRemove={handleIngredientRemoved}
        />
      ))}

      <SectionHeader>
        <h2>Ételek</h2>
        <AddButton onClick={handleAddNewMeal}>Új</AddButton>
      </SectionHeader>
      {meals.map((meal: MealType) => (
        <Meal
          key={meal.id}
          meal={meal}
          ingredients={ingredients}
          onChange={handleMealChanged}
          onRemove={handleMealRemoved}
        />
      ))}
    </div>
  );
}

const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: ${spacing[1]}px;
`;

const AddButton = styled(UnstyledButton)`
  text-decoration: underline;
  font-size: ${18 / 16}rem;
`;

export default App;
