export const state = () => ({
    isOnline: true,
    isPending: 0,
    titlePage: 'CAPTURA DE DATOS'
})

export const mutations = {
    setData(state,data){
      state.isOnline =data
    },
    toOnline(state) {
      state.isOnline = true
    },
    toOffline(state) {
      state.isOnline = false
    },
    updatePendingData(state,data){
      state.isPending = data
    },
    setTitlePage(state,data){
      state.titlePage = data
    }
}