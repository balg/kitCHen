import React from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import type { IngredientType } from "./Ingredient";
import { roundToTwoDigits } from "./utils";
import colors from "./styles/colors";
import UnstyledButton from "./components/UnstyledButton";

type MealIngredient = {
  id: string;
  ingredientId?: string;
  grams?: number;
};

export type MealType = {
  id: string;
  name?: string;
  ingredients?: MealIngredient[];
  grams?: number;
};

export interface MealProps {
  meal: MealType;
  ingredients: IngredientType[];
  onChange: (meal: MealType) => any;
  onRemove: (id: string) => any;
  initialEditMode?: boolean;
}

const Meal = (props: MealProps) => {
  const { meal, ingredients, onChange, onRemove } = props;

  const [portionWeight, setPortionWeight] = React.useState<number>();

  const totalCH = meal.ingredients?.reduce((acc, mealIngredient) => {
    const ingredient = ingredients.find(
      (i) => i.id === mealIngredient.ingredientId
    );

    acc += (mealIngredient.grams || 0) * (ingredient?.chPerGram || 0);
    return acc;
  }, 0);

  const mealCHperGram =
    (meal.grams && totalCH && Number(totalCH) / meal.grams) || 0;

  const portionCH =
    portionWeight &&
    mealCHperGram &&
    Number(portionWeight) * Number(mealCHperGram);

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

  const handleTotalNetWeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...meal,
      grams: event.target.value ? Number(event.target.value) : undefined,
    });
  };

  const handleCHChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetCH = event.target.value;
    if (!targetCH) {
      setPortionWeight(undefined);
    }

    const newGrams = Number(targetCH) / mealCHperGram;
    setPortionWeight(newGrams);
  };

  return (
    <Wrapper>
      <Heading>
        <NameInput
          type="text"
          value={meal.name ?? ""}
          placeholder="Név"
          onChange={handleNameChange}
        />
        <Actions>
          <ActionButton onClick={() => onRemove(meal.id)}>töröl</ActionButton>
        </Actions>
      </Heading>
      <ul>
        {meal.ingredients?.map((mealIngredient) => {
          return (
            <li key={mealIngredient.id}>
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
                <WeightInput
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
                g
              </label>

              <ActionButton
                onClick={() => handleMealIngredientRemoved(mealIngredient.id)}
              >
                töröl
              </ActionButton>
            </li>
          );
        })}
        <li>
          <ActionButton onClick={handleAddNewMealIngredient}>
            új hozzávaló
          </ActionButton>
        </li>
      </ul>
      <div>
        <h3>CH content</h3>
        <div>Total: {totalCH ?? 0}</div>
        <label>
          Total net weight (without plate)
          <input
            type="number"
            value={meal.grams ?? ""}
            onChange={handleTotalNetWeightChange}
          />
          grams
        </label>
        <br />
        <label>
          Portion
          <input
            name="Grams"
            type="number"
            value={
              (portionWeight && roundToTwoDigits(Number(portionWeight))) ?? ""
            }
            onChange={(event) =>
              setPortionWeight(
                event.target.value ? Number(event.target.value) : undefined
              )
            }
          />
          grams
        </label>
        <br />
        <label>
          CH
          <input
            name="ch"
            type="number"
            value={(portionCH && roundToTwoDigits(portionCH)) ?? ""}
            onChange={handleCHChange}
          />
          grams
        </label>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${colors.grey};
`;

const Heading = styled.div`
  display: flex;
  align-items: baseline;
`;

const Actions = styled.div`
  margin-left: auto;
`;

const ActionButton = styled(UnstyledButton)`
  text-decoration: underline;
`;

const TextInput = styled.input`
  border: none;
  border-bottom: 1px solid ${colors.grey};
`;

const NameInput = styled(TextInput)`
  font-size: 1.17rem;
  font-weight: bold;
`;

const WeightInput = styled(TextInput)`
  width: 6ch;
`;

export default Meal;
