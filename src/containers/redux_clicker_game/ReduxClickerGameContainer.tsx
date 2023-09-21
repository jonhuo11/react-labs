import {useAppDispatch} from "./ReduxClickerGameStore";
import { selectInventory } from "./inventory/InventorySlice";
import { useAppSelector } from "./ReduxClickerGameStore";
import { addIngredient } from "./inventory/InventorySlice";
import { useState } from "react";
import { DishNames, Ingredients, hasEnoughIngredientsForRecipe } from "./inventory/Recipes";

export const ReduxClickerGameContainer = () => {
    const inventory = useAppSelector(selectInventory)
    const [ingredientToAdd, setIngredientToAdd] = useState<Ingredients>("spices");
    const [dishToMake, setDishToMake] = useState<DishNames>('rat_curry');
    const dispatch = useAppDispatch();

    return (
    <>
        <p>Spices: {inventory.spices}</p>
        <p>Veggies: {inventory.veggies}</p>
        <p>Rat meat: {inventory.rat_meat}</p>
        <p>Goat meat: {inventory.goat_meat}</p>
        <p>Fish meat: {inventory.fish_meat}</p>
        <p>Rat curry: {inventory.rat_curry}</p>
        <p>Goat curry: {inventory.goat_curry}</p>
        <p>Fish curry: {inventory.fish_curry}</p>

        <button onClick={() => {
            dispatch(addIngredient({type: ingredientToAdd, qty: 1}))
        }}>Collect ingredient</button>
        <select onChange={e => setIngredientToAdd(e.target.value as Ingredients)} defaultValue={"spices"}>
            <option value="spices">Spices</option>
            <option value="veggies">Veggies</option>
            <option value="rat_meat">Rat meat</option>
            <option value="goat_meat">Goat meat</option>
            <option value="fish_meat">Fish meat</option>
        </select>
        <br/>
        <button onClick={() => {
            alert(hasEnoughIngredientsForRecipe(inventory, dishToMake));
        }}>Can I make this dish?</button>
        <select onChange={e => setDishToMake(e.target.value as DishNames)} defaultValue={"rat_curry"}>
            <option value="rat_curry">Rat curry</option>
            <option value="goat_curry">Goat curry</option>
            <option value="fish_curry">Fish curry</option>
        </select>
    </>
    );
};
