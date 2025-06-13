import mongoose, { Schema, Document } from "mongoose"
import { RegionObject, RegionSchema } from "./schemas/RegionSchema"

export interface AddressDocument extends Document {
  region: RegionObject
}

const AddressModel = new Schema<AddressDocument>({
  region: { type: RegionSchema, required: true },
})

const Addresses = mongoose.model<AddressDocument>("Addresses", AddressModel)

export default Addresses
