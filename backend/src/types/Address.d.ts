export type AddressPart = {
  keyword: string
  value: string | number
}

export type AddressObject = {
  region: AddressPart | undefined
  district: AddressPart | undefined
  locality: AddressPart | undefined
  street: AddressPart | undefined
  house: AddressPart | undefined
}
