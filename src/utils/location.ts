import axios from "axios"
import type { IpApiData } from "../types/ipApi"

export async function getLatLonFromIp(ip: string) {
  const { data } = await axios.get<IpApiData>(`http://ip-api.com/json/${ip}`)

  return data
}
