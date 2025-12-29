import React from "react"
import  IngredientList  from "./IngredientList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromMistral } from "../../api/aiLeb"


export default function Main(){

    const [ingredients , setIngredients] =React.useState([])
    const [recipe,setRecipe] = React.useState("")
    const [recipeIsShown,setrecipeisShown] = React.useState(false)

    function Add(formData){

        const newItem = formData.get("ingredient")
        if (newItem)
        {    setIngredients(prevIngredient => {
                return (
                    [...prevIngredient,newItem]
                )
            })}
        }

        async function handleGetRecipe() {
            try{
                const recipeMarkdown = await getRecipeFromMistral(ingredients)
                setRecipe(recipeMarkdown)
                setrecipeisShown(true)
            } catch(error){
                console.error("Error getting recipe:",error)
            }
        }

    return(
        <>
            <main>
                <form className="add-form" action={Add}>
                    <input  
                        aria-label="Add ingredient" 
                        type="text" 
                        placeholder="e.g. oregano"
                        name="ingredient"
                        />
                    <button >Add ingredient</button>
                </form>
                {ingredients.length > 0 && <IngredientList   
                    getRecipe={handleGetRecipe} 
                    mainingredientList={ingredients}
                />}
                    { recipeIsShown  && <ClaudeRecipe recipeText={recipe}/>}
            </main>
        </>
    )
} 