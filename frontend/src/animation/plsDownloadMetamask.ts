import { sleep } from './sleep'

const typeLink = async (message: HTMLParagraphElement, link: string, sleepDuration: number) => {
  let phrase: string = "";
  for (const char of link) {
    if (message.firstElementChild) message.firstElementChild.remove()
    phrase += char
    const updatedLink = `<a href="https://metamask.io/download" target="_blank" rel="noreferrer">${phrase}</a>`
    message.innerHTML += updatedLink
    await sleep(sleepDuration)
  }
}

const typeMessage = async (message: HTMLParagraphElement, messageToAdd: string, sleepDuration: number) => {
  for (const char of messageToAdd) {
    message.innerHTML += char
    await sleep(sleepDuration)
  }
}

export const plsDownloadMetamask = (delay: number = 0, talkingSpeed: number = 50,) => {
  const metamessage = document.querySelector(".metamessage") as HTMLParagraphElement
  const metamaskMouth = document.querySelector("#metamaskMouth") as SVGElement

  const first = `You need to `
  const link = `download metamask`
  const last = ` for this application to work!`

  setTimeout(async () => {
    metamaskMouth.classList.toggle("talking")
    await typeMessage(metamessage, first, talkingSpeed)
    await typeLink(metamessage, link, talkingSpeed)
    await typeMessage(metamessage, last, talkingSpeed)
    metamaskMouth.classList.toggle("talking")
  }, delay);
}