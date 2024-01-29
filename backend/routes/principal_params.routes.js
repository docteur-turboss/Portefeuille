import {CreateCategorycontroller,ReadCategorycontroller,UpdateCategorycontroller,DeleteCategorycontroller} from "../controllers/category.controller.js"
import {CreateObjectifcontroller,DeleteObjectifcontroller,ReadObjectifcontroller,UpdateObjectifcontroller} from "../controllers/objectif.control.js"
import {CreateBudgetcontroller,ReadBudgetcontroller,UpdateBudgetcontroller,DeleteBudgetcontroller} from "../controllers/budget.controller.js"
import {CreateComptecontroller,ReadComptecontroller,UpdateComptecontroller,DeleteComptecontroller} from "../controllers/compte.controller.js"
import { hasAuthorisation, isAuthenticatedUser } from "../middlewares/auth.js";
import { limiterPrincipalParams } from "../middlewares/rate-limit.js";
import express from "express";

const router = express.Router()

router.route('/budget')
.post(limiterPrincipalParams, isAuthenticatedUser, CreateBudgetcontroller)
.get(limiterPrincipalParams, isAuthenticatedUser, hasAuthorisation, ReadBudgetcontroller)
.put(limiterPrincipalParams, isAuthenticatedUser, hasAuthorisation, UpdateBudgetcontroller)
.delete(limiterPrincipalParams, isAuthenticatedUser, hasAuthorisation, DeleteBudgetcontroller)

router.route('/category')
.post(limiterPrincipalParams, isAuthenticatedUser, CreateCategorycontroller)
.get(limiterPrincipalParams, isAuthenticatedUser, hasAuthorisation, ReadCategorycontroller)
.put(limiterPrincipalParams, isAuthenticatedUser, hasAuthorisation, UpdateCategorycontroller)
.delete(limiterPrincipalParams, isAuthenticatedUser, hasAuthorisation, DeleteCategorycontroller)

router.route('/compte')
.post(limiterPrincipalParams, isAuthenticatedUser, CreateComptecontroller)
.get(limiterPrincipalParams, isAuthenticatedUser, hasAuthorisation, ReadComptecontroller)
.put(limiterPrincipalParams, isAuthenticatedUser, hasAuthorisation, UpdateComptecontroller)
.delete(limiterPrincipalParams, isAuthenticatedUser, hasAuthorisation, DeleteComptecontroller)

router.route('/objectif')
.post(limiterPrincipalParams, isAuthenticatedUser, CreateObjectifcontroller)
.get(limiterPrincipalParams, isAuthenticatedUser, hasAuthorisation, ReadObjectifcontroller)
.put(limiterPrincipalParams, isAuthenticatedUser, hasAuthorisation, UpdateObjectifcontroller)
.delete(limiterPrincipalParams, isAuthenticatedUser, hasAuthorisation, DeleteObjectifcontroller)

export default router