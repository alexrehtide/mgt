export const getters = {
  hasError: (state) => {
    for (const key in state.errors) {
      if (state.errors[key]) {
        return true
      }
    }
    return false
  }
}
