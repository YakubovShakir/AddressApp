import axios from "axios"
import { AddressPart } from "../types/Address"

const addAddress = async (
  region: AddressPart | undefined,
  district: AddressPart | undefined,
  locality: AddressPart | undefined,
  street: AddressPart | undefined,
  house: AddressPart | undefined
) => {
  const response = await axios.post(
    "/api/address/create",
    {
      region,
      district,
      locality,
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
