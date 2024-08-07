import fs from 'node:fs/promises'
import { URL } from 'node:url'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
	#database = {}

	constructor() {
		fs.readFile(databasePath, 'utf-8')
			.then((data) => {
				this.#database = JSON.parse(data)
			})
			.catch(() => {
				this.#persist()
			})
	}

	#persist() {
		fs.writeFile(databasePath, JSON.stringify(this.#database))
	}

	select(table, search) {
		let data = this.#database[table] ?? []

		if (search) {
			data = data.filter((row) => {
				return Object.entries(search).some(([key, value]) => {
					return row[key].toLowerCase().includes(value.toLowerCase())
				})
			})
		}

		return data
	}

	insert(table, data) {
		if (Array.isArray(this.#database[table])) {
			this.#database[table].push(data)
		} else {
			this.#database[table] = [data]
		}

		this.#persist()

		return data
	}

	update(table, id, data) {
		const rowIndex = this.#database[table].findIndex((row) => row.id === id)
		const originalData = this.#database[table].find((row) => row.id === id)

		if (rowIndex > -1 && originalData) {
			this.#database[table][rowIndex] = {
				id,
				created_at: originalData.created_at,
				completed_at: originalData.completed_at,
				...data,
			}
			this.#persist()

			return originalData
		}
	}

	delete(table, id) {
		const rowIndex = this.#database[table].findIndex((row) => row.id === id)
		const originalData = this.#database[table].find((row) => row.id === id)

		if (rowIndex > -1 && originalData) {
			this.#database[table].splice(rowIndex, 1)
			this.#persist()

			return originalData
		}
	}

	complete(table, id) {
		const rowIndex = this.#database[table].findIndex((row) => row.id === id)
		const originalData = this.#database[table].find((row) => row.id === id)

		if (rowIndex > -1 && originalData) {
			const completedOrNot = originalData.completed_at
				? null
				: new Date().toISOString()

			this.#database[table][rowIndex].completed_at = completedOrNot
			this.#persist()

			return originalData
		}
	}
}
