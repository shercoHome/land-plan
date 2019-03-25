export default {
    debug: true,
    state: {
        message: 'Hello!',
        token:window.localStorage.getItem("token"),
    },
    actionStateSet(item, newValue) {
        if (this.debug) console.log('store:setAction triggered:', item, newValue)
           // if (item === 'token') {
            // 执行你的逻辑
                window.localStorage.setItem(item,newValue)
           // }
        this.state[item] = newValue;
    },
    actionStateClear(item) {
        if (this.debug) console.log('store:clearAction triggered', item)
        this.state[item] = ''
        localStorage.removeItem(item);//localStorage.clear();
    },
    loading(flag) {
        if (this.debug) console.log('store:isLoading =', flag)
        this.state.isLoading = flag;
    }

}