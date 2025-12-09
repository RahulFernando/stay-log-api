import Router from '@koa/router';
import {
  findUserByIdAsync,
  findUsersAsync,
  createUserAsync,
  updateUserAsync,
  changeUserActiveAsync,
  deleteUserAsync,
} from '../controllers/user.controller.js';

const router = new Router({
  prefix: '/api/users',
});

router.get('/', findUsersAsync);
router.get('/:id', findUserByIdAsync);
router.post('/', createUserAsync);
router.put('/:id', updateUserAsync);
router.patch('/:id', changeUserActiveAsync);
router.delete('/:id', deleteUserAsync);

export default router;
