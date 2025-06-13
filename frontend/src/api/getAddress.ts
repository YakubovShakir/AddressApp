import axios from "axios"

const getAddress = async (regionName: string) => {
  const response = await axios.get("/api/address", {
    params: {
      regionName,
    },
    headers: {
      "Content-Type": "application/json",
    },
  })
  const region = response?.data?.region
  if (region) return region
}

export default getAddress
