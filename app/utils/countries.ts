// TODO: type the variables
import { createThumbFromImage, CropImage } from '@/utils/image'

interface Props {
  countriesList?: Array<any>
  country?: string
  filePath?: string
  flagsIndices?:any
}

const loadFlag = (props: Props) => {
  const { country, filePath, flagsIndices } = props
  const leftTop = {
    x: 0,
    y: flagsIndices[country] * 2
  }
  const size = {
    height: 32,
    width: 32
  }
  const resize = {
    height: 96,
    width: 96
  }
  const options: CropImage = {
    leftTop: leftTop,
    size: size,
    resize: resize
  }
  const image = createThumbFromImage(filePath, options)
  return image
}

const setCountries = (props: Props) => {
  const { countriesList, filePath, flagsIndices } = props
  let getCountries = []
  countriesList.map((country) => {
    getCountries.push (
      {
        country_code: country.country_code,
        flag: loadFlag({country: country.country_code, filePath, flagsIndices}),
        phone_code: `+${country.phone_code}`
      }
    )
  })
  return getCountries
}

const orderArray = (array: Array<any>) => {
  array.sort((a: any, b: any) => {
    if (a.country_code < b.country_code) return -1
    if (a.country_code > b.country_code) return 1
    return
  })
  return array
}

export const loadCountries = (props: Props) => {
   const unOrderCountries = setCountries(props)
  const orderList = orderArray(unOrderCountries)
  return orderList
}