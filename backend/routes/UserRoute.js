import express from "express";
import { 
    deleteUser,
    getUsers, 
    getUsersById,
    saveUser, 
    updateUser
} from "../controllers/UserController.js";
const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users', saveUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;