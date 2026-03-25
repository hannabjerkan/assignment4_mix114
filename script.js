/*
Mapping from MealDB Categories to TheCocktailDB drink ingredient
You can customize or expand this object to suit your needs.
*/
const mealCategoryToCocktailIngredient = {
  Beef: "whiskey",
  Chicken: "gin",
  Dessert: "amaretto",
  Lamb: "vodka",
  Miscellaneous: "vodka",
  Pasta: "tequila",
  Pork: "tequila",
  Seafood: "rum",
  Side: "brandy",
  Starter: "rum",
  Vegetarian: "gin",
  Breakfast: "vodka",
  Goat: "whiskey",
  Vegan: "rum",
  // Add more if needed; otherwise default to something like 'cola'
};

/*
    2) Main Initialization Function
      Called on page load to start all the requests:
      - Fetch random meal
      - Display meal
      - Map meal category to spirit
      - Fetch matching (or random) cocktail
      - Display cocktail
*/
function init() {
  fetchRandomMeal()
    .then((meal) => {       //meal er objektet vi henter fra API i neste funksjon 
      console.log('MEAL:', meal);   //for å sjekke i console at det fungerer 
      displayMealData(meal);
      const spirit = mapMealCategoryToDrinkIngredient(meal.strCategory);
      return fetchCocktailByDrinkIngredient(spirit);
    })
    .then((cocktail) => {
      displayCocktailData(cocktail);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

/*
Fetch a Random Meal from TheMealDB. 
Returns a Promise that resolves with the meal object
*/

async function fetchRandomMeal() {    //async funksjoner returnerer alltid en promise
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await response.json();

  console.log(data);  //for debugging 

  //returnerer første og tilfeldige måltid
  return data.meals[0];
};

/*
Display Meal Data in the DOM
Receives a meal object with fields like:
  strMeal, strMealThumb, strCategory, strInstructions,
  strIngredientX, strMeasureX, etc.
*/
function displayMealData(meal) {    //dette vil puttes i meal-container på html 
    // Fill in: finne kontainer -> 
    const container = document.getElementById('meal-container');

//loop på ingredisensene for å koble ingrediens med mål. legges så inn i container.innerHTML
let ingredientList ='';

for (let i = 1; i<=20; i++) {
  const ingredient = meal[`strIngredient${i}`];
  const measure = meal[`strMeasure${i}`];

  if (ingredient && ingredient.trim() !=='') {
    ingredientList += `<li>${ingredient} - ${measure} </li>`;
  }  
}

container.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <p>Category: ${meal.strCategory}</p>
        <img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>

        <h3>Ingredients:</h3>
        <ul>${ingredientList}</ul>

        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
    `;
  }

/*
Convert MealDB Category to a TheCocktailDB Spirit
Looks up category in our map, or defaults to 'cola'
*/
function mapMealCategoryToDrinkIngredient(category) {
  if (!category) return "cola";
  return mealCategoryToCocktailIngredient[category] || "cola";
}

/*
Fetch a Cocktail Using a Spirit from TheCocktailDB
Returns Promise that resolves to cocktail object
We call https://www.thecocktaildb.com/api/json/v1/1/search.php?s=DRINK_INGREDIENT to get a list of cocktails
Don't forget encodeURIComponent()
If no cocktails found, fetch random
*/
async function fetchCocktailByDrinkIngredient(drinkIngredient) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkIngredient}`);
  const data = await response.json();
  console.log(data);
  return data.drinks[0];
    // Fill in
}

/*
Fetch a Random Cocktail (backup in case nothing is found by the search)
Returns a Promise that resolves to cocktail object
*/
async function fetchRandomCocktail() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  const data = await response.json();
  console.log(data);
  return data.drink[0]
}

/*
Display Cocktail Data in the DOM
*/
function displayCocktailData(cocktail) {
  
  const cocktailContainer= document.getElementById('cocktail-container')

  cocktailContainer.innerHTML= `
  <h2>${cocktail.strDrink}</h2>
  <img src='${cocktail.strDrinkThumb}' alt='${cocktail.strDrink}'/>
  `

}

/*
Call init() when the page loads
*/
window.onload = init;
