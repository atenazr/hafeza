<template>
  <div id="q-app">

      <router-view />
    
  </div>
</template>
<script>
export default {
  name: 'App',
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    }
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace('/home');
      }
    }
  },
  created(){
    this.$store.dispatch('tryLogin');
  },
  destroyed(){
    console.log('log out');
    this.$store.dispatch('logout')
  }
}
</script>

<style>

</style>
