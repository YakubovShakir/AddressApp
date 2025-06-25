import axios from "axios"
import { FullAddressObject } from "../types/Address"

const getAddressPart = async (
  address: FullAddressObject,
  type: "region" | "district" | "locality" | "street" | "house"
) => {
  const response = await axios.get("/api/addressPart", {
    params: {
      address: JSON.stringify({
        region: {
          keyword: address?.region?.keyword,
          value: address?.region?.value,
        },
        district: {
          keyword: address?.district?.keyword,
          value: address?.district?.value,
        },
        locality: {
          keyword: address?.locality?.keyword,
          value: address?.locality?.value,
        },
        street: {
          keyword: address?.street?.keyword,
          value: address?.street?.value,
        },
        house: {
          keyword: address?.house?.keyword,
          value: address?.house?.value,
        },

        type,
      }),
    },
  })
  if (address) return response?.data?.parts
}

export default getAddressPart
