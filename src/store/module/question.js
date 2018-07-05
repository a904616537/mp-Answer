/**
# Sample Wechat MP
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-06-14 16:15:52
* @Description
* @Flow 
*/

import * as types  from '../mutation-types'

const state = {
	questions  : null,	// 题库
	count      : 0,		// 游戏次数
	answer_num : 0,		// 回答啦几次题目
	answer     : [],	// 答案
	number     : 0
}

const actions = {
	// 初始化题库
	onInit({commit}, data) {
		commit(types.QUESTION_INIT, data);
	},
	setCount({commit}, data) {
		commit(types.QUESTION_SETCOUNT, data);
	},
	play({commit}, data) {
		commit(types.QUESTION_PLAY, data);
	},
}

// mutations
const mutations = {
	[types.QUESTION_INIT] (state, data) {
		
		const questions = new Map();
		
		data.forEach((item, index) => {
			questions.set(index, item);
		})
		state.questions = questions;
		state.number    = 0;
	},
	[types.QUESTION_SETCOUNT] (state, data) {
		console.log('初始化次数', data)
		state.count = data.count;
		state.answer_num = data.answer_num;
	},
	[types.QUESTION_PLAY] (state, data) {
		state.count -= 1;
		state.number += 1;
		console.log('state.number', state.number)
	}
}

export default {
	state,
	actions,
	mutations
}