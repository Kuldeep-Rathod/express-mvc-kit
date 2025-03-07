import express from "express";
import { getUsers, homePage } from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getUsers);
router.route("/home").get(homePage);

export default router;
