import { TypeActions } from "../constants";
import { getStore } from "../redux/store";
// import history from "../utils/history";
import getSocket from "./rootSocket";
// import history from "history/browser";

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
  // let hostId = payload.hostId;
  // let url = `/host/game/?id=${hostId}`;
  //   window.history.pushState({}, <GameHost />, url);
  //   window.location.href = url;
  //   browserHistory.push(url);
  // history.push(url);
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
  window.location.href = "/player/game/" + "?id=" + getSocket().id;
};

// Lắng nghe sự kiện nhận câu hỏi quiz
export const onResponseGameQuestions = (payload) => {};

// Lắng nghe và nhận game data đến host
export const onResponseGameHostQuestions = (payload) => {
  // document.getElementById('question').innerHTML = data.q1;
  // document.getElementById('answer1').innerHTML = data.a1;
  // document.getElementById('answer2').innerHTML = data.a2;
  // document.getElementById('answer3').innerHTML = data.a3;
  // document.getElementById('answer4').innerHTML = data.a4;
  // var correctAnswer = data.correct;
  // document.getElementById('playersAnswered').innerHTML = "Players Answered 0 / " + data.playersInGame;
  // updateTimer();
};

// Lắng nghe và nhận data từ host đến player
export const onResponseGamePlayerQuestions = (payload) => {};
