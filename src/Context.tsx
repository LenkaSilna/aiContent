import React, {createContext, useState, ReactNode} from 'react'

interface IData {
	'title': string
}

interface IApiResponseTitle {
	titulek: string
	alternative_titles: Array<{[s: string]: string}>
}

interface CategoryData {
	hodnocení: number
	popis: string
}

interface IApiResponseMetrics {
	[category: string]: CategoryData
}

interface IApiContext {
	alternativeTitles: IApiResponseTitle | null
	sendTitle: (data: IData) => Promise<void>
	getMetrics: (data: IData) => Promise<void>
	metrics: IApiResponseMetrics | null
	setMetrics: React.Dispatch<React.SetStateAction<IApiResponseMetrics | null>>
}

export const ApiContext = createContext<IApiContext | null>(null)

interface ApiProviderProps {
	children: ReactNode
}

export const ApiProvider: React.FC<ApiProviderProps> = ({children}) => {
	const [alternativeTitles, setAlternativeTitles] =
		useState<IApiResponseTitle | null>(null)
	const [metrics, setMetrics] = useState<IApiResponseMetrics | null>(null)

	const sendTitle = async (data: IData): Promise<void> => {
		const url = import.meta.env.VITE_API_URL_TITLE || 'default'

		const requestData = {
			...data,
			model: 'gpt-4-1106-preview',
			temperature: 0.8,
		}

		try {
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestData),
			})
			const json = await res.json()
			setAlternativeTitles(json)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	const getMetrics = async (data: IData): Promise<void> => {
		const url = import.meta.env.VITE_API_URL_METRICS || 'default'

		const requestData = {
			...data,
			model: 'gpt-4-1106-preview',
			temperature: 0.00007,
		}

		try {
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestData),
			})
			const json = await res.json()
			console.log(json)
			setMetrics(json)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	return (
		<ApiContext.Provider
			value={{
				alternativeTitles,
				sendTitle,
				getMetrics,
				metrics,
				setMetrics,
			}}
		>
			{children}
		</ApiContext.Provider>
	)
}
