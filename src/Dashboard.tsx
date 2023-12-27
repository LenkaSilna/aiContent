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
	Slider,
	IconButton,
	InputAdornment,
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import TitlesDisplay from './TitlesDisplay'
import MetricsDisplay from './MetricsDisplay'
import GraphsDisplay from './GraphsDisplay'

const Dashboard: React.FC = () => {
	const [text, setText] = useState<string>('')
	const [additionalTexts, setAdditionalTexts] = useState<string[]>([])
	const [temperature, setTemperature] = useState<number>(0.8)
	const [loading, setLoading] = useState<boolean>(false)
	const [metricsLoading, setMetricsLoading] = useState<boolean>(false)
	const {alternativeTitles, sendTitle, getMetrics, metrics, setMetrics} =
		useApi()

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		setText('')
		setAdditionalTexts([])
		setMetrics(null)
		setLoading(true)
		setMetricsLoading(true)
		await sendTitle({title: text, temperature: temperature})
		setLoading(false)
		await getMetrics({title: text})
		setMetricsLoading(false)
		setTemperature(0.8)
	}

	const addAdditionalTextField = () => {
		if (additionalTexts.length === 0) {
			setAdditionalTexts([''])
		}
	}

	const handleChange = (event: Event, newValue: number | number[]) => {
		event.preventDefault()
		setTemperature(newValue as number)
	}

	const handleAdditionalTextChange = (index: number, newText: string) => {
		const updatedTexts = additionalTexts.map((text, i) =>
			i === index ? newText : text
		)
		setAdditionalTexts(updatedTexts)
	}

	const handleRemoveText = (index: number) => {
		const updatedTexts = additionalTexts.filter((_, i) => i !== index)
		setAdditionalTexts(updatedTexts)
	}

	console.log(additionalTexts)

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
							label="Insert text"
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
							Send
						</Button>
					</Grid>
				</Grid>
				<Box sx={{my: 2}}>
				{additionalTexts.map((additionalText, index) => (
					<Grid container spacing={2} alignItems="center" key={index}>
						<Grid item xs>
							<TextField
								fullWidth
								label={`Additional text`}
								variant="outlined"
								value={additionalText}
								onChange={(e) =>
									handleAdditionalTextChange(
										index,
										e.target.value
									)
								}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={() =>
													handleRemoveText(index)
												}
											>
												<RemoveCircleOutlineIcon />
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						{additionalTexts.length === 0 && (
							<Grid container spacing={2} alignItems="center">
								<Grid item>
									<IconButton
										onClick={addAdditionalTextField}
									>
										<AddCircleOutlineIcon />
									</IconButton>
								</Grid>
							</Grid>
						)}
					</Grid>
				))}
				{additionalTexts.length === 0 && (
						<Grid container spacing={2} alignItems="center">
							<Grid item>
								<IconButton onClick={addAdditionalTextField}>
									<AddCircleOutlineIcon />
								</IconButton>
							</Grid>
						</Grid>
				)}
				</Box>
				<Box sx={{my: 2}}>
					<div>Setting the creativity level</div>
					<Slider
						value={temperature}
						onChange={handleChange}
						min={0.0001}
						max={0.9}
						step={0.0001}
						defaultValue={0.8}
						color="info"
						aria-labelledby="vertical-slider"
						valueLabelDisplay="auto"
						marks={[
							{
								value: 0.0001,
								label: 'Low',
							},
							{
								value: 0.9,
								label: 'High',
							},
						]}
					/>
				</Box>
			</form>
			<Divider sx={{my: 2, borderColor: 'white'}} />
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
