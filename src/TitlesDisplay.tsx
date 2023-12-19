import React from 'react'
import {
	Card,
	CardContent,
	CardHeader,
	Typography,
	List,
	ListItem,
	ListItemText,
} from '@mui/material'

interface TitlesDisplayProps {
	alternativeTitles: {
		titulek: string
		alternative_titles: Array<{[s: string]: string}>
	}
}

const TitlesDisplay: React.FC<TitlesDisplayProps> = ({alternativeTitles}) => {
	return (
		<Card
			variant="outlined"
			style={{marginTop: '20px', backgroundColor: '#121212'}}
		>
			<CardHeader
				title={alternativeTitles && alternativeTitles.titulek}
			/>
			<CardContent>
				<Typography variant="h5" gutterBottom sx={{color: '#4caf50'}}>
					Alternativní Titulky:
				</Typography>
				<List>
					{alternativeTitles &&
						alternativeTitles.alternative_titles.map(
							(
								altTitle: {[s: string]: string},
								index: React.Key | null | undefined
							) => (
								<ListItem key={index}>
									<ListItemText
										primary={Object.values(altTitle)[0]}
									/>
								</ListItem>
							)
						)}
				</List>
			</CardContent>
		</Card>
	)
}

export default TitlesDisplay
