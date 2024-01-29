import { ReadUserParams, CreateUsercontroller, DeleteUserParams, DeleteUsercontroller, ReadUsercontroller, UpdateUsercontroller } from "../controllers/user.controller.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { limiterUser } from "../middlewares/rate-limit.js";
import express from "express";

const router = express.Router()

router.route('/sign/up').post(limiterUser, CreateUsercontroller)
router.route('/sign/in').post(limiterUser, ReadUserParams)
router.route('/sign/out').post(isAuthenticatedUser, DeleteUserParams)

router.route('/update/profile')
.put(limiterUser, isAuthenticatedUser, UpdateUsercontroller)

router.route('/@me').get(limiterUser, isAuthenticatedUser, ReadUsercontroller)

router.route('/@me/destroy').delete(limiterUser, isAuthenticatedUser, DeleteUsercontroller)

export default router