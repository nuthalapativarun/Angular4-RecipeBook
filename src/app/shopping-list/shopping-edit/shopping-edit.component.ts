import { Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editItem : Ingredient;
  @ViewChild('f') shoppingListForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.editList.subscribe((value: number) =>{
      this.editedItemIndex = value;
      this.editMode = true;
      this.editItem = this.shoppingListService.getIngredient(this.editedItemIndex);
      this.shoppingListForm.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount
      })
    });
  }

  onSubmit(form: NgForm){
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }else{
      this.shoppingListService.addIngredients(newIngredient);
    }
    this.editMode = false;
    this.shoppingListForm.reset();
  }
  onClear(){
    this.editMode = false;
    this.shoppingListForm.reset();
  }
  onDelete(){
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
