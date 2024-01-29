import ressources from "./routes/principal_params.routes.js";
import transaction from "./routes/transaction.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import formidable from "./middlewares/formidable.js";
import user from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import express from 'express';

import './config/loadEnv.js';

const app = express();

app.use(cookieParser(process.env.SECRETCOOKIES));
app.use(formidable);

app.use("/api/v1/users/", user)
app.use("/api/v1/ressources/", ressources)
app.use("/api/v1/transactions/", transaction)


let response404 = {
    success: false,
    data: {
      commentaire: "Utilisation d'une methode sur un chemin non supporté",
    },
}
app.get('*', (req, res) => res.status(404).json(response404))
app.post('*', (req, res) => res.status(404).json(response404))
app.put('*', (req, res) => res.status(404).json(response404))
app.delete('*', (req, res) => res.status(404).json(response404))

app.use(errorHandler);

app.listen(process.env.PORTEXPRESS, () =>{
    console.log(`The back-end node (express) is ready to port : ${process.env.PORTEXPRESS} (http:localhost:${process.env.PORTEXPRESS})`)
});