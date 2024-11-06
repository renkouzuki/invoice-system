import { Router } from "express";
import AuthController from "../controllers/Authentication.js";
import authenticateUser from "../middlewares/AuthMiddleware.js";

const AuthRoute = Router();

AuthRoute.post("/test" , AuthController.testing.bind(AuthController));
AuthRoute.post('/login' , AuthController.login.bind(AuthController));
AuthRoute.post('/register' , AuthController.register.bind(AuthController));
AuthRoute.get('/user' ,authenticateUser, AuthController.user.bind(AuthController))
AuthRoute.post('/logout' ,authenticateUser, AuthController.logout.bind(AuthController))

export default AuthRoute;