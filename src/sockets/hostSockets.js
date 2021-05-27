import { TypeActions } from "../constants";
import { getStore } from "../redux/store";
import getSocket from "./rootSocket";

// Emit sự kiện host tạo room
export const emitHostCreateRoom = (payload) => {
  getSocket().emit("host-create-room", payload);
};

// Emit sự kiện player tham gia host room
export const emitPlayerJoinRoom = (payload) => {
  getSocket().emit("player-join-room", payload);
};

// Lắng nghe sự kiện user tham gia vào room
export const onResponsePlayerJoinRoom = (payload) => {
  console.log("Set Player Join :", payload);
  getStore().dispatch({
    type: TypeActions.SET_PLAYER_JOIN,
    payload: payload,
  });
};

// Emit sự kiện host bắt đầu game
export const emitHostStartGame = (payload) => {
  getSocket().emit("host-start-game", payload);
};

// Emit sự kiện host join game và hiển thị câu hỏi
export const emitHostJoinGame = (payload) => {
  getSocket().emit("host-join-game-room", payload);
};

// Emit sự kiện player join game
export const emitPlayerJoinGame = (payload) => {
  getSocket().emit("player-join-game-room", payload);
};

// Host bắt đầu game và chuyển câu hỏi đến toàn bộ player
export const onResponseRoomQuestion = (question, isLastQuestion) => {
  getStore().dispatch({
    type: TypeActions.SET_HOST_QUESTION,
    payload: { ...question, isLastQuestion: isLastQuestion },
  });
};

// Hiển thị toàn bộ câu hỏi cho host
export const onResponseShowAllQuestion = (payload) => {
  getStore().dispatch({
    type: TypeActions.SET_HOST_QUESTIONS,
    payload: payload,
  });
};

// Hiển thị chi tiết toàn host
export const onResponseShowAllHostDetail = (payload) => {
  getStore().dispatch({
    type: TypeActions.SET_HOST_DETAIL,
    payload: payload,
  });
};

// Lắng nghe sự kiện bắt đầu game
export const onResponseGameStartCounter = (payload) => {
  getStore().dispatch({
    type: TypeActions.SET_GAME_START_COUNTER,
    payload: payload,
  });
};

// Đếm thời gian
export const onResponseQuestionCounter = (payload) => {
  getStore().dispatch({
    type: TypeActions.SET_QUESTION_COUNTER,
    payload: payload,
  });
};

// Player submit câu trả lời
export const emitPlayerAnswerQuestion = (payload) => {
  getSocket().emit("player-answer-question", payload);
};

// Time up
export const onResponseQuestionTimeUp = (payload) => {
  if (payload) {
    getSocket().emit("player-get-score-question", payload);
  }
};

// Host next question
export const emitHostNextQuestion = (payload) => {
  getSocket().emit("next-question", payload);
};

// Lắng nghe sự kiện thoát khỏi phòng
export const onResponsePlayerLeaveRoom = (payload) => {
  getStore().dispatch({
    type: TypeActions.SET_PLAYER_JOIN,
    payload: payload,
  });
};

// Lắng nghe sự kiện hiển thị điểm số
export const onResponsePlayerScore = (payload) => {
  getStore().dispatch({
    type: TypeActions.SET_SCORE_PLAYER_QUESTION,
    payload: payload,
  });
};

// Hiển thị điểm của người chơi
export const onResponseAllPlayerScore = (payload) => {
  getStore().dispatch({
    type: TypeActions.SET_PLAYERS_TOTAL_SCORE,
    payload: payload,
  });
};

// Emit sự kiện để show bảng xếp hạng
export const emitShowPlayersRanked = (payload) => {
  getSocket().emit("show-player-ranked", payload);
};
