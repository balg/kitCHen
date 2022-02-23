import React from "react";
import { v4 as uuidv4 } from "uuid";
import type { IngredientType } from "./Ingredient";

type MealIngredient = {
  id: string;
  ingredientId?: string;
  grams?: number;
};

export type MealType = {
  id: string;
  name?: string;
  ingredients?: MealIngredient[];
};

export interface MealProps {
  meal: MealType;
  ingredients: IngredientType[];
  onChange: (meal: MealType) => any;
  onRemove: (id: string) => any;
}

const Meal = (props: MealProps) => {
  const { meal, ingredients, onChange, onRemove } = props;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...meal,
      name: event.target.value,
    });
  };

  const handleAddNewMealIngredient = () => {
    onChange({
      ...meal,
      ingredients: [{ id: uuidv4() }, ...(meal.ingredients || [])],
    });
  };

  const handleMealIngredientRemoved = (mealIngredientId: string) => {
    onChange({
      ...meal,
      ingredients: meal.ingredients?.filter((i) => i.id !== mealIngredientId),
    });
  };

  const handleMealIngredientChanged = (
    mealIngredientId: string,
    field: keyof MealIngredient,
    value: string
  ) => {
    const mealIngredientsCopy = [...(meal.ingredients || [])];

    const changedIndex = mealIngredientsCopy.findIndex(
      (i) => i.id === mealIngredientId
    );

    const newMealIngredient = {
      ...mealIngredientsCopy[changedIndex],
    };

    switch (field) {
      case "grams":
        const grams = value ? Number(value) : undefined;
        newMealIngredient.grams = grams;
        break;
      default:
        newMealIngredient[field] = value;
        break;
    }

    mealIngredientsCopy.splice(changedIndex, 1, newMealIngredient);

    onChange({
      ...meal,
      ingredients: mealIngredientsCopy,
    });
  };

  return (
    <div>
      <div>
        <label>
          Name{" "}
          <input
            type="text"
            value={meal.name ?? ""}
            onChange={handleNameChange}
          />
        </label>
      </div>
      <div>
        <h3>Ingredients</h3>
        <button onClick={handleAddNewMealIngredient}>Add</button>
        {meal.ingredients?.map((mealIngredient) => {
          return (
            <div key={mealIngredient.id}>
              <select
                value={mealIngredient.ingredientId || ""}
                onChange={(event) =>
                  handleMealIngredientChanged(
                    mealIngredient.id,
                    "ingredientId",
                    event.target.value
                  )
                }
                required
              >
                <option value=""></option>
                {ingredients.map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.id}>
                    {ingredient.name}
                  </option>
                ))}
              </select>

              <label>
                Grams{" "}
                <input
                  type="number"
                  value={mealIngredient.grams ?? ""}
                  onChange={(event) => {
                    handleMealIngredientChanged(
                      mealIngredient.id,
                      "grams",
                      event.target.value
                    );
                  }}
                />
              </label>

              <button
                onClick={() => handleMealIngredientRemoved(mealIngredient.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <button onClick={() => onRemove(meal.id)}>Delete</button>
    </div>
  );
};

export default Meal;
