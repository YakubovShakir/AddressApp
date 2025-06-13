import Addresses from "../models/Addresses"
import { AddressObject } from "../types/Address"
import { findAddressDocument } from "./findAddressParts"
import {
  createDistrict,
  createHouse,
  createLocality,
  createRegion,
  createStreet,
} from "./createAddressParts"

async function insertAddressInDB(
  region: AddressObject,
  district: AddressObject,
  locality: AddressObject,
  street: AddressObject,
  house: AddressObject
): Promise<boolean | undefined> {
  const addressDocument = await findAddressDocument(region.value)
  if (!addressDocument) {
    const createdRegion = createRegion(region, district, locality, street, house)
    await Addresses.insertOne({ region: createdRegion })
    return true
  }

  const findedRegion = addressDocument.region

  const findedDistrict = findedRegion.districts.find(({ value }) => district.value === value)
  if (!findedDistrict) {
    const createdDistrict = createDistrict(district, locality, street, house)
    findedRegion.districts.push(createdDistrict)
    await addressDocument.save()
    return
  }

  const findedLocality = findedDistrict.populatedLocalities.find(
    ({ value }) => locality.value === value
  )
  if (!findedLocality) {
    const createdLocality = createLocality(locality, street, house)
    findedDistrict.populatedLocalities.push(createdLocality)
    await addressDocument.save()
    return
  }

  const findedStreet = findedLocality.streets.find(({ value }) => street.value === value)
  if (!findedStreet) {
    const createdStreet = createStreet(street, house)
    findedLocality.streets.push(createdStreet)
    await addressDocument.save()
    return
  }

  const findedHouse = findedStreet.houses.find(({ value }) => house.value === value)
  if (!findedHouse) {
    const createdHouse = createHouse(house)
    findedStreet.houses.push(createdHouse)
    await addressDocument.save()
    return
  }
}

export default insertAddressInDB
