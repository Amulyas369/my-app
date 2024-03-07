export const setRole = (role) => ({
  type: "SET_ROLE",
  payload: role,
});

// Action Type
export const SET_SELECTED_ITEM_ID = "SET_SELECTED_ITEM_ID";
export const SET_USER_ID = "SET_USER_ID";
// export const SET_SELECTED_ITEM_ID = "SET_SELECTED_ITEM_ID";
// export const SET_SELECT_OPTIONS = "SET_SELECT_OPTIONS";

// Action Creator
export const setSelectedItemId = (itemId) => {
  return {
    type: SET_SELECTED_ITEM_ID,
    payload: itemId,
  };
};

export const setUserId = (userId) => ({
  type: SET_USER_ID,
  payload: userId,
});

// export const setSelectOptions = (options) => ({
//   type: SET_SELECT_OPTIONS,
//   payload: options,
// });
