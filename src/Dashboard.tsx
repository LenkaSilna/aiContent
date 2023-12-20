import React, {useState, FormEvent} from 'react'
import {useApi} from './useApi'
import {
	CircularProgress,
	Divider,
	Box,
	Typography,
	TextField,
	Button,
	Grid,
} from '@mui/material'
import TitlesDisplay from './TitlesDisplay'
import MetricsDisplay from './MetricsDisplay'
import GraphsDisplay from './GraphsDisplay'

const Dashboard: React.FC = () => {
	const [text, setText] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [metricsLoading, setMetricsLoading] = useState<boolean>(false)
	const {alternativeTitles, sendTitle, getMetrics, metrics, setMetrics} =
		useApi()

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		setText('')
		setMetrics(null)
		setLoading(true)
		await sendTitle({title: text})
		setLoading(false)
		handleMetrics(event)
	}

	const handleMetrics = async (event: FormEvent) => {
		event.preventDefault()
		setMetricsLoading(true)
		await getMetrics({title: text})
		setMetricsLoading(false)
	}

	return (
		<Box>
			<form onSubmit={handleSubmit}>
				<Typography variant="h4" component="h2" gutterBottom>
					AI Content Analyze
				</Typography>
				<Grid container spacing={2} alignItems="center">
					<Grid item xs={12} sm={10}>
						<TextField
							fullWidth
							label="Zadejte text"
							variant="outlined"
							value={text}
							onChange={(e) => setText(e.target.value)}
							sx={{
								borderColor: 'white',
								'.MuiInputBase-input': {
									color: 'white',
								},
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={2}>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							size="medium"
							type="submit"
							disabled={!text.trim()}
						>
							Odeslat
						</Button>
					</Grid>
				</Grid>
			</form>
			{/* <Divider sx={{my: 2, borderColor: 'white'}} /> */}
			<Box sx={{my: 2}} />
			{loading ? (
				<CircularProgress sx={{my: 2}} />
			) : alternativeTitles ? (
				<TitlesDisplay alternativeTitles={alternativeTitles} />
			) : (
				<div>No Titles Available</div>
			)}
			<Box sx={{my: 2}} />
			<Divider sx={{my: 2, borderColor: 'white'}} />
			{metricsLoading ? (
				<CircularProgress />
			) : metrics ? (
				<>
					<GraphsDisplay data={metrics} />
					<Divider sx={{my: 2, borderColor: 'white'}} />
					<MetricsDisplay data={metrics} />
				</>
			) : (
				<div>No Metrics Available</div>
			)}
		</Box>
	)
}

export default Dashboard
