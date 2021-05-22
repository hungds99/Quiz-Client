import { AxiosNetwork } from "../api";
import { APIRouter } from "../configs";

const QuestionServices = {
  create: async (questionParams) => {
    return await AxiosNetwork.post(APIRouter.question.create, questionParams);
  },
  update: async (questionId, questionParams) => {
    return await AxiosNetwork.put(
      APIRouter.question.update.replace(":id", questionId),
      questionParams
    );
  },
  delete: async (questionId) => {
    return await AxiosNetwork.delete(
      APIRouter.question.update.replace(":id", questionId)
    );
  },
};
export default QuestionServices;
