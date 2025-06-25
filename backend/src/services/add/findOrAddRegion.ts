import Region from "../../models/Region"
import { AddressPart } from "../../types/Address"

async function findOrAddRegion(part: AddressPart): Promise<string | undefined> {
  try {
    const finded = await Region.findOne(part)
    if (finded) return finded.id

    const added = await Region.insertOne(part)
    return added.id
  } catch (e) {
    console.error("Error in findOrAddRegion -", e)
  }
}
export default findOrAddRegion
