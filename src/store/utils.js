export const getIdx = (state, payload) => {
  return state.payList[payload.date].findIndex(
    aPayType => aPayType.id === payload.id
  )
}
