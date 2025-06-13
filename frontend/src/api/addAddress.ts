import axios from "axios"
import { AddressObject } from "../types/Address"

const addAddress = async (
  region: AddressObject,
  district: AddressObject,
  populatedLocality: AddressObject,
  street: AddressObject,
  house: AddressObject
) => {
  console.log(region, district, populatedLocality, street, house)
  const response = await axios.post(
    "http://localhost:3000/address/create",
    {
      region,
      district,
      populatedLocality,
      street,
      house,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }
  )
  console.log(response)
}

export default addAddress
