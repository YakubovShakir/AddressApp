import connectDatabase from "./config/database"
import * as dotenv from "dotenv"
dotenv.config()
import addAddress from "./services/add/addAddress"

import express, { json } from "express"
import cors from "cors"
import findRegions from "./services/find/findRegions"
import findDistricts from "./services/find/findDistricts"
import findLocalities from "./services/find/findLocalities"
import findStreets from "./services/find/findStreet"
import findHouses from "./services/find/findHouses"
import { getAddressFromQuery, isAddressPart } from "./utils/utils"

async function main() {
  const mongoURI = process.env.MONGO_URI
  if (!mongoURI) throw new Error("Missing MONGO_URI in .env file!")
  await connectDatabase(mongoURI)

  const app = express()

  app.use(express.urlencoded({ extended: true }))
  app.use(cors())
  app.use(json())

  app.post("/api/address/create", async (req, res) => {
    const address = getAddressFromQuery(req?.body)

    Object.entries(address).forEach(([key, part]) => {
      if (part) {
        if (!isAddressPart(part.keyword)) throw new Error(`Fail parse ${key}`)
      }
    })

    const result = await addAddress(address)
    if (!result) {
      res.json({ status: 400, response: "Failed to create address in database" })
      return
    }

    res.status(201).json({
      status: 201,
    })
  })

  app.get("/api/addressPart", async (req: any, res) => {
    const address = getAddressFromQuery(JSON.parse(req?.query?.address))
    const type = JSON.parse(req?.query?.address)?.type
    let parts

    switch (type) {
      case "region":
        parts = await findRegions(address.district, address.locality, address.street, address.house)
        break
      case "district":
        parts = await findDistricts(address.region, address.locality, address.street, address.house)
        break
      case "locality":
        parts = await findLocalities(
          address.region,
          address.district,
          address.street,
          address.house
        )
        break
      case "street":
        parts = await findStreets(address.region, address.district, address.locality, address.house)
        break
      case "house":
        parts = await findHouses(address.region, address.district, address.locality, address.street)
        break
      default:
        res.json({ stastus: 400, response: "Unknown type of address part" })
        return
    }
    if (!parts) {
      res.json({ stastus: 404, response: "Not found parts" })
      return
    }
    res.json({ status: 200, parts })
  })
  app.listen(3000, () => {
    console.log(`Server started. Listening on port 3000`)
  })
}

main()
