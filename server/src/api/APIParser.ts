
class APIParser {
	private _apiversion: string = 'test'
	private _apilabels: Array<string> = []

	constructor() {
		console.log('APIParser')
	}

	genLabels(apiversion: string): string[] {
		console.log('genLabels(apiversion)', apiversion)
		return []
	}
}

export default APIParser