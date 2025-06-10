import AddressImp from "./classes/Address"
import connectDatabase from "./config/database"
import testAddresses from "./testAddresses"
import * as dotenv from "dotenv"
dotenv.config()
import Addresses from "./models/Addresses"

async function main() {
  const mongoURI = process.env.MONGO_URI
  if (!mongoURI) throw new Error("Missing MONGO_URI in .env file!")

  await connectDatabase(mongoURI)

  for (let brokenAddress of testAddresses) {
    console.log("\nСломанный адрес - ", brokenAddress)
    const address = AddressImp.parse(brokenAddress)

    const insert = {
      region: { key: address.region?.keyword, value: address.region?.value },
      district: { key: address.district?.keyword, value: address.district?.value },
      populatedLocality: {
        key: address.populatedLocality?.keyword,
        value: address.populatedLocality?.value,
      },
      street: { key: address.street?.keyword, value: address.street?.value },
      house: { key: address.house?.keyword, value: address.house?.value },
    }
    await Addresses.insertOne(insert)
  }
}

main()
