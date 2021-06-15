import { sleep } from './sleep'

export const speak = (message: string, delay: number = 0, talkingSpeed: number = 50) => {
  const metamessage = document.querySelector(".metamessage") as HTMLParagraphElement
  const metamaskMouth = document.querySelector("#metamaskMouth") as SVGElement

  setTimeout(async () => {
    metamaskMouth.classList.toggle("talking")
    metamessage.innerHTML = ""

    for (const char of message) {
      metamessage.innerHTML += char
      await sleep(talkingSpeed)
    }

    metamaskMouth.classList.toggle("talking")
  }, delay);
}