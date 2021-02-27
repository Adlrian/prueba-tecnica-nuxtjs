export const state = () => ({
    isOnline: true 
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
    }
}