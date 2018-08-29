export const elements ={
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchResList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe')
};
export const elementStrings = {
    loader : 'loader'
};
export const renderLoader = parent =>{
    const loader = `
        <div class = "${elementStrings.loader}">
            <svg>
                <use href ="img/icons.svg#icon-cw"></use>
            
            </svg>
        </div>
        `;
    parent.insertAdjacentHTML('afterbegin', loader);

};

export const clearLoader = ()=>{
    // check here for how to delete ele from DOm
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader){
        loader.parentElement.removeChild(loader);
    }
}