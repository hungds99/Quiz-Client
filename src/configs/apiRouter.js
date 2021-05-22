export const APIRouter = Object.freeze({
  user: {
    login: "/user/authenticate",
    register: "/user/register",
    profile: "/user/profile",
    uploadAvatar: "/user/upload-avatar",
    update: "/user/:id",
    changePassword: "/user/:id/change-password",
  },
  quiz: {
    list: "/quiz",
    upload: "/quiz/upload",
    createQuicklyQuiz: "/quiz/create-quickly-quiz",
    get: "/quiz/:id",
    getPaginationByCreator: "/quiz/get-pagination-by-creator",
    getPaginationByTopic: "/quiz/get-pagination-by-topic",
    getPagination: "/quiz/get-pagination",
  },
  question: {
    index: "/question",
    create: "/question/create",
    update: "/question/:id",
    delete: "/question/:id",
  },
  host: {
    create: "/host/create",
    createSinglePlay: "/host/create-single-play",
    get: "/host/:id",
    getByPin: "/host/getByPin/:pin",
    updateLiveStatus: "/host/update-live-status",
    updateCurrentQuestion: "/host/update-current-question",
    getOwner: "/host/get-owner",
  },
  score: {
    create: "/score",
    getTotal: "/score/get-player-total-score",
    getPlayerAnswserResult: "/score/get-player-answer-result",
    getPlayersHostResult: "/score/get-players-total-score/:hostId",
  },
  image: {
    upload: "/image/upload",
  },
  topic: {
    create: "/topic/create",
    getAll: "/topic",
    delete: "/topic/:id",
    getRecommend: "/topic/get-recommend-topic",
  },
});
