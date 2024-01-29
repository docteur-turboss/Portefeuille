import { ErrorException, errorCode } from '../models/error.models.js';
import {rateLimit} from "express-rate-limit";
import { v4 as uuidv4} from 'uuid';

const baseConfig = {
  handler: (req, res, next, options) => next(new ErrorException(errorCode.ToManyRequest, options.message)),
  keyGenerator : (req, res) => uuidv4(),
}

export let limiterUser = rateLimit({
  ...baseConfig,
  windowMs: 1000 * 60 * 60 /* (1 heure) */,
  message : "Trop de requêtes, veuillez réessayer dans une heure.",
  max : 5
})

export let limiterPrincipalParams = rateLimit({
  ...baseConfig,
  windowMs: 1000 * 60 * 5 /* (5 minutes) */,
  message : "Trop de requêtes, veuillez réessayer dans cinq minutes.",
  max : 5
})

export let limiterTransactionParams = rateLimit({
  ...baseConfig,
  windowMs: 1000 * 60 /* (1 minute) */,
  message : "Trop de requêtes, veuillez réessayer dans cinq minutes.",
  max : 5
})