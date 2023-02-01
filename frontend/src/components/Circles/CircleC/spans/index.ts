import { createSpan as loginPageCreateSpan, donateSpan as loginPageDonateSpan } from "./login"
import { createSpan as contrPageCreateSpan, donateSpan as contrPageDonateSpan } from "./contribute"
import { createSpan as creatPageCreateSpan, donateSpan as creatPageDonateSpan } from "./contribute"

export const createSpanVariants = { loginPageCreateSpan, contrPageCreateSpan, creatPageCreateSpan }
export const donateSpanVariants = { loginPageDonateSpan, contrPageDonateSpan, creatPageDonateSpan }