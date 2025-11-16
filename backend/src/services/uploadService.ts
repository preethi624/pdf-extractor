import { IFileData } from "../interface/IFileInterface";
import { IUploadRepository } from "../repositories/IUploadRepository";
import { IUploadService } from "./IUploadService";
import { PDFDocument } from "pdf-lib";


export class UploadService implements IUploadService{
    constructor(private _uploadRepository:IUploadRepository){}
    async fileUpload(fileData:IFileData):Promise<{fileData?:IFileData,success:boolean}>{
        try {
            const response=await this._uploadRepository.uploadFile(fileData);
        if(response){
            return {
                fileData:response,
                success:true
            }
        }else{
            return {success:false}
        }
            
        } catch (error) {
            console.log(error);
            return{success:false}
            
            
        }
        

    }
    async newPdfCreate(fileUrl:string,selectedPages:number[]):Promise<Uint8Array>{
        try {
            const existingPdfBytes = await fetch(fileUrl).then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const newPdf = await PDFDocument.create();
        const pages = await newPdf.copyPages(
      pdfDoc,
      selectedPages.map(p => p - 1)
    );
    pages.forEach(p => newPdf.addPage(p));
    const pdfBytes=await newPdf.save();
    return pdfBytes
            
        } catch (error) {
            console.log(error);
            throw error
            
            
            
        }
        

    }
}