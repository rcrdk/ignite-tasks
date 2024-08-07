import { randomUUID } from 'node:crypto'

import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
	{
		method: 'GET',
		path: buildRoutePath('/tasks'),
		handler: (req, res) => {
			const { search } = req.query

			const tasks = database.select(
				'tasks',
				search
					? {
							title: search,
							description: search,
						}
					: null,
				null,
			)

			return res.end(JSON.stringify(tasks))
		},
	},
	{
		method: 'POST',
		path: buildRoutePath('/tasks'),
		handler: (req, res) => {
			const { title, description } = req.body

			if (!req.body || !title || !description) {
				return res.writeHead(422, 'Invalid task content.').end()
			}

			const task = {
				id: randomUUID(),
				title,
				description,
				completed_at: null,
				created_at: new Date().toISOString(),
				updated_at: null,
			}

			database.insert('tasks', task)

			return res.writeHead(201).end()
		},
	},
	{
		method: 'PUT',
		path: buildRoutePath('/tasks/:id'),
		handler: (req, res) => {
			const { id } = req.params
			const { title, description } = req.body

			if (!req.body || !title || !description) {
				return res.writeHead(422, 'Invalid task content.').end()
			}

			const action = database.update('tasks', id, {
				title,
				description,
				updated_at: new Date().toISOString(),
			})

			return action
				? res.writeHead(204).end()
				: res.writeHead(404, 'Task not found.').end()
		},
	},
	{
		method: 'DELETE',
		path: buildRoutePath('/tasks/:id'),
		handler: (req, res) => {
			const { id } = req.params

			const action = database.delete('tasks', id)

			return action
				? res.writeHead(204).end()
				: res.writeHead(404, 'Task not found.').end()
		},
	},
	{
		method: 'PATCH',
		path: buildRoutePath('/tasks/:id/complete'),
		handler: (req, res) => {
			const { id } = req.params

			const action = database.complete('tasks', id)

			return action
				? res.writeHead(204).end()
				: res.writeHead(404, 'Task not found.').end()
		},
	},
]
