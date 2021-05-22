export const RoutePath = Object.freeze({
  home: "/",
  explore: "/explore",
  login: "/login",
  register: "/register",
  dashboard: {
    index: "/dashboard",
    library: "/dashboard/library",
    topic: "/dashboard/topics",
    profile: "/dashboard/profile",
    host: "/dashboard/hosts",
    settings: "/dashboard/setttings",
  },
  quiz: {
    create: "/quiz/create/:id",
    detail: "/quiz/detail/:id",
    edit: "/quiz/edit/:id",
    list: "/quiz",
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
