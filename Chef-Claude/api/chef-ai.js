export default async function handler(req, res) {
try {
    const response = await fetch("https://api.example.com/v1/chat", {
        method: "POST",
        headers: {
        "Authorization": `Bearer ${process.env.AI_KEY}`,
        "Content-Type": "application/json"
    },
        body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(200).json(data);

} 
    catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
}
