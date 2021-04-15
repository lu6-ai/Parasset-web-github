<template>
  <div class="navIndex">
    <NavLeft />
    <NavTop />
    <Popup />
    <AccountInfo />
    <MobileMenu />
  </div>
</template>

<script>
  import NavLeft from './Left'
  import NavTop from './Top'
  import Popup from '../Popup/Index'
  import AccountInfo from './AccountInfo'
  import MobileMenu from './MobileMenu'

  export default {
    components: {NavLeft, NavTop, Popup, AccountInfo, MobileMenu},
  }

</script>

<style lang="less">
  .navIndex {
  }
</style>
