import { contribute } from "./contribute";
import { create } from "./create";
import { login } from "./login";

export const variants = { ...login, ...contribute, ...create }