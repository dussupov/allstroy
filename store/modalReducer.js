const initialState = {
  modal:{
    modalType: null,
    modalIsOpen: null,
    modalData: null,
  }
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MODAL" :
      return {
        ...state,
        modal: {
          modalType: action.modalType,
          modalIsOpen: true,
          modalData: action.modalData,
        }
      }
    case "CLOSE_MODAL" :
      return {
        ...state,
        modal: {
          ...state.modal,
          modalIsOpen: false,
          modalData: null,
          modalType: null
        }
    }

    default:
      return state;
  }
}