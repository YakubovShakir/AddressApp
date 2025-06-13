import axios from "axios"

const getAddress = async (regionName: string) => {
  console.log(regionName)
  const response = await axios.get("http://localhost:3000/address", {
    params: {
      regionName,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
  const region = response?.data?.region
  if (region) return region
}

export default getAddress
