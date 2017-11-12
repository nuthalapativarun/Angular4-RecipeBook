import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Rx';

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    editList = new Subject<number>();

    ingredients: Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10)
      ];

      getIngredients(){
          return this.ingredients.slice();
      }
      getIngredient(index: number){
        return this.ingredients[index];
    }

      addIngredients(ingredient: Ingredient){
          this.ingredients.push(ingredient);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      addRecipeIngredientToShoppingList(ingredients: Ingredient[]){
        //   for(let ingredient of ingredients){
        //       this.addIngredients(ingredient);
        //   }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
        console.log(this.ingredients); 
      }

      updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index: number){
          this.ingredients.splice(index,1);
          this.ingredientsChanged.next(this.ingredients.slice());
      }
}