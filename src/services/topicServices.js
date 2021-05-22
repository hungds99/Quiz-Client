import { AxiosNetwork } from "../api";
import { APIRouter } from "../configs";

const TopicServices = {
  create: async (topicParams) => {
    return await AxiosNetwork.post(APIRouter.topic.create, topicParams);
  },
  getAll: async () => {
    return await AxiosNetwork.get(APIRouter.topic.getAll);
  },
  delete: async (id) => {
    return await AxiosNetwork.delete(APIRouter.topic.delete.replace(":id", id));
  },
  getRecommendTopic: async () => {
    return await AxiosNetwork.get(APIRouter.topic.getRecommend);
  },
};
export default TopicServices;
