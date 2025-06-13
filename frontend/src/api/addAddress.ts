import axios from "axios"
import { AddressObject } from "../types/Address"

const addAddress = async (
  region: AddressObject,
  district: AddressObject,
  populatedLocality: AddressObject,
  street: AddressObject,
  house: AddressObject
) => {
  const response = await axios.post(
    "/api/address/create",
    {
      region,
      district,
      populatedLocality,
      street,
      house,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}

export default addAddress
