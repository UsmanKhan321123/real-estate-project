import express from "express";
import {
  test,
  shouldBeAdmin,
  shouldBeLoggedIn,
} from "../contollers/testControllers";
let testRouter = express.Router();

testRouter.get("/shouldBeLoggedIn", shouldBeLoggedIn);
testRouter.get("/shouldBeAdmin", shouldBeAdmin);
