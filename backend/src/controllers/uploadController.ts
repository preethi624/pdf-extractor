import {Request,Response} from "express"
import { IUploadController } from "./IUploadController";
import { IUploadService } from "../services/IUploadService";
import { supabase } from "../config/supabaseClient";
export class UploadController implements IUploadController{
    constructor(private _uploadService:IUploadService){}
   

  async uploadFile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ success: false, message: "No file uploaded" });
        return;
      }

      const { originalname, size, mimetype, buffer,public_id } = req.file as any;
      const bucketName = "Pdf Loader"; // your Supabase bucket
      const fileName = `${Date.now()}_${originalname}`;

      // ✅ Upload directly to Supabase
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, buffer, {
          contentType: mimetype,
          upsert: true,
        });

      if (error) throw error;

      // ✅ Get public URL
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      // ✅ Structure same as before
      const fileData = {
        fileName: originalname,
        fileSize: size,
        filePath: {
          url: publicUrlData.publicUrl, // Supabase public URL
          public_id: public_id || null,
        },
      };
      console.log("filedata",fileData)

      // ✅ Save file info in DB through your service
      const response = await this._uploadService.fileUpload(fileData);

      res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        data: response,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Upload error:", error.message);
        res.status(500).json({
          success: false,
          message: "Failed to upload file",
          error: error.message,
        });
      } else {
        console.error("Unknown error:", error);
        res.status(500).json({
          success: false,
          message: "An unexpected error occurred",
        });
      }
    }
  }
  async createNewPdf(req:Request,res:Response):Promise<void>{
    try {
      const {fileUrl,selectedPages}=req.body;
      if (!fileUrl || !selectedPages) {
      res.json({message:"invalid data"});
    }
    const response=await this._uploadService.newPdfCreate(fileUrl,selectedPages);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=new.pdf");
     res.send(Buffer.from(response));



    } catch (error) {
      
    }

  }


}