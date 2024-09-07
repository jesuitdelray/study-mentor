export function speakMessage(isAllowed: boolean, text: string) {
  if (window.responsiveVoice && isAllowed) {
    window.responsiveVoice.speak(text, "Russian Female", { rate: 1.2 });
  }
}
