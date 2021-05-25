import io from "socket.io-client";
import { getToken } from "../auth/authChecker";
import {
  onResponseAllPlayerScore,
  onResponseGameStartCounter,
  onResponsePlayerJoinRoom,
  onResponsePlayerLeaveRoom,
  onResponsePlayerScore,
  onResponseQuestionCounter,
  onResponseQuestionTimeUp,
  onResponseRoomQuestion,
  onResponseShowAllHostDetail,
  onResponseShowAllQuestion,
} from "./hostSockets";
import {
  onResponseGamePin,
  onResponseGameQuestions,
  onResponseGameStarted,
  onResponseGameStartedPlayer,
  onResponsePlayerJoin,
} from "./quizSockets";

const endpoint = process.env.REACT_APP_SOCKET_ENDPOINT;

const token = getToken();

let socket = null;

const onConnect = () => {
  console.log("Socket connected !");
};

const onDisconnect = () => {
  console.log("Socket disconnected !");
};

export const configSocket = () => {
  if (socket && socket.disconnected) {
    socket.connect();
  }

  if (socket) return;

  socket = io.connect(endpoint, {
    path: "/socket.io",
    extraHeaders: { Authorization: `Bearer ${token}` },
  });

  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);
  socket.on("game-pin", onResponseGamePin);
  socket.on("update-player-host", onResponsePlayerJoin);
  socket.on("game-started", onResponseGameStarted);
  socket.on("game-started-player", onResponseGameStartedPlayer);
  socket.on("game-questions", onResponseGameQuestions);

  // connect
  socket.on("update-player-room", onResponsePlayerJoinRoom);
  socket.on("room-question", onResponseRoomQuestion);
  socket.on("show-all-questions", onResponseShowAllQuestion);
  socket.on("show-all-host-detail", onResponseShowAllHostDetail);
  socket.on("counter-game-start", onResponseGameStartCounter);
  socket.on("counter-question", onResponseQuestionCounter);
  socket.on("question-time-up", onResponseQuestionTimeUp);
  socket.on("show-player-score", onResponsePlayerScore);
  socket.on("player-leave-room", onResponsePlayerLeaveRoom);
  socket.on("show-player-total-score", onResponseAllPlayerScore);

  return socket;
};

export const socketDisconnect = () => {
  socket.disconnect();
};

export default function getSocket() {
  return socket;
}
