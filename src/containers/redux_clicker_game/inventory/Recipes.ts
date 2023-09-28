import { InventoryState } from "./InventorySlice";

export type Ingredients = 'spices' | 'rat_meat' | 'goat_meat' | 'fish_meat' | 'veggies';

export type MeatTypes = 'rat_meat' | 'goat_meat' | 'fish_meat';

export type DishNames = 'rat_curry' | 'goat_curry' | 'fish_curry';

export type IngredientCount = {
    type: Ingredients,
    qty: number,
};

export type Dish = {
    ingredients: IngredientCount[],
};

export type DishesMap = {
    [key in DishNames]: Dish;
};

const Dishes:DishesMap = {
    rat_curry: {ingredients: [
        {
            type: 'rat_meat',
            qty: 3
        },
        {
            type: 'spices',
            qty: 2
        },
        {
            type: 'veggies',
            qty: 1
        }
    ]},
    goat_curry: {ingredients: [
        {
            type: 'goat_meat',
            qty: 2
        },
        {
            type: 'spices',
            qty: 2
        },
        {
            type: 'veggies',
            qty: 2
        }
    ]},
    fish_curry: {ingredients: [
        {
            type: 'fish_meat',
            qty: 2
        },
        {
            type: 'spices',
            qty: 1
        },
        {
            type: 'veggies',
            qty: 1
        }
    ]}
};

export const hasEnoughIngredientsForRecipe = (inventory:InventoryState, recipe:DishNames):boolean => {
    let dm:any = {};
    for (var k in Dishes[recipe].ingredients) {
        let ic = Dishes[recipe].ingredients[k];
        if (!Object.hasOwn(dm, ic.type)) {
            dm[ic.type] = ic.qty;
        } else {
            dm[ic.type] += ic.qty;
        }
    }
    //console.log(dm);
    for (k in dm) {
        let ic = dm[k];
        if ((inventory as any)[k] < ic) {
            return false;
        }
    }
    return true;
};

export const consumeRecipeIngredients = (inventory:InventoryState, recipe:DishNames):InventoryState => {
    let ing = Dishes[recipe].ingredients
    for (var k in ing) {
        let ingredient:IngredientCount = ing[k]
        inventory[ingredient.type] -= ingredient.qty
    }
    return inventory
};
