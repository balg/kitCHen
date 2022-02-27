import React from "react";
import { roundToTwoDigits } from "./utils";

export type IngredientType = {
  id: string;
  name?: string;
  chPerGram?: number;
};

export interface IngredientProps {
  ingredient: IngredientType;
  onChange: (ingredient: IngredientType) => any;
  onRemove: (id: string) => any;
}

const Ingredient = (props: IngredientProps) => {
  const { ingredient, onChange, onRemove } = props;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...ingredient,
      name: event.target.value,
    });
  };

  const handleCHChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const chPerGram = event.target.value
      ? Number(event.target.value) / 100
      : undefined;

    onChange({
      ...ingredient,
      chPerGram,
    });
  };

  return (
    <div>
      <label>
        Name{" "}
        <input
          type="text"
          value={ingredient.name ?? ""}
          onChange={handleNameChange}
        />
      </label>
      <label>
        CH in 100 grams
        <input
          type="number"
          value={
            (ingredient.chPerGram &&
              roundToTwoDigits(ingredient.chPerGram * 100)) ??
            ""
          }
          onChange={handleCHChange}
        />
      </label>
      <button onClick={() => onRemove(ingredient.id)}>Delete</button>
    </div>
  );
};

export default Ingredient;
