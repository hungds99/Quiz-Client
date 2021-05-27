import { NotiTypeEnum, TypeActions } from "../../constants";
import QuizServices from "../../services/quizServices";
import { UIActions } from "./uiActions";

export const QuizActions = {
  get: (quizId) => async (dispatch) => {
    try {
      dispatch({ type: TypeActions.SET_LOADING_PAGE });
      let response = await QuizServices.get(quizId);
      dispatch({
        type: TypeActions.SET_QUIZ,
        payload: response.data,
      });
      dispatch({ type: TypeActions.SET_LOADING_PAGE });
    } catch (error) {
      console.error(error);
    }
  },
  update: (quizParams) => async (dispatch) => {
    try {
      let response = await QuizServices.update(quizParams);
      dispatch({
        type: TypeActions.UPDATE_QUIZ,
        payload: response.data.result,
      });
      dispatch(
        UIActions.showNotification(
          NotiTypeEnum.success,
          "Updated quiz info successfully"
        )
      );
    } catch (error) {
      console.error(error);
    }
  },
  upload: (formData) => async (dispatch) => {
    try {
      let response = await QuizServices.upload(formData);
      dispatch({
        type: TypeActions.UPLOAD_QUIZ_THUMBNAIL,
        payload: response.data.result,
      });
      dispatch(
        UIActions.showNotification(NotiTypeEnum.info, "Added image thumbnail")
      );
    } catch (error) {
      console.error(error);
    }
  },
  getPaginationByCreator: (params) => async (dispatch) => {
    try {
      dispatch({ type: TypeActions.SET_LOADING_PAGE });
      let response = await QuizServices.getPaginationByCreator(params);
      dispatch({
        type: TypeActions.SET_QUIZES,
        payload: response.data.result,
      });
      dispatch({ type: TypeActions.SET_LOADING_PAGE });
    } catch (error) {
      console.error(error);
    }
  },
};
