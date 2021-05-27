import { NotiTypeEnum, TypeActions } from "../../constants";
import QuestionServices from "../../services/questionServices";
import { UIActions } from "./uiActions";

export const QuestionActions = {
  create: (questionParams) => async (dispatch) => {
    try {
      dispatch({ type: TypeActions.SET_LOADING_PAGE });
      let response = await QuestionServices.create(questionParams);
      dispatch({
        type: TypeActions.SET_QUESTION,
        payload: {},
      });
      dispatch({
        type: TypeActions.UPDATE_QUESTIONS,
        payload: response.data,
      });
      dispatch({ type: TypeActions.SET_LOADING_PAGE });
      dispatch(
        UIActions.showNotification(
          NotiTypeEnum.success,
          "Created question sucessfully"
        )
      );
    } catch (error) {
      console.error(error);
    }
  },
  update: (questionId, questionParams) => async (dispatch) => {
    try {
      dispatch({ type: TypeActions.SET_LOADING_PAGE });
      let response = await QuestionServices.update(questionId, questionParams);
      dispatch({
        type: TypeActions.UPDATE_QUESTIONS,
        payload: response.data,
      });
      dispatch({ type: TypeActions.SET_LOADING_PAGE });
      dispatch(
        UIActions.showNotification(
          NotiTypeEnum.success,
          "Updated question sucessfully"
        )
      );
    } catch (error) {
      console.error(error);
    }
  },
  delete: (questionId) => async (dispatch) => {
    try {
      dispatch({ type: TypeActions.SET_LOADING_PAGE });
      let response = await QuestionServices.delete(questionId);
      dispatch({
        type: TypeActions.REMOVE_QUESTIONS,
        payload: response.data,
      });
      dispatch({
        type: TypeActions.SET_QUESTION,
        payload: {},
      });
      dispatch({ type: TypeActions.SET_LOADING_PAGE });
      dispatch(
        UIActions.showNotification(
          NotiTypeEnum.success,
          "Deleted question sucessfully"
        )
      );
    } catch (error) {
      console.error(error);
    }
  },
};
