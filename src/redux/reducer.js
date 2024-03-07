// const initialState = {
//     role: 'all',
//     texts: ['abcd', 'efgh', 'hijk', 'lmnop']
// };

// function appReducer(state = initialState, action) {
//     switch (action.type) {
//         case 'SET_ROLE':
//             return { ...state, role: action.payload };
//         default:
//             return state;
//     }
// }
// //

// import { SET_SELECTED_ITEM_ID, SET_USER_ID } from "./actions";

// const initialState = {
//   selectedItemId: null,
//   userId: null, // Add a new state property for userId
// };

// const Reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_SELECTED_ITEM_ID:
//       return {
//         ...state,
//         selectedItemId: action.payload,
//       };
//     case SET_USER_ID: // Handle the new action type
//       return {
//         ...state,
//         userId: action.payload, // Update the state with the new userId
//       };
//     default:
//       return state;
//   }
// };

// export default Reducer;

import {
  SET_SELECTED_ITEM_ID,
  SET_USER_ID,
  // SET_SELECT_OPTIONS,
} from "./actions";

const initialState = {
  selectedItemId: null,
  userId: null,
  // selectOptions: [], 
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_ITEM_ID:
      return {
        ...state,
        selectedItemId: action.payload,
      };
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    // case SET_SELECT_OPTIONS: 
    //   return {
    //     ...state,
    //     selectOptions: action.payload,
    //   };
    default:
      return state;
  }
};

export default Reducer;
