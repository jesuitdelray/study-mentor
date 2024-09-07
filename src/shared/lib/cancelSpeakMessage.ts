export function cancelSpeakMessage() {
  if (window.responsiveVoice) {
    window.responsiveVoice.cancel();
  }
}
