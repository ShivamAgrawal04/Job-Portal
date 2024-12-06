import express from "express";

import isAuntecated from "../middewares/authunticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuntecated, postJob);
router.route("/get").get(isAuntecated, getAllJobs);
router.route("/getadminjobs").get(isAuntecated, getAdminJobs);
router.route("/get/:id").get(isAuntecated, getJobById);

export default router;
