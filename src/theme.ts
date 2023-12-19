import {createTheme} from '@mui/material/styles'

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#ffffff',
		},
		text: {
			primary: '#ffffff',
			secondary: '#b3b3b3',
		},
	},
})

export default darkTheme
