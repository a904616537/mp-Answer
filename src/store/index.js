/**
* Sample React Redux
* @Author: Kain·Shi <a904616537@outlook.com>
* @DateTime:    2018-06-14 15:38:06
* @Description
* @Flow 
*/

import Vue          from 'vue'
import Vuex         from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import Counter      from './module/counter'
import User         from './module/user'
import Hall         from './module/hall'
import Banner       from './module/banner'
import Question     from './module/question'

Vue.use(Vuex)

const store = new Vuex.Store({
	actions,
	getters,
	modules : {
		Question,
		Counter,
		Banner,
		User,
		Hall
	},
	// strict  : debug
})

export default store
