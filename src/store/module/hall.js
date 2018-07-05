/**
# Sample Wechat MP
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-06-14 16:15:52
* @Description
* @Flow 
*/

import * as types  from '../mutation-types'

const state = {
	pro_list : []
}

const actions = {
	onSet({commit}, data) {
		commit(types.HALL_PRODUCT, data);
	}
}

// mutations
const mutations = {
	[types.HALL_PRODUCT] (state, data) {
		state.pro_list = data;
	}
}

export default {
	state,
	actions,
	mutations
}