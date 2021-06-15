function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

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

export const plsDownloadMetamask = (speedInMs: number, delay: number) => {
  const metamessage = document.querySelector(".metamessage") as HTMLParagraphElement
  const metamaskMouth = document.querySelector("#metamaskMouth") as SVGElement

  const first = `You need to `
  const link = `download metamask`
  const last = ` for this application to work!`

  setTimeout(async () => {
    metamaskMouth.classList.toggle("talking")
    await typeMessage(metamessage, first, speedInMs)
    await typeLink(metamessage, link, speedInMs)
    await typeMessage(metamessage, last, speedInMs)
    metamaskMouth.classList.toggle("talking")
  }, delay);
}

export const speak = (newMessage: string, delay: number = 0, talkingSpeed: number = 50,) => {
  const metamessage = document.querySelector(".metamessage") as HTMLParagraphElement
  const metamaskMouth = document.querySelector("#metamaskMouth") as SVGElement

  setTimeout(async () => {
    metamaskMouth.classList.toggle("talking")
    metamessage.innerHTML = ""
    await typeMessage(metamessage, newMessage, talkingSpeed)
    metamaskMouth.classList.toggle("talking")
  }, delay);
}