import { EDiscussionMods } from "@/shared/constants";
import { message } from "../ui/StudyMentorPage";

function extractQuestions(messages: message[]) {
  return messages
    .filter((msg) => msg.role === "Assistant" && /QUESTION/i.test(msg.content))
    .map((msg) => {
      const match = msg.content.match(/QUESTION[:\s]*(.*)/i);
      return match ? match[1].trim() : "";
    })
    .filter((question) => question !== "");
}

export function generateMessageContext(
  mode: EDiscussionMods,
  topic: string,
  position: string,
  messages: message[],
  messageText: string,
  isFirstMessageSent: boolean
) {
  function extractRatings(messages: message[]) {
    return messages
      .filter(
        (msg) =>
          msg.role === "Assistant" &&
          /Оценка:/i.test(msg.content) &&
          /Следующее слово:/i.test(msg.content)
      )
      .map((msg) => {
        const match = msg.content.match(/Следующее слово:\s*(.*)/i);
        return match ? match[1].trim() : "";
      })
      .filter((word) => word !== "");
  }

  if (mode === EDiscussionMods.WORD_MASTERY) {
    const previousWords = extractRatings(messages);

    if (!isFirstMessageSent) {
      return [
        {
          role: "system",
          content: `
              Вы работаете в режиме "Word Mastery". Пользователь будет описывать предложенные вами слова.
              Начните с простого слова для запуска процесса, без оценки. Избегайте повторения следующих слов: ${previousWords.join(
                ", "
              )}.
              Ваши ответы должны строго следовать формату:
              Следующее слово: (новое слово для описания).
            `,
        },
        { role: "user", content: messageText },
      ];
    }

    return [
      {
        role: "system",
        content: `
            Вы работаете в режиме "Word Mastery". Пользователь будет описывать предложенные вами слова.
            Оцените описание только после получения конкретного ответа. Избегайте повторения следующих слов: ${previousWords.join(
              ", "
            )}.
            Ваши ответы должны строго следовать формату:
            Оценка: (0-10) - Оцените описание пользователя с точки зрения точности, полноты и ясности.
            Правильный ответ: (короткое, точное описание текущего слова).
            Следующее слово: (новое слово для описания).
          `,
      },
      { role: "user", content: messageText },
    ];
  } else if (mode === EDiscussionMods.QA) {
    const previousQuestions = extractQuestions(messages);
    const baseContent = `
          Always write in the same language as the user. You are asking questions on the topic "${topic}" ${
      position ? `for the position "${position}"` : ""
    }. Avoid repeating questions from the following list: ${previousQuestions}.
        `;

    const firstMessageContent = `
          ${baseContent}
          Your responses must strictly follow this format:
          1. QUESTION: (your next question on the topic "${topic}" ${
      position ? `for the position "${position}"` : ""
    }).
        `;

    const followUpContent = `
          ${baseContent}
          For each user response, evaluate their input and provide the correct answer to your previous question. 
          Your responses must strictly follow this format:
          SCORES: (0-10) - Assign a score based on the accuracy, completeness, and clarity of the user's response. 
          CORRECT ANSWER: (the correct answer to your previous question, ignoring the user's input).
          NEXT QUESTION: (your next question on the topic "${topic}" ${
      position ? `for the position "${position}"` : ""
    }).
          
          IMPORTANT:
          - "CORRECT ANSWER" must always address your previous question.
          - "SCORES" must be calculated based on the user's response using these criteria:
            - Accuracy: Does the response answer the question correctly?
            - Completeness: Does the response fully cover the topic?
            - Clarity: Is the response well-written and easy to understand?
          - Do not repeat the user's incorrect response in your "CORRECT ANSWER".
        `;

    return [
      {
        role: "system",
        content: isFirstMessageSent ? followUpContent : firstMessageContent,
      },
      { role: "user", content: messageText },
    ];
  } else {
    throw new Error("Unsupported mode");
  }
}
