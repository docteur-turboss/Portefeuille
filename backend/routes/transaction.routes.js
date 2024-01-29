import { CreateTransactioncontroller,  ReadTransactioncontroller, UpdateTransactioncontroller, DeleteTransactioncontroller, } from "../controllers/transaction.control.js"
import { CreateFacturecontroller, ReadFacturecontroller, UpdateFacturecontroller, DeleteFacturecontroller } from "../controllers/facture.control.js";
import { hasAuthorisation, isAuthenticatedUser } from "../middlewares/auth.js";
import { limiterTransactionParams } from "../middlewares/rate-limit.js";
import express from "express";

const router = express.Router()

router.route('/facture')
.post(limiterTransactionParams, isAuthenticatedUser, CreateFacturecontroller)
.get(limiterTransactionParams, isAuthenticatedUser, hasAuthorisation, ReadFacturecontroller)
.put(limiterTransactionParams, isAuthenticatedUser, hasAuthorisation, UpdateFacturecontroller)
.delete(limiterTransactionParams, isAuthenticatedUser, hasAuthorisation, DeleteFacturecontroller)

router.route('/transaction')
.post(limiterTransactionParams, isAuthenticatedUser, CreateTransactioncontroller)
.get(limiterTransactionParams, isAuthenticatedUser, hasAuthorisation, ReadTransactioncontroller)
.put(limiterTransactionParams, isAuthenticatedUser, hasAuthorisation, UpdateTransactioncontroller)
.delete(limiterTransactionParams, isAuthenticatedUser, hasAuthorisation, DeleteTransactioncontroller)

export default router