export type AddressObjectType =
  | "REGION"
  | "DISTRICT"
  | "LOCALITY"
  | "STREET"
  | "HOUSE"

export type TypedKeywords = {
  [key in AddressObjectType]: string[]
}

export type AddressObject = {
  type: AddressObjectType
  keyword: string | undefined
  value: string | number | undefined
}
export type AddressPart = {
  keyword: string
  value: string
}

export type FullAddressObject = {
  region: AddressPart | undefined
  district: AddressPart | undefined
  locality: AddressPart | undefined
  street: AddressPart | undefined
  house: AddressPart | undefined
}
