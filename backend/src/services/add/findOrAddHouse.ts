import House from "../../models/House"
import { AddressPart } from "../../types/Address"

async function findOrAddHouse(
  regionID: string | undefined,
  districtID: string | undefined,
  localityID: string | undefined,
  streetID: string | undefined,
  part: AddressPart
): Promise<string | undefined> {
  try {
    const baseQuery = {
      keyword: part.keyword,
      value: part.value,
    }

    const exactMatch = await House.findOne({
      ...baseQuery,
      ...(regionID && { regionID }),
      ...(districtID && { districtID }),
      ...(localityID && { localityID }),
      ...(streetID && { streetID }),
    })

    if (exactMatch) return exactMatch.id

    const possibleQueries = []

    if (streetID) {
      possibleQueries.push({ ...baseQuery, streetID })
    }
    if (localityID) {
      possibleQueries.push({ ...baseQuery, localityID, streetID: { $exists: false } })
    }
    if (districtID) {
      possibleQueries.push({
        ...baseQuery,
        districtID,
        localityID: { $exists: false },
        streetID: { $exists: false },
      })
    }
    if (regionID) {
      possibleQueries.push({
        ...baseQuery,
        regionID,
        districtID: { $exists: false },
        localityID: { $exists: false },
        streetID: { $exists: false },
      })
    }

    for (const query of possibleQueries) {
      const foundHouse = await House.findOne(query)
      if (foundHouse) {
        const updates: Record<string, any> = {}
        if (streetID && !foundHouse.streetID) updates.streetID = streetID
        if (localityID && !foundHouse.localityID) updates.localityID = localityID
        if (districtID && !foundHouse.districtID) updates.districtID = districtID
        if (regionID && !foundHouse.regionID) updates.regionID = regionID

        if (Object.keys(updates).length > 0) {
          await House.updateOne({ _id: foundHouse._id }, { $set: updates })
        }
        return foundHouse.id
      }
    }

    const newHouse = await House.create({
      ...part,
      ...(regionID && { regionID }),
      ...(districtID && { districtID }),
      ...(localityID && { localityID }),
      ...(streetID && { streetID }),
    })

    return newHouse.id
  } catch (e) {
    console.error("Error in findOrAddHouse -", e)
  }
}

export default findOrAddHouse
