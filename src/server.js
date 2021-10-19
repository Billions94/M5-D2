import express from 'express';
import listEndpoints from 'express-list-endpoints'
import authorsRouter from './apis/authors/index.js'


const server = express();
const port = 3001
console.table(listEndpoints(server))

server.use(express.json())
server.use("/", authorsRouter)


server.listen(port, ()=> {
    console.log('listening on port', port);
})


console.log('why is this happening to me')