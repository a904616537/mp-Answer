/**
# Sample Wechat MP
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-06-14 16:15:52
* @Description
* @Flow 
*/

import * as types  from '../mutation-types'

const state = {
	count: 0
}

const actions = {
	decrement({commit}, data) {
		console.log('commit DEVRENENT')
		commit(types.DEVRENENT, data);
	},
	increment({commit}, data) {
		console.log('commit INCREMENT')
		commit(types.INCREMENT, data);
	},
}

// mutations
const mutations = {
	[types.INCREMENT] (state, data) {
		state.count += 1;
	},
	[types.DEVRENENT] (state, data) {
		state.count -= 1;
	}
}

export default {
	state,
	actions,
	mutations
}