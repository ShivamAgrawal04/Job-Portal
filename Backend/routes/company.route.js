import express from "express";

import isAuntecated from "../middewares/authunticated.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import { singleUpload } from "../middewares/multer.js";

const router = express.Router();

router.route("/register").post(isAuntecated, registerCompany);
router.route("/get").get(isAuntecated, getCompany);
router.route("/get/:id").get(isAuntecated, getCompanyById);
router.route("/update/:id").put(isAuntecated, singleUpload, updateCompany);

export default router;
