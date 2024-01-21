export const oompaLoompaReducers = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_OOMPA_LOOMPAS':
      return [...action.payload, ...state]
    default:
      return state
  }
}
