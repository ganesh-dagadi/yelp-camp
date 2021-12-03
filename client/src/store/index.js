import Vuex from 'vuex'
import auth from './modules/auth'
import general from './modules/general'

export default new Vuex.Store({
  modules : {
    auth,
    general
  }
})