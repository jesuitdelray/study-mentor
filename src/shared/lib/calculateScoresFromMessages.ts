import { message } from "@/pages/HomePage/ui/HomePage"

export function calculateScoresFromMessages(messages: message[]): {
    totalQuestions: number
    averageScore: number
} {
    const scores = messages
        .filter(msg => msg.role === "Assistant")
        .flatMap(msg =>
            Array.from(msg.content.matchAll(/Оценка ответа: (\d+)/g), m => parseInt(m[1], 10))
        )
    const totalScore = scores.reduce((acc, score) => acc + score, 0)
    const averageScore = scores.length ? parseFloat((totalScore / scores.length).toFixed(1)) : 0
    const totalQuestions = scores.length

    return { totalQuestions, averageScore }
}
