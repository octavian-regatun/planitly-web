export interface HereApiData {
  items: Item[]
}

interface Item {
  title: string
  id: string
  politicalView: string
  resultType: string
  houseNumberType: string
  addressBlockType: string
  localityType: string
  administrativeAreaType: string
  address: Address
  position: Position
  access: Position[]
  distance: number
  mapView: MapView
  categories: Category[]
  foodTypes: Category[]
  houseNumberFallback: boolean
  timeZone: TimeZone
  scoring: Scoring
  parsing: { [key: string]: Parsing[] }
  streetInfo: StreetInfo[]
  countryInfo: CountryInfo
}

interface Position {
  lat: number
  lng: number
}

interface Address {
  label: string
  countryCode: string
  countryName: string
  stateCode: string
  state: string
  countyCode: string
  county: string
  city: string
  district: string
  subdistrict: string
  street: string
  block: string
  subblock: string
  postalCode: string
  houseNumber: string
  building: string
}

interface Category {
  id: string
  name: string
  primary: boolean
}

interface CountryInfo {
  alpha2: string
  alpha3: string
}

interface MapView {
  west: number
  south: number
  east: number
  north: number
}

interface Parsing {
  start: number
  end: number
  value: string
  qq: string
}

interface Scoring {
  queryScore: number
  fieldScore: FieldScore
}

interface FieldScore {
  country: number
  countryCode: number
  state: number
  stateCode: number
  county: number
  countyCode: number
  city: number
  district: number
  subdistrict: number
  streets: number[]
  block: number
  subblock: number
  houseNumber: number
  postalCode: number
  building: number
  unit: number
  placeName: number
  ontologyName: number
}

interface StreetInfo {
  baseName: string
  streetType: string
  streetTypePrecedes: boolean
  streetTypeAttached: boolean
  prefix: string
  suffix: string
  direction: string
  language: string
}

interface TimeZone {
  name: string
  utcOffset: string
}
