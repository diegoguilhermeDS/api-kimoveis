import express, { Application, json } from "express";
import "express-async-errors"
import { handleErrors } from "./errors";

const app: Application = express()
app.use(json())

app.use(handleErrors)

export default app
