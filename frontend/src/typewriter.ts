import { sleep } from './utility/functions';

const first = `You need to `
const link = `download metamask`
const last = ` for this application to work!`

const addMessage = async (message: HTMLParagraphElement, messageToAdd: string, sleepDuration: number) => {
  for (const char of messageToAdd) {
    message.innerHTML += char
    await sleep(sleepDuration)
  }
}

const addLink = async (message: HTMLParagraphElement, link: string, sleepDuration: number) => {
  let phrase: string = "";
  for (const char of link) {
    if (message.firstElementChild) message.firstElementChild.remove()
    phrase += char
    const updatedLink = `<a href="https://metamask.io/download" target="_blank" rel="noreferrer">${phrase}</a>`
    message.innerHTML += updatedLink
    await sleep(sleepDuration)
  }
}

export const typeWriterEffect = (speedInMs: number, delay: number) => {
  setTimeout(async () => {
    const metamessage = document.querySelector(".metamessage") as HTMLParagraphElement;
    await addMessage(metamessage, first, speedInMs)
    await addLink(metamessage, link, speedInMs)
    await addMessage(metamessage, last, speedInMs)
    console.log(metamessage)
  }, delay);
}