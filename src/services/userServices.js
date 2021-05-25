import { AxiosMediaNetwork, AxiosNetwork } from "../api";
import { APIRouter } from "../configs";

const UserServices = {
  login: async ({ email, password }) => {
    return await AxiosNetwork.post(APIRouter.user.login, {
      email,
      password,
    });
  },
  register: async ({ username, email, password }) => {
    return await AxiosNetwork.post(APIRouter.user.register, {
      username,
      email,
      password,
    });
  },
  get: async (userId) => {
    return await AxiosNetwork.get(APIRouter.user.get.replace(":id", userId));
  },
  uploadAvatar: async (formData) => {
    return await AxiosMediaNetwork.post(APIRouter.user.uploadAvatar, formData);
  },
  update: async (id, data) => {
    return await AxiosNetwork.put(
      APIRouter.user.update.replace(":id", id),
      data
    );
  },
  changePassword: async (id, data) => {
    return await AxiosNetwork.post(
      APIRouter.user.changePassword.replace(":id", id),
      data
    );
  },
};

export default UserServices;
