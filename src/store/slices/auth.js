const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  database: null,
  activeSessionPopup: { status: false, helperdata: null },
  signoutModal: { status: false, helperdata: null },
  sidebarOpened: { status: false, helperdata: null },
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    addTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    addUser(state, action) {
      state.user = action.payload;
    },
    removeTokens(state, action) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
    openActiveSessionPopup(state, action) {
      state.activeSessionPopup.helperdata = action.payload;
      state.activeSessionPopup.status = true;
    },
    closeActiveSessionPopup(state) {
      state.activeSessionPopup.status = false;
      state.activeSessionPopup.helperdata = null;
    },
    openSignoutModal(state, action) {
      state.signoutModal.helperdata = action.payload;
      state.signoutModal.status = true;
    },
    closeSignoutModal(state) {
      state.signoutModal.status = false;
      state.signoutModal.helperdata = null;
    },
    sidebarToggle(state, action) {
      state.sidebarOpened.status = action.payload;
    },
  },
});

export const {
  addTokens,
  removeTokens,
  addUser,
  openActiveSessionPopup,
  closeActiveSessionPopup,
  openSignoutModal,
  closeSignoutModal,
  sidebarToggle,
} = authSlice.actions;
export default authSlice.reducer;
