import { IFileData } from "../interface/IFileInterface";

export interface IUploadService{
    fileUpload(fileData:IFileData):Promise<{fileData?:IFileData,success:boolean}>
    newPdfCreate(fileUrl:string,selectedPages:number[]):Promise<Uint8Array>
}