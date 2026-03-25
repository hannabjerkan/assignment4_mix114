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
Fetch a Random Meal from TheMealDB
Returns a Promise that resolves with the meal object
 */
function fetchRandomMeal() {
    // Fill in: fetch -> konvertere til json -> select one meal randomly -> returnere
    return fetch('https://www.themealdb.com/api/json/v1/1/random.php')    //linken sender request til API
      .then((response) => response.json())       //gjør om svaret til json 
      .then((data) => {       
        console.log(data);    //får det inn i console
        return data.meals[0];     //hente ut flrste element 
      });
}
async function fetchRandomMeal() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await response.json();
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

container.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <p>Category: ${meal.strCategory}</p>
        <img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>
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
function fetchCocktailByDrinkIngredient(drinkIngredient) {
    // Fill in
}

/*
Fetch a Random Cocktail (backup in case nothing is found by the search)
Returns a Promise that resolves to cocktail object
*/
function fetchRandomCocktail() {
    // Fill in
}

/*
Display Cocktail Data in the DOM
*/
function displayCocktailData(cocktail) {
    // Fill in
}

/*
Call init() when the page loads
*/
window.onload = init;
