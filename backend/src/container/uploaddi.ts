import { UploadController } from "../controllers/uploadController";
import { UploadRepository } from "../repositories/uploadRepository";
import { UploadService } from "../services/uploadService";

const uploadRepository=new UploadRepository();
const uploadService=new UploadService(uploadRepository);
export const uploadController=new UploadController(uploadService)