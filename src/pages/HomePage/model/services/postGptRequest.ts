import axios from "axios"

export async function postGptRequest(messageContext: { role: string; content: string }[]) {
    const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
            messages: messageContext,
            model: "gpt-4o",
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            },
        }
    )
    return response.data.choices[0].message.content
}
