import express from 'express'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from "path"
import uniqid from "uniqid"

const authorsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)
const parentFolder = dirname(currentFilePath)
const authorJSONPath = join(parentFolder, "authors.json")
console.log(parentFolder)


// 1. Post
authorsRouter.post("/authors", (req, res) => {
    console.log(req.body)

    const newAuthor = {...req.body, createdAt: new Date(), id: uniqid()}
    const authors = JSON.parse(fs.readFileSync(authorJSONPath))
    authors.push(newAuthor)
    fs.writeFileSync(authorJSONPath, JSON.stringify(authors))
    res.send(201).send({ id: newAuthor.id })
})


//2. Get
authorsRouter.get("/authors", (req, res) => {
    console.log(req.body)

    const fileContent = fs.readFileSync(authorJSONPath)
    console.log(JSON.parse(fileContent))

    const arrOfAuthors = JSON.parse(fileContent)
    res.send(arrOfAuthors)
})
// 3. Get
authorsRouter.get("/")
//4. Put
authorsRouter.put("/")
//5. Delete
authorsRouter.delete("/")

export default authorsRouter