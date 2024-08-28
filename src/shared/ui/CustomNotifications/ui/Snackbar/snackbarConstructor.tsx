import { DISAPPEARING_DELAY, TRANSITION_TIME } from "../../const/const";
import "./snackbarConstructor.scss";

export function snackbarConstructor(message: string, variant: "normal" | "error") {
  const alertContainerEl = document.createElement("div");
  const messageContainerEl = document.createElement("div");
  const messageEl = document.createElement("p");

  messageEl.textContent = message;
  messageContainerEl.append(messageEl);

  const existingWrapper = document.querySelector(".applicationSnackbar-container");

  if (existingWrapper) {
    existingWrapper.remove();
  }

  alertContainerEl.classList.add("applicationSnackbar-container");
  alertContainerEl.classList.add(`${variant}`);
  messageContainerEl.classList.add("applicationSnackbar-message");

  alertContainerEl.style.transition = `transform ${TRANSITION_TIME}ms ease`;

  alertContainerEl.append(messageContainerEl);

  document.body.append(alertContainerEl);

  function cleanup(timeout = 0) {
    setTimeout(() => {
      alertContainerEl.classList.remove("applicationSnackbar-appended");
    }, timeout);

    setTimeout(() => {
      alertContainerEl.remove();
    }, timeout + TRANSITION_TIME);
  }

  requestAnimationFrame(() => {
    alertContainerEl.classList.add("applicationSnackbar-appended");
  });

  cleanup(DISAPPEARING_DELAY);
}
