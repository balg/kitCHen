import React from "react";

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
    console.log(event.target.value);
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
          value={(ingredient.chPerGram && ingredient.chPerGram * 100) ?? ""}
          onChange={handleCHChange}
        />
      </label>
      <button onClick={() => onRemove(ingredient.id)}>Delete</button>
    </div>
  );
};

export default Ingredient;
