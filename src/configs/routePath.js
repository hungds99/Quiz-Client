export const RoutePath = Object.freeze({
  home: "/",
  explore: "/explore",
  login: "/login",
  register: "/register",
  dashboard: {
    index: "/dashboard",
    library: "/dashboard/library",
    topic: "/dashboard/topics",
    host: "/dashboard/hosts",
    joinHistory: "/dashboard/history",
  },
  quiz: {
    create: "/dashboard/quiz/create/:id",
    detail: "/dashboard/quiz/detail/:id",
    edit: "/quiz/edit/:id",
  },
  host: {
    lobby: "/host/lobby/:id",
    started: "/host/lobby/:id/started",
  },
  player: {
    join: "/player/join",
    lobby: "/player/lobby/:hostId",
    started: "/player/lobby/:hostId/started",
    solo: "/player/solo/:hostId",
  },
});
