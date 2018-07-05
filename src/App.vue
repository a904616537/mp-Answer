<script>
import Vue from 'vue';
export default {
    onLaunch(ops) {
        if (ops.scene == 1044) {
            wx.getShareInfo({
                shareTicket : ops.shareTicket,
                success     : (res) => { 
                    Vue.store.commit('user/share', res)
                },
                fail        : (res) => { console.log('error', res) },
                complete    : (res) => { console.log('complete') }
            })
        }
    },
    created () {
        // 调用API从本地缓存中获取数据
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        console.log('app created and cache logs by setStorageSync')
    }
}
</script>

<style>
.container {
    height          : 100%;
    display         : flex;
    flex-direction  : column;
    align-items     : center;
    justify-content : space-between;
    padding         : 200rpx 0;
    box-sizing      : border-box;
}
/* this rule will be remove */
* {
    transition         : width 2s;
    -moz-transition    : width 2s;
    -webkit-transition : width 2s;
    -o-transition      : width 2s;
}

</style>
