var mixin1 = {
    computed: {
        isFollow () {
            return this.$store.state.accounts[0];//需要监听的数据
        }
    },
    watch: {
        isFollow (newVal, oldVal) {
            //do something
            console.log("newVal",newVal,"oldVal",oldVal);
            this.onLogout(this.$store.state.accounts[0])
        }
    },
    methods: {
        onAccountsChanged: function () {
            var _this=this
            window.ethereum.on('accountsChanged', function (accounts) {
                _this.onRefresh(accounts)
            })
        }
    }
}
export {mixin1}
