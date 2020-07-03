import { reactive, ref, computed, toRefs, watch } from '@vue/composition-api'
import { createThumbFromImage, CropImage } from '@/utils/image'

interface Country {
  country_code: string
  flag: any
  phone_code: number
  country_en?: string
  country_cn?: string
}

export const useCountry = () => {
  const countries = ref([])
  const prefix = ref(0)
  const flag = ref(null)
  const countryCode = ref (null)

  const setPrefix = value => {
    prefix.value = value
    console.log(`useCountry prefix: ${prefix.value}`)
  }
  const setFlag = value => flag.value = value
  const setCountries = value => countries.value.push(value)
  const setCountryCode = value => countryCode.value = value
  
  const loadCountries = async (countriesList, filePath: string, flagsIndices) => {
    console.log('loadCountries')
    countriesList.map((country: Country) => {
      setCountries (
        {
          country_code: country.country_code,
          flag: loadFlag(country.country_code, filePath, flagsIndices),
          phone_code: `+${country.phone_code}`
        }
      )
    })
    console.log(`countries: ${countries.value.length}`)
  }

  const loadFlag = (country: string, filePath: string, flagsIndices) => {
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

  // watch (countries, (first, second) => console.log('countries are changed'))
  // watch (prefix, (first, second) => console.log(`prefix are changed, new: ${first}`))
  // watch (flag, (first, second) => console.log(`flag are changed`))


  return { 
    // prefix: computed(() => state.prefix),
    // flag: computed(() => state.flag),
    getCountries: computed(() => countries.value),
    // countryCode: computed(() => state.countryCode),
    prefix,
    flag,
    countries,
    countryCode,
    setPrefix,
    setFlag,
    loadCountries,
    setCountryCode
  }
}
