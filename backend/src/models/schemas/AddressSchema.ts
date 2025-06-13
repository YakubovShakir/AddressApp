import { Schema } from "mongoose"
import { AddressObject } from "../../types/Address"

export const AddressSchema = new Schema<AddressObject>({
  type: {
    type: String,
    required: true,
    enum: ["REGION", "DISTRICT", "POPULATED_LOCALITY", "STREET", "HOUSE"],
  },
  keyword: { type: String, required: true },
  value: {
    type: Schema.Types.Mixed,
    required: true,
  },
})
