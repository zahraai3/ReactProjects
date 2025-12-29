import React from "react"
import IngredientList from "./IngredientList"
import ClaudeRecipe from "./ClaudeRecipe"

export default function Main() {
  const [ingredients, setIngredients] = React.useState([])
  const [recipe, setRecipe] = React.useState("")
  const [recipeIsShown, setRecipeIsShown] = React.useState(false)

  // إضافة عنصر جديد
  function Add(e) {
    e.preventDefault() // يمنع reload
    const formData = new FormData(e.target)
    const newItem = formData.get("ingredient")

    if (newItem) {
      setIngredients(prev => [...prev, newItem])
      e.target.reset()
    }
  }

  // جلب الوصفة من API المحلي
async function handleGetRecipe() {
  try {
    const res = await fetch("http://localhost:4000/api/aiLeb", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients })
    })

    if (!res.ok) {
      console.error("Server error:", res.status)
      return
    }

    const data = await res.json()
    setRecipe(data.recipe)
    setRecipeIsShown(true)
  } catch (err) {
    console.error("Fetch error:", err)
  }
}


  return (
    <main>
      <form className="add-form" onSubmit={Add}>
        <input
          aria-label="Add ingredient"
          type="text"
          placeholder="e.g. oregano"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientList
          getRecipe={handleGetRecipe}
          mainingredientList={ingredients}
        />
      )}

      {recipeIsShown && <ClaudeRecipe recipeText={recipe} />}
    </main>
  )
}

