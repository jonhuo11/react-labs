import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../ReduxClickerGameStore'
import { Ingredients, DishNames, hasEnoughIngredientsForRecipe, consumeRecipeIngredients} from './Recipes';


export type InventoryState = {
    [key in Ingredients | DishNames]: number;
}

const initialState: InventoryState  = {
    spices: 0,
    rat_meat: 0,
    goat_meat: 0,
    fish_meat: 0,
    veggies: 0,
    rat_curry: 0,
    goat_curry: 0,
    fish_curry: 0,
}

export const inventorySlice = createSlice({
    name:'inventory',
    initialState,
    reducers: {
        addIngredient: (state, action:PayloadAction<{type: Ingredients, qty:number}>) => {
            switch(action.payload.type) {
                case 'rat_meat':
                    state.rat_meat += action.payload.qty;
                    break;
                case 'fish_meat':
                    state.fish_meat += action.payload.qty;
                    break;
                case 'goat_meat':
                    state.goat_meat += action.payload.qty;
                    break;
                case 'spices':
                    state.spices += action.payload.qty;
                    break;
                case 'veggies':
                    state.veggies += action.payload.qty;
                    break;
                default:
                    break;
            }
        },
        makeRecipe: (state, action:PayloadAction<DishNames>) => {
            if (hasEnoughIngredientsForRecipe(state, action.payload)) {
                state = consumeRecipeIngredients(state, action.payload)
                state[action.payload] += 1
            }
        }
    }
});

export const selectInventory = (state:RootState):InventoryState => state.inventory;

export const {addIngredient, makeRecipe} = inventorySlice.actions;


export default inventorySlice.reducer;

