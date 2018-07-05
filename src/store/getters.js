/**
# Sample Wechat MP
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-06-14 16:15:52
* @Description
* @Flow 
*/

export const getBanner = (state, getters) => {
	return state.Banner.banner.filter(val => val.type === '2')
}

// 是否可以继续答题
export const openPlay = (state, getters) => {
	return state.Question.count > 0 ? true : false;
}