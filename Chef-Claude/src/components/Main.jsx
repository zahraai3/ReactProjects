import React from "react"
import IngredientList from "./IngredientList"
import ClaudeRecipe from "./ClaudeRecipe"

export default function Main() {
  const [ingredients, setIngredients] = React.useState([])
  const [recipe, setRecipe] = React.useState("")
  const [recipeIsShown, setRecipeIsShown] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  function Add(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newItem = formData.get("ingredient")

    if (newItem && newItem.trim()) {
      setIngredients(prev => [...prev, newItem.trim()])
      e.target.reset()
    }
  }

  async function handleGetRecipe() {
    setIsLoading(true)
    setRecipeIsShown(false)
    
    try {
      // استخدام Hugging Face Inference API
      const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: `Create a simple recipe using these ingredients: ${ingredients.join(", ")}. 

Format the recipe with:
- Recipe name
- List of ingredients
- Cooking steps (numbered)

Keep it short and easy.`,
            parameters: {
              max_new_tokens: 400,
              temperature: 0.7,
              top_p: 0.9,
              return_full_text: false
            }
          })
        }
      )

      const data = await response.json()
      
      if (data[0]?.generated_text) {
        setRecipe(data[0].generated_text)
        setRecipeIsShown(true)
      } else if (data.error) {
        // إذا كان النموذج يحمّل، انتظر وحاول مرة أخرى
        if (data.error.includes("loading")) {
          setRecipe("")
          setRecipeIsShown(true)
        } else {
          setRecipe("an error accured")
          setRecipeIsShown(true)
        }
      }
    } catch (err) {
      console.error("Error:", err)
      setRecipe("❌ try again")
      setRecipeIsShown(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main>
      <form className="add-form" onSubmit={Add}>
        <input
          aria-label="Add ingredient"
          type="text"
          placeholder="e.g. tomato, onion, garlic"
          name="ingredient"
        />
        <button type="submit">Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientList
          getRecipe={handleGetRecipe}
          mainingredientList={ingredients}
          isLoading={isLoading}
        />
      )}

      {isLoading && (
        <div style={{textAlign: 'center', padding: '20px', fontSize: '18px'}}>
          <p></p>
        </div>
      )}

      {recipeIsShown && !isLoading && <ClaudeRecipe recipeText={recipe} />}
    </main>
  )
}