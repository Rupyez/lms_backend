import express, {json} from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import apiRouter from './routes/index.js'

//import of files
import { apiVersion, port } from './config/config.js';
import { connectDb } from './connectdb/db.js';
import { config } from 'dotenv';


const app = express();

// cors setup
app.use(cors({
    origin:'*',
   methods: 'GET, POST, PUT, PATCH, DELETE',
    credentials: true
}))

//body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(json());

connectDb()
config()

app.use(`${apiVersion}`, apiRouter)

// testing the routes
app.get("/", (req, res) => {
    res.send("Hello from the LMS backend")
})


//server setup
app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`)
})


