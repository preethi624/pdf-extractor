import {Request,Response} from "express"
export interface IUploadController{
    uploadFile(req:Request,res:Response):Promise<void>
    createNewPdf(req:Request,res:Response):Promise<void>
    
}