import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    constructor(private shoppingListService: ShoppingListService){}

    private recipes: Recipe[] = [
        new Recipe('Chicken Biryani',
            'A mouth watering chicken dum biryani',
            'http://www.indianfoodforever.com/images/chicken-biryani.jpg',
            [
                new Ingredient('Chicken', 2),
                new Ingredient('Masala', 1),
                new Ingredient('Rice',2),
                new Ingredient('Cilantro',1)
            ]),
        new Recipe('Mutton Biryani',
            'A tasty Mutton biryani',
            'http://www.indianfoodforever.com/images/chicken-biryani.jpg',
            [
                new Ingredient('Mutton', 2),
                new Ingredient('Masala', 1),
                new Ingredient('Basmati',2),
                new Ingredient('Mint',1)
            ])
    ];

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number){
        return this.recipes[id];
    }

    addIngredientToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addRecipeIngredientToShoppingList(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    
    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}