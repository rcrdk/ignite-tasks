import fs from 'node:fs'

import { parse } from 'csv-parse'

const csvPath = new URL('./tasks.csv', import.meta.url)

const stream = fs.createReadStream(csvPath)

const csvParse = parse({
	delimiter: '|',
	skipEmptyLines: true,
	fromLine: 2,
})

async function importCSV() {
	let countLines = 0
	const linesParse = stream.pipe(csvParse)

	for await (const line of linesParse) {
		const [title, description] = line

		console.log(`- \x1b[34m${title}:\x1b[0m ${description}`)
		++countLines

		await fetch(`http://localhost:3333/tasks`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title,
				description,
			}),
		})
	}

	console.log('')
	console.log(`\x1b[32m ${countLines} tasks added. \x1b[0m`)
	console.log('')
}

importCSV()
