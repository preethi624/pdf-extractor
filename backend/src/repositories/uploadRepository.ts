import { IFileData } from "../interface/IFileInterface";
import { IUploadRepository } from "./IUploadRepository";
import PdfFile from "../models/pdfModel";


export class UploadRepository implements IUploadRepository{
    async uploadFile(fileData:IFileData):Promise<IFileData>{
        try {
            return await PdfFile.create({
                fileName:fileData.fileName,
                fileSize:fileData.fileSize,
                filePath:fileData.filePath

            })
            
        } catch (error) {
            console.log(error);
            throw new Error("Failed to upload file");
            
            
        }


    }
}
    