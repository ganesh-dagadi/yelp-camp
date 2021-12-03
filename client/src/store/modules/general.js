const state = {
   error : ''
}

const getters = {
    getError : state => state.error
}

const actions = {
    setError({commit} , error){
        commit('setError' , error)
    },
}

const mutations = {
    setError : (state , error) => state.error = error,
}

export default {
    state,
    getters,
    mutations,
    actions
}