export interface IFileData {
  fileName: string;
  fileSize: number;
  filePath: {
    url: string;
    public_id: string|null;
  };
}
