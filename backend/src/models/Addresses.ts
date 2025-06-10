import mongoose from "mongoose"
import { AddressObject } from "../types/Address"

const AddressModel = new mongoose.Schema({
  region: { key: { type: String }, value: { type: String } },
  district: { key: { type: String }, value: { type: String } },
  populatedLocality: { key: { type: String }, value: { type: String } },
  street: { key: { type: String }, value: { type: String } },
  house: { key: { type: String }, value: { type: Number } },
})

const Addresses = mongoose.model("adresses", AddressModel)

export default Addresses
