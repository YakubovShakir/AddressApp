import { RegionObject } from "../models/schemas/RegionSchema"
import { findAddress, findAddressDocument } from "./findAddressParts"

async function getAddress(regionName: string): Promise<RegionObject | null | undefined> {
  try {
    const address = await findAddressDocument(regionName)
    if (!address) return
    return {
      type: "REGION",
      keyword: address?.region.keyword,
      value: address?.region?.value,
      districts: address?.region?.districts,
    }
  } catch (e) {
    console.error("Error in getAddress - ", e)
  }
}

export default getAddress
