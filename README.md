# 📋 Ignite Tasks
I developed this project as a challenge of my latest studies on Node lessons at [Rocketseat](https://www.rocketseat.com.br).

## 🚀 Techs and Tools
- [Node.js v18](https://nodejs.org/)
- [CSV Parser](https://csv.js.org/)
- [HTTPie](https://httpie.io/)
- [Insomnia](https://insomnia.rest/)

## 💻 Project
This project was developed to practice the fundamentals of Node.js by creating a CRUD of tasks using a custom routing system and streams for import tasks from a CSV file and as a middleware to treat JSON between requests and respoinses. All tasks created and imported are stored into a JSON file.

## 🔗 Routes
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Ignite%20Node.js%3A%20Daily%20Diet%0A&uri=https://raw.githubusercontent.com/rcrdk/ignite-tasks-nodejs-api/main/insomnia.json)

```shell
npm i
npm run dev
npm run import
```

| Method      | Route               | Params/Body        |
| ----------- | ------------------- | -------------------|
| ``GET``     | /task/              | search             |
| ``POST``    | /task/              | title, description |
| ``PUT``     | /task/:id           | title, description |
| ``DELETE``  | /task/:id           | -                  |
| ``PATCH``   | /task/:id/complete  | -                  |
