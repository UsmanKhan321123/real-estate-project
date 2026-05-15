import express from "express";
import {
  test,
  shouldBeAdmin,
  shouldBeLoggedIn,
} from "../contollers/testControllers.js";
import verifyToken from "../middleware/verifyToken.js";
let testRouter = express.Router();

testRouter.get("/shouldBeLoggedIn",verifyToken, shouldBeLoggedIn);
testRouter.get("/shouldBeAdmin",verifyToken, shouldBeAdmin);

export default testRouter