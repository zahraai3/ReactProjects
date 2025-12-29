import express from "express"
import cors from "cors"
import { InferenceClient } from "@huggingface/inference"


const app = express()
app.use(cors())
app.use(express.json())


const hf = new InferenceClient({ accessToken: process.env.AI_KEY })

app.post("/api/aiLeb", async (req, res) => {
  try {
    const { ingredients } = req.body
    const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients...
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

    res.json({ recipe: text })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to generate recipe" })
  }
})

app.listen(4000, () => console.log("Server running on http://localhost:4000"))
