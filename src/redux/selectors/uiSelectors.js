import { createSelector } from "reselect";

const selectRaw = (state) => state.UI;

const selectLoading = createSelector([selectRaw], (ui) => ui.isLoading);
const selectOpenQuizDialog = createSelector(
  [selectRaw],
  (ui) => ui.isOpenQuizDialog
);
const selectNotification = createSelector([selectRaw], (ui) => ui.notification);

const UISelectors = {
  selectLoading,
  selectOpenQuizDialog,
  selectNotification,
};

export default UISelectors;
