import axios from 'axios';
import {key} from '../config';
export default class Recipe{
    constructor(id){
        this.id =id;
    
    }
    async getRecipe(id){
        
        try{
           const res = await axios(`http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title= res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error){
            console.log(error);
        }
    }
    calcTime(){
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3);
        this.time = periods * 15;
    }
    
    calcServings(){
        this.servings = 4;
    }
    
    parseIngredients(){
        const unitLong = ['tablespoon', 'tablespoons', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
      
        const newIngredients = this.ingredients.map(el =>{
            //1 unform units
            let ingredient = el.toLowerCase();

           
            unitLong.forEach((unit, i)=>{
               ingredient = ingredient.replace(unit, unitShort[i]);
            });
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            //2 remove parenthesis
            let obj;
            const arrIng = ingredient.split(' ');
            const arrIndex = arrIng.findIndex(el2=> unitShort.includes(el2));
         
            
            if (arrIndex > -1){
                let count = arrIng.slice(0, arrIndex);
              
                if (arrIng.length ===1){
                    count = arrIng[0];
                
                } else {
                    count = eval(arrIng.slice(0,arrIndex).join('+'));
                }
                obj = {
                    count,
                    unit: arrIng[arrIndex],
                    ingredient:arrIng.slice(arrIndex + 1).join(' ')
                }
            } else if (parseInt(ingredient[0], 10 )){
                obj = {
                    int: parseInt(ingredient[0]),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                                  
                }
            } else if (arrIndex === -1){
                obj= {
                    int : 1,
                    unit:'',
                    ingredient:ingredient
                }
                
            }
              
                 return obj;
        });
        this.ingredients = newIngredients;
   
        
    }
}
