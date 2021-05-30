export const getIdx = (state, payload) => {
  return state.payList[payload.date].findIndex(
    aPayType => aPayType.id === payload.id
  )
}

export const getTransitionIdx = (state, payload) => {
  const ptIdx =  getIdx(state, payload)
  return state.payList[payload.date][ptIdx].transactions.findIndex( 
    aTransaction => aTransaction.id === payload.tId
  )
}
