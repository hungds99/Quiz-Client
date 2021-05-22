import { AxiosNetwork } from "../api";
import { APIRouter } from "../configs";

const HostServices = {
  create: async (quizId) => {
    return await AxiosNetwork.post(APIRouter.host.create, {
      quiz: quizId,
    });
  },
  createSinglePlay: async (quizId) => {
    return await AxiosNetwork.post(APIRouter.host.createSinglePlay, {
      quiz: quizId,
    });
  },
  get: async (hostId) => {
    const response = await AxiosNetwork.get(
      APIRouter.host.get.replace(":id", hostId)
    );
    return response;
  },
  getByPin: async (pin) => {
    const response = await AxiosNetwork.get(
      APIRouter.host.getByPin.replace(":pin", pin)
    );
    return response;
  },
  updateLiveStatus: async (hostId, isLive) => {
    const response = await AxiosNetwork.put(APIRouter.host.updateLiveStatus, {
      hostId: hostId,
      isLive: isLive,
    });
    return response;
  },
  updateCurrentQuestion: async (hostId, nextQuestion) => {
    return await AxiosNetwork.put(APIRouter.host.updateCurrentQuestion, {
      hostId: hostId,
      nextQuestion: nextQuestion,
    });
  },
  getOwner: async () => {
    return await AxiosNetwork.get(APIRouter.host.getOwner);
  },
};

export default HostServices;
