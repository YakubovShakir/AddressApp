export type AddressObjectType = "REGION" | "DISTRICT" | "POPULATED_LOCALITY" | "STREET" | "HOUSE"

export type TypedKeywords = {
  [key in AddressObjectType]: string[]
}

type AddressObject = {
  type: AddressObjectType
  keyword: string
  value: string
}

type AddressFullObject = {
  region: AddressObject
  district: AddressObject
  populatedLocality: AddressObject
  street: AddressObject
  house: AddressObject
}
