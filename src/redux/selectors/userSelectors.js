import { createSelector } from "reselect";

const selectRaw = (state) => state.user;

const selectCredentials = createSelector(
  [selectRaw],
  (user) => user.credentials
);

const UserSelectors = {
  selectCredentials,
};

export default UserSelectors;
