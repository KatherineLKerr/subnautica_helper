import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Days One, sans-serif',
    body: 'Quicksand, sans-serif',
  },
  shadows: {
    outline: 'none'
  }
})

const consistency = {
  fullSpace: '20px',
  halfSpace: '10px',
  quarterSpace: '5px'
}

const colours = {
  logoOrange: '#e28a32',
  logoBlue: '#8bbed7',

  white: '#ffffff',
  black: '#000000',
  frenchGray: '#D0CCD0',
  darkCyan: '#00838F',
  lightCyan: '#5ACDED',
  steelBlue: '#1F80C1',
  lightSteelBlue: '#73B9E8',
  darkRed: '#8F0000'

}

export const UiLibrary = {
  theme: theme,
  consistency: consistency,
  colours: colours,
}