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

const DoughnutChart: React.FC<{ data: any[]; labelType: 'percent' | 'count' }> = ({ data, labelType }) => {
    return (
        <PieChart width={300} height={300} style={{ pointerEvents: 'none' }}>
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
                label={(props) => customizedLabel({ ...props, data, labelType })}
                labelLine={false}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
            </Pie>
        </PieChart>
    );
};


const customizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	index,
    percent,
	data,
    labelType,
}: {
	cx: number
	cy: number
	midAngle: number
	innerRadius: number
	outerRadius: number
	percent: number
	index: number
	data: any[]
    labelType: 'percent' | 'count'
}) => {
    if (labelType === 'percent' && data[index].name === 'Zbývající') {
        return null;
    }

    const radius = innerRadius + (outerRadius - innerRadius) * 1.6
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180)
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180)
    const color = data[index].color

    let labelContent;
    if (labelType === 'percent') {
        labelContent = `${(percent * 100).toFixed(0)}%`;
    } else {
        labelContent = `${data[index].value}`;
    }

	return (
		<text
			key={index}
			x={x}
			y={y}
			fill={color}
			textAnchor={x > cx ? 'start' : 'end'}
			dominantBaseline="central"
            style={{ fontWeight: 'bold' }}
		>
			{labelContent}
		</text>
	)
}

const GraphsDisplay: React.FC<GraphsDisplayProps> = ({data}) => {
	const ratings = Object.values(data)
		.map((category) => category.hodnocení)
		.filter((h) => !isNaN(h) && h != null)

	const total = ratings.reduce((a, b) => a + b, 0)
	const remainingRate = 110 - total

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
			opacity: 0.3,
			stroke: '#7f7f7f',
		},
	]

    const categoryCounts: { [key: string]: number } = {
        'Vysoké Hodnocení': 0,
        'Střední Hodnocení': 0,
        'Nízké Hodnocení': 0,
      };

      ratings.forEach((r) => {
        if (r >= 7) categoryCounts['Vysoké Hodnocení'] += 1;
        else if (r >= 4) categoryCounts['Střední Hodnocení'] += 1;
        else categoryCounts['Nízké Hodnocení'] += 1;
      });
    
      Object.keys(categoryCounts).forEach((key) => {
        if (categoryCounts[key] > 11) {
          categoryCounts[key] = 11;
        }
      });
    
      const categoryData = Object.keys(categoryCounts).map((key) => ({
        name: categoryCounts[key],
        value: categoryCounts[key],
        color: key === 'Vysoké Hodnocení' ? '#4caf50' : key === 'Střední Hodnocení' ? '#9c27b0' : '#f44336',
        stroke: key === 'Vysoké Hodnocení' ? '#4caf50' : key === 'Střední Hodnocení' ? '#9c27b0' : '#f44336',
      }));

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
						<DoughnutChart labelType='percent' data={overallData} />
                        <Typography>
                            {`${total} Bodů`}
						</Typography>
					</Box>
					<Box>
						<Typography>
							Rozložení hodnocení
						</Typography>
						<DoughnutChart labelType='count' data={categoryData} />
					</Box>
				</Box>
			</CardContent>
		</Card>
	)
}

export default GraphsDisplay
