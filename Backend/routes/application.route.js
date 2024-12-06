import express from "express";

import isAuntecated from "../middewares/authunticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuntecated, applyJob);
router.route("/get").get(isAuntecated, getAppliedJobs);
router.route("/:id/applicants").get(isAuntecated, getApplicants);
router.route("/status/:id/update").post(isAuntecated, updateStatus);

export default router;
