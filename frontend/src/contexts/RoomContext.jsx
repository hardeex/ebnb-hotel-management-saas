import { createContext, useContext, useReducer } from "react";

const RoomContext = createContext();

const initialState = {
  selectedRoomId: null,
  selectedRoomPrice: null,
  roomCounter: 0,
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_ROOM":
      return {
        ...state,
        selectedRoomId: action.payload.roomId,
        selectedRoomPrice: action.payload.roomPrice * state.roomCounter,
        selectedRoomPricePerRoom: action.payload.roomPrice,
      };
    case "INCREMENT_COUNTER":
      return {
        ...state,
        roomCounter: state.roomCounter + 1,
        selectedRoomPrice:
          state.selectedRoomPrice + state.selectedRoomPricePerRoom,
      };
    case "DECREMENT_COUNTER":
      return {
        ...state,
        roomCounter: state.roomCounter - 1,
        selectedRoomPrice:
          state.selectedRoomPrice - state.selectedRoomPricePerRoom,
      };
    default:
      return state;
  }
};
const RoomProvider = ({ children }) => {
  const [state, dispatch] = useReducer(roomReducer, initialState);

  return (
    <RoomContext.Provider value={{ state, dispatch }}>
      {children}
    </RoomContext.Provider>
  );
};

const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
};

export { RoomProvider, useRoom };
