import Search from './models/Search';
import {elements, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';
const state = {};
import Recipe from './models/Recipes';
import * as recipeView from './views/recipeView';

const controlSearch = async () =>{
    //1. get query from view
    const query = searchView.getInput();
    
    if (query){
        // new search obj and add to state
        state.search = new Search(query);
        
        // prepare UI for results
        
        // search for recipes
        searchView.clearField();
        searchView.clearResults();
        renderLoader(elements.searchRes); 
        await state.search.getResults();
        clearLoader();
        
        // render results on UI
        searchView.renderResults(state.search.result);
    }
}
elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
});
elements.searchResPages.addEventListener('click', e=>{
   const btn = e.target.closest('.btn-inline');
    if (btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
         searchView.renderResults(state.search.result, goToPage);
        
    }
});


const controlRecipe = async ()=>{
    const id = window.location.hash.replace('#', '');
    if (id){
        // prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        //create new recipe object
        state.recipe = new Recipe(id);
        // get recipe data
        try{
        await state.recipe.getRecipe();

        state.recipe.parseIngredients();
        // calculate servings
        state.recipe.calcServings();
        state.recipe.calcTime();
            
        clearLoader();
        recipeView.renderRecipe(state.recipe);

            
        
        } catch (error){
            console.log(error);
            alert('error processing recipe');
        }
        //render
    }
}
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load',controlRecipe);