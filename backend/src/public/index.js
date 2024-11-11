import express from 'express'
import cors from 'cors'     
import UserRoutes from '../routes/user.routes.js'

const app = express()  

app.use(express.json())
app.use(cors())        

app.use('/api',UserRoutes)

const port = 8080
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})