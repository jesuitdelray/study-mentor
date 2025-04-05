import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function speakMessage(
  isAllowed: boolean,
  text: string,
  lang = "en-US"
) {
  if (!isAllowed || !text.trim()) return;

  const instructions =
    lang === "en-US"
      ? `Voice: High-energy, upbeat, and encouraging, projecting enthusiasm and motivation.

Punctuation: Short, punchy sentences with strategic pauses to maintain excitement and clarity.

Delivery: Fast-paced and dynamic, with rising intonation to build momentum and keep engagement high.

Phrasing: Action-oriented and direct, using motivational cues to push participants forward.

Tone: Positive, energetic, and empowering, creating an atmosphere of encouragement and achievement.`
      : "Tone: Дружелюбный и спокойный. Скорость: Средняя. Эмоция: Поддерживающая.";

  const voice = lang === "en-US" ? "nova" : "echo";

  try {
    const response = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice,
      input: text,
      instructions,
    });

    const audioBlob = await response.arrayBuffer();
    const audioUrl = URL.createObjectURL(
      new Blob([audioBlob], { type: "audio/mpeg" })
    );

    const audio = new Audio(audioUrl);
    audio.play();
  } catch (error) {
    console.error("Error in speakMessage:", error);
  }
}

export function speakMessageOld(isAllowed: boolean, text: string) {
  if (window.responsiveVoice && isAllowed) {
    window.responsiveVoice.speak(text, "Russian Female", { rate: 1.2 });
  }
}
