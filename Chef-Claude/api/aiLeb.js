import { InferenceClient } from "@huggingface/inference"

const hf = new InferenceClient({
  accessToken: process.env.AI_KEY // هذا المفتاح فقط على السيرفر
})

export default async function handler(req, res) {
  try {
    const { ingredients } = await req.json() // Vite fetch يرسل JSON
    console.log("Ingredients received:", ingredients)

    const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients.
Guidelines:
- You don't need to use every ingredient
- Can include additional common ingredients, but not too many
- Format in clean markdown with title, ingredients, steps
`

    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredients.join(", ")}. Please give me a recipe!` }
      ],
      max_tokens: 1024
    })

    const content = response.choices[0].message?.content
    const text = Array.isArray(content)
      ? content.map(c => c.text || "").join("\n")
      : content

    res.status(200).json({ recipe: text })
  } catch (err) {
    console.error("HF Error:", err)
    res.status(500).json({ error: "Failed to generate recipe" })
  }
}
