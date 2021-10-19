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
authorsRouter.post("/", (req, res) => {
    console.log(req.body)

    const newAuthor = {...req.body, createdAt: new Date(), id: uniqid()}
    const authors = JSON.parse(fs.readFileSync(authorJSONPath))
    authors.push(newAuthor)
    fs.writeFileSync(authorJSONPath, JSON.stringify(authors))
    res.send(201).send({ id: newAuthor.id })
})


//2. Get
authorsRouter.get("/", (req, res) => {
    console.log(req.body)

    const fileContent = fs.readFileSync(authorJSONPath)
    console.log(JSON.parse(fileContent))

    const arrOfAuthors = JSON.parse(fileContent)
    res.send(arrOfAuthors)
})
// 3. Get with unique ID
authorsRouter.get("/:authorsId", (req, res) => {

    const authors = JSON.parse(fs.readFileSync(authorJSONPath))
    const author = authors.find(a => a.id === req.params.authorsId)
    res.status(200).send(author)

})
//4. Put
authorsRouter.put("/:authorsId", (req, res)=> {

    const authors = JSON.parse(fs.readFileSync(authorJSONPath))

    const index = authors.findIndex(authors => authors.id === req.params.authorsId)
    const updatedAuthor = { ...authors[index], ...req.body }
    authors[index] = updatedAuthor
    fs.writeFileSync(authorJSONPath, JSON.stringify(authors))
    res.send(updatedAuthor)


})

//5. Delete
authorsRouter.delete("/:authorsId", (req, res)=> {
    
})

export default authorsRouter