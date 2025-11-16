
const API_BASE_URL = `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/upload`;

import { AxiosError } from "axios";

import axios from "axios";

export const fileUpload = async (formData:FormData) => {
  try {
    const response= await axios.post(
      `${API_BASE_URL}/upload`,
      formData
    );

    if (response) {
      return {
        success: true,
        message: "successfully uploaded",
        response: response.data,
      };
    } else {
      return { success: false, message: "something wrong" };
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data || axiosError.message;
  }
};
export const createNewPdf=async(fileUrl:string,selectedPages:number[])=>{
  try {
    const response=await axios.post(`${API_BASE_URL}/newPdf`,
      {fileUrl,
selectedPages},
    {
        responseType: "blob",
      }
    )
    return response.data
    
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data || axiosError.message;
  }

}
export const fileUploadRepositry = {
  fileUpload,
  createNewPdf
};
