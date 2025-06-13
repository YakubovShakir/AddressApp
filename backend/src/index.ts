import connectDatabase from "./config/database"
import * as dotenv from "dotenv"
dotenv.config()
import addAddress from "./services/addAddress"
import getAddress from "./services/getAddress"

import express, { json } from "express"
import cors from "cors"

const list = [
  {
    region: { type: "REGION", keyword: "респ", value: "Махачкала" },
    district: { type: "DISTRICT", keyword: "мо", value: "Ямало-Ненецкий" },
    populatedLocality: { type: "POPULATED_LOCALITY", keyword: "г", value: "Пушкин" },
    street: { type: "STREET", keyword: "ул", value: "Пушкинская" },
    house: { type: "HOUSE", keyword: "д", value: 6 },
  },
]
async function main() {
  const mongoURI = process.env.MONGO_URI
  if (!mongoURI) throw new Error("Missing MONGO_URI in .env file!")
  await connectDatabase(mongoURI)

  const app = express()

  app.use(express.urlencoded({ extended: true }))
  app.use(cors())
  app.use(json())

  app.post("/address/create", async (req, res) => {
    const region = req?.body?.region
    const district = req?.body?.district
    const populatedLocality = req?.body?.populatedLocality
    const street = req?.body?.street
    const house = req?.body?.house
    if (!region || !district || !populatedLocality || !street || !house)
      res.json({ status: 400, response: "Invalid address" })

    const result = await addAddress({ region, district, populatedLocality, street, house })

    if (result) res.status(200)
  })

  app.get("/address", async (req: any, res) => {
    const regionName = req?.query?.regionName
    if (!regionName) res.json({ stastus: 404, response: "Region not exist" })

    const region = await getAddress(regionName)
    console.log(region)
    if (region) res.json({ status: 200, region })
  })
  app.listen(3000, () => {
    console.log(`Server started. Listening on port 3000`)
  })
}

main()
