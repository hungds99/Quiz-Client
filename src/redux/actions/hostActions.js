import { TypeActions } from "../../constants";
import HostServices from "../../services/hostServices";

export const HostActions = {
  get: (hostId) => async (dispatch) => {
    try {
      let { data } = await HostServices.get(hostId);
      dispatch({
        type: TypeActions.SET_HOST,
        payload: data.result,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
