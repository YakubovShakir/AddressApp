import AddressImp from "../classes/Address"
import insertAddressInDB from "./insertAddressInDB"

async function addAddress(address: any): Promise<boolean | undefined> {
  try {
    const fullAddress = {
      region: address?.region,
      district: address?.district,
      populatedLocality: address?.populatedLocality,
      street: address?.street,
      house: address?.house,
    }

    Object.entries(fullAddress).forEach(([key, value]) => {
      if (!value) throw new Error(`Invalid ${key}`)
      if (!AddressImp.isAddressObject(value)) throw new Error(`Fail parse ${key}`)
    })

    const parsed = new AddressImp(
      fullAddress.region,
      fullAddress.district,
      fullAddress.populatedLocality,
      fullAddress.street,
      fullAddress.house
    )

    await insertAddressInDB(
      parsed.region,
      parsed.district,
      parsed.populatedLocality,
      parsed.street,
      parsed.house
    )

    return true
  } catch (e) {
    console.error("Exception in addAddress - ", e)
  }
}

export default addAddress
