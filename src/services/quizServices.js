import { AxiosMediaNetwork, AxiosNetwork } from "../api";
import { APIRouter } from "../configs";

const QuizServices = {
  createQuicklyQuiz: async () => {
    return await AxiosNetwork.post(APIRouter.quiz.createQuicklyQuiz);
  },
  list: async () => {
    return await AxiosNetwork.get(APIRouter.quiz.list);
  },
  get: async (quizId) => {
    return await AxiosNetwork.get(APIRouter.quiz.get.replace(":id", quizId));
  },
  update: async (quiz) => {
    return await AxiosNetwork.put(APIRouter.quiz.list, quiz);
  },
  delete: async (quizId) => {
    return await AxiosNetwork.delete(APIRouter.quiz.get.replace(":id", quizId));
  },
  upload: async (formData) => {
    return await AxiosMediaNetwork.post(APIRouter.quiz.upload, formData);
  },
  getPaginationByCreator: async (params) => {
    return await AxiosNetwork.post(
      APIRouter.quiz.getPaginationByCreator,
      params
    );
  },
  getPaginationByTopic: async (params) => {
    return await AxiosNetwork.post(APIRouter.quiz.getPaginationByTopic, params);
  },
  getPagination: async (params) => {
    return await AxiosNetwork.post(APIRouter.quiz.getPagination, params);
  },
};

export default QuizServices;
