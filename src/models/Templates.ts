import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITemplate extends Document {
  templateId: string;
  name: string;
  description: string;
  tags: string[];
  preview: string;
  category: string;
  html: string;
  css: string;
  js: string;
  createdAt: Date;
  updatedAt: Date;
}

const TemplateSchema = new Schema<ITemplate>(
  {
    templateId: {
      type: String,
      required: true,
      unique: true, // one document per template
      index: true,
    },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    tags: [String],
    preview: { type: String, default: "" },
    category: { type: String, default: "Professional" },
    html: { type: String, required: true },
    css: { type: String, required: true },
    js: { type: String, required: true },
  },
  { timestamps: true },
);

const Template: Model<ITemplate> =
  mongoose.models.Template ||
  mongoose.model<ITemplate>("Template", TemplateSchema);

export default Template;
