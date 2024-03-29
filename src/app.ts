import express, { Application, json } from "express";
import "express-async-errors"
import { handleErrors } from "./errors";
import categoryRouter from "./routes/categories.routes";
import loginRouter from "./routes/login.routes";
import realEstatesRouter from "./routes/realEstates.routes";
import schedulesRouter from "./routes/schedules.routes";
import usersRouter from "./routes/users.routes";

const app: Application = express()
app.use(json())

app.use("/users", usersRouter)
app.use("/login", loginRouter)
app.use("/categories", categoryRouter)
app.use("/realEstate", realEstatesRouter)
app.use("/schedules", schedulesRouter)

app.use(handleErrors)

export default app
