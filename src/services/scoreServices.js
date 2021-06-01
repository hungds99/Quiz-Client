import { AxiosNetwork } from "../api";
import { APIRouter } from "../configs";

const ScoreServices = {
  create: async (params) => {
    return await AxiosNetwork.post(APIRouter.score.create, params);
  },
  getPlayerTotalScore: async (params) => {
    return await AxiosNetwork.post(APIRouter.score.getTotal, params);
  },
  getPlayerAnswerResult: async (params) => {
    return await AxiosNetwork.post(
      APIRouter.score.getPlayerAnswserResult,
      params
    );
  },
  getPlayersHostResult: async (params) => {
    return await AxiosNetwork.get(
      APIRouter.score.getPlayersHostResult.replace(":hostId", params)
    );
  },
  getHistory: async (params) => {
    return await AxiosNetwork.post(APIRouter.score.getHistory);
  },
};

export default ScoreServices;
