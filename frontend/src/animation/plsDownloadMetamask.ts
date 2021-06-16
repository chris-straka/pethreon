const sleep = (sleepTime: number = 50) => new Promise(res => setTimeout(res, sleepTime))

const typeLink = async (message: HTMLParagraphElement, link: string) => {
  let phrase: string = "";
  for (const char of link) {
    if (message.firstElementChild) message.firstElementChild.remove()
    phrase += char
    const updatedLink = `<a href="https://metamask.io/download" target="_blank" rel="noreferrer">${phrase}</a>`
    message.innerHTML += updatedLink
    await sleep()
  }
}

const typeMessage = async (message: HTMLParagraphElement, messageToAdd: string) => {
  for (const char of messageToAdd) {
    message.innerHTML += char
    await sleep()
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
    await typeMessage(metamessage, first)
    await typeLink(metamessage, link)
    await typeMessage(metamessage, last)
    metamaskMouth.classList.toggle("talking")
  }, delay);
}