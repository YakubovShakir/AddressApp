import { Schema } from "mongoose"
import { AddressObject } from "../../types/Address"
import { AddressSchema } from "./AddressSchema"

export interface StreetObject extends AddressObject {
  houses: AddressObject[]
}

export const StreetSchema = new Schema<StreetObject>({
  type: {
    type: String,
    required: true,
    enum: ["STREET"],
  },
  keyword: { type: String, required: true },
  value: {
    type: Schema.Types.Mixed,
    required: true,
  },
  houses: [{ type: AddressSchema, required: true, default: [] }],
})
