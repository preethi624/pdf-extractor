import express from "express";

import { uploadController } from "../container/uploaddi";
import { upload } from "../middleware/uploadMiddleware";

const router = express.Router();

router.post(
  "/upload",
  upload.single("file"), 
  uploadController.uploadFile.bind(uploadController)
);
router.post(
  "/newPdf",
  
  uploadController.createNewPdf.bind(uploadController)
);

export default router;
