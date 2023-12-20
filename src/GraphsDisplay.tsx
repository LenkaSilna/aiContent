import React from 'react'
import {PieChart, Pie, Cell} from 'recharts'
import {Box, Card, CardContent, Typography} from '@mui/material'

interface CategoryData {
	hodnocení: number
	popis: string
}

interface GraphsDisplayProps {
	data: {[category: string]: CategoryData}
}

const DoughnutChart: React.FC<{data: any[]}> = ({data}) => (
	<PieChart width={300} height={300} style={{pointerEvents: 'none'}}>
		<Pie
			dataKey="value"
			startAngle={90}
			endAngle={-270}
			data={data}
			cx={150}
			cy={150}
			innerRadius={45}
			outerRadius={70}
			fill="#8884d8"
			paddingAngle={5}
			label={(props) => customizedLabel({...props, data})}
		>
			{data.map((entry, index) => (
				<Cell key={`cell-${index}`} fill={entry.color} />
			))}
		</Pie>
	</PieChart>
)

const customizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index,
	data,
}: {
	cx: number
	cy: number
	midAngle: number
	innerRadius: number
	outerRadius: number
	percent: number
	index: number
	data: any[]
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 2.1
	const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180)
	const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180)
	const color = data[index].color

	return (
		<text
			key={index}
			x={x}
			y={y}
			fill={color}
			textAnchor={x > cx ? 'start' : 'end'}
			dominantBaseline="central"
		>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	)
}

const GraphsDisplay: React.FC<GraphsDisplayProps> = ({data}) => {
	const ratings = Object.values(data)
		.map((category) => category.hodnocení)
		.filter((h) => !isNaN(h) && h != null)

	const total = ratings.reduce((a, b) => a + b, 0)
	const remainingRate = 100 - total

	const overallData = [
		{
			name: 'Celková Úspěšnost',
			value: total,
			color: '#8884d8',
			stroke: '#8884d8',
		},
		{
			name: 'Zbývající',
			value: remainingRate,
			color: '#7f7f7f',
			opacity: 0.5,
			stroke: '#7f7f7f',
		},
	]

	const totalRatings = ratings.length
	const totalMaxScore = totalRatings * 10

	const highScore = ratings
		.filter((r) => r >= 7)
		.reduce((acc, r) => acc + r, 0)
	const mediumScore = ratings
		.filter((r) => r >= 4 && r < 7)
		.reduce((acc, r) => acc + r, 0)
	const lowScore = ratings.filter((r) => r < 4).reduce((acc, r) => acc + r, 0)
	const totalScore = highScore + mediumScore + lowScore

	const highPercent = (highScore / totalMaxScore) * 100
	const mediumPercent = (mediumScore / totalMaxScore) * 100
	const lowPercent = (lowScore / totalMaxScore) * 100
	const remainingPercent = 100 - totalScore

	const categoryData = [
		{
			name: 'Vysoké Hodnocení',
			value: highPercent,
			color: '#4caf50',
			stroke: '#4caf50',
		},
		{
			name: 'Střední Hodnocení',
			value: mediumPercent,
			color: '#9c27b0',
			stroke: '#9c27b0',
		},
		{
			name: 'Nízké Hodnocení',
			value: lowPercent,
			color: '#f44336',
			stroke: '#f44336',
		},
		{
			name: 'Zbývající',
			value: remainingPercent,
			color: '#7f7f7f',
			opacity: 0.5,
			stroke: '#7f7f7f',
		},
	]

	return (
		<Card
			variant="outlined"
			style={{marginTop: '20px', backgroundColor: '#121212'}}
		>
			<CardContent>
				<Typography variant="h5" component="h2" mb={2}>
					Přehled Hodnocení
				</Typography>
				<Box
					style={{
						display: 'flex',
						justifyContent: 'space-around',
					}}
				>
					<Box>
						<Typography>
							Celkové hodnocení titulku
						</Typography>
						<DoughnutChart data={overallData} />
					</Box>
					<Box>
						<Typography>
							Rozložení hodnocení
						</Typography>
						<DoughnutChart data={categoryData} />
					</Box>
				</Box>
			</CardContent>
		</Card>
	)
}

export default GraphsDisplay
