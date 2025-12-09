import {
  getUserByNIC,
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../services/user.service.js';

export const findUsersAsync = async ctx => {
  try {
    const users = await getAllUsers();
    ctx.status = 200;
    ctx.body = users;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Internal Server Error' };
    return;
  }
};

export const findUserByIdAsync = async ctx => {
  const userId = ctx.params.id;
  try {
    const user = await getUserById(userId);
    if (!user) {
      ctx.status = 404;
      ctx.body = { message: 'User Not Found' };
      return;
    }
    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Internal Server Error' };
    return;
  }
};

export const createUserAsync = async ctx => {
  const userData = ctx.request.body;
  try {
    const user = await getUserByNIC(userData.nationalIdentityCardNumber);
    if (user) {
      ctx.status = 409;
      ctx.body = { message: 'User with this NIC already exists' };
      return;
    }

    const newUser = await createUser(userData);
    ctx.status = 201;
    ctx.body = { message: 'User Created Successfully', user: newUser };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: 'Internal Server Error' };
    return;
  }
};

export const updateUserAsync = async ctx => {
  const userId = ctx.params.id;
  const updateData = ctx.request.body;
  try {
    const updatedUser = await updateUser(userId, updateData);
    if (!updatedUser) {
      ctx.status = 404;
      ctx.body = { message: 'User Not Found' };
      return;
    }
    ctx.status = 200;
    ctx.body = { message: 'User Updated Successfully', user: updatedUser };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Internal Server Error' };
    return;
  }
};

export const changeUserActiveAsync = async ctx => {
  const userId = ctx.params.id;
  const { isActive } = ctx.request.body;
  try {
    const updatedUser = await updateUser(userId, { isActive });
    if (!updatedUser) {
      ctx.status = 404;
      ctx.body = { message: 'User Not Found' };
      return;
    }
    ctx.status = 200;
    ctx.body = { message: 'User Deactivated Successfully', user: updatedUser };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Internal Server Error' };
    return;
  }
};

export const deleteUserAsync = async ctx => {
  const userId = ctx.params.id;
  try {
    const deletedUser = await deleteUser(userId);
    if (!deletedUser) {
      ctx.status = 404;
      ctx.body = { message: 'User Not Found' };
      return;
    }
    ctx.status = 200;
    ctx.body = { message: 'User Deleted Successfully' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Internal Server Error' };
    return;
  }
};
