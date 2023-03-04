import express, { Application, json } from "express";
import "express-async-errors"
import { handleErrors } from "./errors";
import usersRouter from "./routes/users.routes";

const app: Application = express()
app.use(json())

app.use("/users", usersRouter)

app.use(handleErrors)

export default app
