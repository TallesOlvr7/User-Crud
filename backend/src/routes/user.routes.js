import { Router } from "express"
import userController from "../controller/user.controller.js"

const UserRoutes = Router()

UserRoutes.get('/usuarios', userController.index)
UserRoutes.get('/usuarios/:id', userController.show)
UserRoutes.post('/usuarios', userController.create)
UserRoutes.put('/usuarios/:id', userController.update)
UserRoutes.delete('/usuarios/:id', userController.delete)

export default UserRoutes
