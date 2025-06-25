import { AddressObject } from "../../types/Address"
import findOrAddDistrict from "./findOrAddDistrict"
import findOrAddHouse from "./findOrAddHouse"
import findOrAddLocality from "./findOrAddLocality"

import findOrAddRegion from "./findOrAddRegion"
import findOrAddStreet from "./findOrAddStreet"

async function addAddress(address: AddressObject): Promise<boolean | undefined> {
  try {
    let regionID, districtID, localityID, streetID

    if (address.region) regionID = await findOrAddRegion(address.region)

    if (address.district) districtID = await findOrAddDistrict(regionID, address.district)

    if (address.locality)
      localityID = await findOrAddLocality(regionID, districtID, address.locality)

    if (address.street)
      streetID = await findOrAddStreet(regionID, districtID, localityID, address.street)

    if (address.house)
      await findOrAddHouse(regionID, districtID, localityID, streetID, address.house)

    return true
  } catch (e) {
    console.error("Exception in addAddress - ", e)
  }
}

export default addAddress
