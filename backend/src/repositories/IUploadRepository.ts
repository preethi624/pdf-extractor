import { IFileData } from "../interface/IFileInterface";

export interface IUploadRepository{
    uploadFile(fileData:IFileData):Promise<IFileData>
    
}