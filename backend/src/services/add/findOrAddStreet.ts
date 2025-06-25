import Street from "../../models/Street"
import { AddressPart } from "../../types/Address"

async function findOrAddStreet(
  regionID: string | undefined,
  districtID: string | undefined,
  localityID: string | undefined,
  part: AddressPart
): Promise<string | undefined> {
  try {
    const baseQuery = {
      keyword: part.keyword,
      value: part.value,
    }

    const exactMatch = await Street.findOne({
      ...baseQuery,
      ...(regionID && { regionID }),
      ...(districtID && { districtID }),
      ...(localityID && { localityID }),
    })

    if (exactMatch) return exactMatch.id

    const possibleQueries = []

    if (localityID) {
      possibleQueries.push({ ...baseQuery, localityID })
    }
    if (districtID) {
      possibleQueries.push({
        ...baseQuery,
        districtID,
        localityID: { $exists: false },
      })
    }
    if (regionID) {
      possibleQueries.push({
        ...baseQuery,
        regionID,
        districtID: { $exists: false },
        localityID: { $exists: false },
      })
    }

    for (const query of possibleQueries) {
      const foundStreet = await Street.findOne(query)
      if (foundStreet) {
        const updates: Record<string, any> = {}
        if (localityID && !foundStreet.localityID) updates.localityID = localityID
        if (districtID && !foundStreet.districtID) updates.districtID = districtID
        if (regionID && !foundStreet.regionID) updates.regionID = regionID

        if (Object.keys(updates).length > 0) {
          await Street.updateOne({ _id: foundStreet._id }, { $set: updates })
        }
        return foundStreet.id
      }
    }

    const newStreet = await Street.create({
      ...part,
      ...(regionID && { regionID }),
      ...(districtID && { districtID }),
      ...(localityID && { localityID }),
    })

    return newStreet.id
  } catch (e) {
    console.error("Error in findOrAddStreet -", e)
  }
}

export default findOrAddStreet
