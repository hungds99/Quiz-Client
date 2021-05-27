import { TypeActions } from "../constants";
import { getStore } from "../redux/store";
import getSocket from "./rootSocket";

// Emit sự kiện để lấy Pin Code
export const emitGetQuizPinCode = (payload) => {
  getSocket().emit("host-join", payload);
};

// Lắng nghe sự kiện nhận pin code quiz từ server
export const onResponseGamePin = (payload) => {
  let { pin } = payload;
  getStore().dispatch({
    type: TypeActions.SET_GAME_PIN,
    payload: pin,
  });
};

// Emit sự kiện plays join vào host với pin
export const emitPlayerJoinHost = (payload) => {
  getSocket().emit("player-join", payload);
};

// Lắng nghe sự kiện Player tham gia vào host
export const onResponsePlayerJoin = (payload) => {
  getStore().dispatch({
    type: TypeActions.SET_PLAYER_JOIN,
    payload: payload,
  });
};

// Emit sự kiện start quiz game
export const emitStartGameQuiz = (payload) => {
  getSocket().emit("start-game");
};

// Lắng nghe sự kiện bắt đầu game từ server
export const onResponseGameStarted = (payload) => {
  getStore().dispatch({
    type: TypeActions.SET_QUIZ_HOST,
    payload: payload,
  });
};

// Emit sự kiện host khởi tạo và tham gia thành công game server
export const emitHostJoinGame = (payload) => {
  getSocket().emit("host-join-game", payload);
};

// Lắng nghe sự kiện game bắt đầu từ host
export const onResponseGameStartedPlayer = (payload) => {
  window.location.href = `/player/game/?id=${getSocket().id}`;
};

// Lắng nghe sự kiện nhận câu hỏi quiz
export const onResponseGameQuestions = (payload) => {};

// Lắng nghe và nhận game data đến host
export const onResponseGameHostQuestions = (payload) => {};

// Lắng nghe và nhận data từ host đến player
export const onResponseGamePlayerQuestions = (payload) => {};
