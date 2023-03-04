import { z } from "zod";
import { loginSchema } from "../schemas/login.schemas";

type iLogin = z.infer<typeof loginSchema>

export { iLogin }