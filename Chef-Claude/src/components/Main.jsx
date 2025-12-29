import React from "react"
import  IngredientList  from "./IngredientList"
import ClaudeRecipe from "./ClaudeRecipe"



export default function Main(){

    const [ingredients , setIngredients] =React.useState([])

    function Add(formData){

        const newItem = formData.get("ingredient")
        if (newItem)
        {    setIngredients(prevIngredient => {
                return (
                    [...prevIngredient,newItem]
                )
            })}
        }
    

    const [recipeIsShown,setrecipeisShown] = React.useState(false)
    function Showing(){
        setrecipeisShown(prevRecio => !prevRecio)
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
                    toggleShow={Showing} 
                    mainingredientList={ingredients}
                />}
                    { recipeIsShown  && <ClaudeRecipe/>}
            </main>
        </>
    )
} 