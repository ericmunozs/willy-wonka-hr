export interface IOompaLoompasList {
  current: number
  total: number
  results: IOompaLoompa[]
}

export interface IOompaLoompa {
  first_name: string
  last_name: string
  favorite: IFavorite
  gender: EGender
  image: string
  profession: string
  email: string
  age: number
  country: ECountry
  height: number
  id: number
}

export interface IOompaLoompasDetails {
  last_name: string
  description: string
  image: string
  profession: string
  quota: string
  height: number
  first_name: string
  country: string
  age: number
  favorite: IFavorite
  gender: string
  email: string
}

export enum ECountry {
  Loompalandia = 'Loompalandia',
}

export interface IFavorite {
  color: EColor
  food: EFood
  random_string: string
  song: string
}

export enum EColor {
  Blue = 'blue',
  Red = 'red',
}

export enum EFood {
  Chocolat = 'Chocolat',
  CocoaNuts = 'cocoa nuts',
}

export enum EGender {
  F = 'F',
  M = 'M',
}
