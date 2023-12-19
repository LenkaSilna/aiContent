import React from 'react'
import {Card, CardContent, Typography, LinearProgress, Box} from '@mui/material'
import styled from 'styled-components'

const CustomLinearProgress = styled(LinearProgress)<{rating: number}>`
	& .MuiLinearProgress-bar {
		background-color: ${(props) =>
			props.rating >= 7
				? '#4caf50'
				: props.rating >= 4
					? '#9c27b0'
					: '#f44336'};
	}
`

const getRatingColor = (rating: number) => {
	return rating >= 7 ? '#4caf50' : rating >= 4 ? '#9c27b0' : '#f44336'
}

interface CategoryData {
	hodnocení: number
	popis: string
}

interface MatricsDisplayProps {
	data: {[category: string]: CategoryData}
}

function CustomCard({title, popis, hodnocení}: CategoryData & {title: string}) {
	const ratingColor = getRatingColor(hodnocení)
	return (
		<Card variant="outlined" style={{marginBottom: 16}}>
			<CardContent>
				<Typography variant="h5" component="h2">
					{title}
				</Typography>
				<Typography color="textSecondary">{popis}</Typography>
				<Box
					display="flex"
					alignItems="baseline"
					style={{marginTop: 8}}
				>
					<CustomLinearProgress
						variant="determinate"
						value={hodnocení * 10}
						rating={hodnocení}
						style={{flexGrow: 1, marginRight: 8}}
					/>
					<Typography style={{marginTop: 8, color: ratingColor}}>
						{hodnocení}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	)
}

const MatricsDisplay: React.FC<MatricsDisplayProps> = ({data}) => {
	const filteredData = {...data}
	delete filteredData['titulek']
	return (
		<div>
			{Object.entries(filteredData).map(
				([title, {hodnocení, popis}], index) => (
					<CustomCard
						key={index}
						title={title}
						popis={popis}
						hodnocení={hodnocení}
					/>
				)
			)}
		</div>
	)
}

export default MatricsDisplay
