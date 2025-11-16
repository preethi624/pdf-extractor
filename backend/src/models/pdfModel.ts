import mongoose, { Document, Schema } from "mongoose";

export interface IEventImage {
  url: string;              // Cloudinary file URL
  public_id: string | null; // Cloudinary public ID (used for deletion)
}

export interface IPdf extends Document {
  fileName: string;         // Original file name
  filePath: IEventImage;    // Cloudinary file details
  fileSize: number;         // File size in bytes
  uploadedBy?: mongoose.Types.ObjectId; // Optional: user who uploaded
  uploadedAt: Date;         // Upload date
}

const pdfSchema = new Schema<IPdf>(
  {
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: {
        url: { type: String, required: true },
        public_id: { type: String, required: false },
      },
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPdf>("PdfFile", pdfSchema);
