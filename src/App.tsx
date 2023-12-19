import './App.css'
import {ApiProvider} from './Context'
import Dashboard from './Dashboard'
import {Box, ThemeProvider} from '@mui/material'
import darkTheme from './theme'

function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<ApiProvider>
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="flex-start"
					height="100vh"
					width="600px"
				>
					<Dashboard />
				</Box>
			</ApiProvider>
		</ThemeProvider>
	)
}

export default App
