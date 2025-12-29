export default function IngredientList(props){
    const ingredientList = props.mainingredientList.map(item => {
                return (
                    <li key={item}>{item}</li>
                )
        })

    return(
        <section>
                    <h2>Ingredient in hand : </h2>
                    <ul className="ingredient-list" aria-live="polite">
                        {ingredientList}
                    </ul>
                    {props.mainingredientList.length > 3 && <div className="get-recipe-container">
                        <div>
                            <h3>Ready for a recipe?</h3>
                            <p>Generate a recipe from your list of ingredients.</p>
                        </div>
                        <button onClick={props.getRecipe}>Get a recipe</button>
                    </div>}
                </section>
    )
}

