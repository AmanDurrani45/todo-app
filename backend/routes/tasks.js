import { Router } from 'express';
const router = Router()
import { getTasks, createTask, modifyTask, removeTask } from '../controllers/tasksController.js'


router.get('/', getTasks).post('/', createTask);
router.put('/:id', modifyTask).delete('/:id', removeTask)

export default router;