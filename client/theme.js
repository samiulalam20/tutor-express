import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
      fontFamily: [
        "Century Gothic", "CenturyGothic",
        "AppleGothic",
        "sans-serif"
      ].join(','),
       
      fontStyle: "normal",
      fontVariant: "normal",
      fontWeight: 700,
      lineHeight: 26.4 
    },
    palette: {
      primary: {
        light: '#439889',
        main: '#00695c',
        dark: '#003d33',
        contrastText: '#ffffff',
    },
    secondary: {
      light: '#fdff58',
      main: '#c6ff00',
      dark: '#fdff58',
      contrastText: '#000000',
    },
      openTitle: '#455a64',
      protectedTitle: '#f57c00',
      type: 'light'
    }
  })

  export default theme