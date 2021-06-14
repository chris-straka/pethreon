import { sleep } from '../utility/functions';

const first = `You need to `
const link = `download metamask`
const last = ` for this application to work!`

const typeMessage = async (message: HTMLParagraphElement, messageToAdd: string, sleepDuration: number) => {
  for (const char of messageToAdd) {
    message.innerHTML += char
    await sleep(sleepDuration)
  }
}

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

export const metamaskAnimation = (speedInMs: number, delay: number) => {
  const metamessage = document.querySelector(".metamessage") as HTMLParagraphElement
  const metaface = document.querySelector("#metaface") as SVGElement

  setTimeout(async () => {
    metaface.classList.toggle("toggleTalking")
    await typeMessage(metamessage, first, speedInMs)
    await typeLink(metamessage, link, speedInMs)
    await typeMessage(metamessage, last, speedInMs)
    metaface.classList.toggle("toggleTalking")
  }, delay);
}