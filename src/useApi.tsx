import {useContext} from 'react'
import {ApiContext} from './Context' // Předpokládá se, že ApiContext je exportován z ApiContext.tsx

export const useApi = () => {
	const context = useContext(ApiContext)
	if (!context) {
		throw new Error('useApi must be used within a ApiProvider')
	}
	return context
}
