import { createStore } from 'vuex';

export default createStore({
  state: {
    selectedProgram: null,
    quantity: 0,
  },
  getters: {
  },
  mutations: {
    setSelectedProgram(state, program) {
      state.selectedProgram = program
    },
    setQuantity(state, quantity) {
      state.quantity = quantity
    },
    reset() {
      this.selectedProgram = null
      this.quantity = 0
    },
  },
  actions: {
  },
  modules: {
  },
});
