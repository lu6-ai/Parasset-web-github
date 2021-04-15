<template>
  <div class="navIndex">
    <InsurancePoolDeposit />
    <InsurancePoolRedeem v-if="$store.state.insurancePoolRedeemShow" />
    <Toast />
    <ConnectWallet />
    <Clear />
  </div>
</template>

<script>
  import InsurancePoolDeposit from './InsurancePoolDeposit'
  import InsurancePoolRedeem from './InsurancePoolRedeem'
  import Toast from './Toast'
  import ConnectWallet from './ConnectWallet'
  import Clear from './Clear'


  export default {
    components: {InsurancePoolDeposit,InsurancePoolRedeem, Toast, ConnectWallet, Clear},
  }

</script>

<style lang="less">
  .navIndex {
  }
</style>
