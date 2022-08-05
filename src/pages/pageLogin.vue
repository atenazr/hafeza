<template>
  <q-page padding>
    
        <div class="q-pa-md">

          <div v-if="!$store.getters.isAuthenticated">
            
              <div v-if="model === 'login'">

                <form-header 
                  label="don`t have an account?...Sign up Now!" 
                  text1="If you want to see your own tasks, you have to login"
                  text2="Please sign up or login to your account,have joy!!!"
                  @clickBtn="siwtchModel"></form-header>
                <form-info  btnLabel='Login' @submitForm="submit"></form-info>

              </div>

              <div v-else>

                  <form-header 
                    label="Already have an account?... Login Now!"
                    text1="If you want to see your own tasks, you have to login"
                    text2="Please sign up or login to your account,have joy!!!" 
                    @clickBtn="siwtchModel"></form-header>
                  <form-info  btnLabel='Sign up' @submitForm="submit"></form-info>

              </div>

              <div v-if="error" class="q-mt-xl q-pt-xl">
                  <form-header 
                    label="OK"
                    :text1="error"
                    text2="Try again !" 
                    @clickBtn="error = null"></form-header>
              </div>
          
          </div>

          <div  v-else>

            <form-header 
                    label="Log out !!!"
                    text1="If you want to log out your account,Please click below button"
                    text2="Hope see you soooooon ;)" 
                    @clickBtn="$store.dispatch('logout')"></form-header>

          </div>

          <div v-if="isLoading" class="q-mt-xl q-pt-xl">
					    <spinner text="take a moment ... information is checking"></spinner>
				  </div>

        </div>

        

  </q-page>
</template>

<script>

export default {
    data(){
      return{
        model:'login',
        isLoading:false,
        error:null
      }
    },
    methods:{
      async submit(tmp){

          this.isLoading = true; 
          try{     
              if(this.model === 'login'){
                  await this.$store.dispatch('login',tmp);
              }
              else{
                  await this.$store.dispatch('signup',tmp);
              }
          }catch(err){
            // console.log('err',err);
            this.error = err;
          }
            this.isLoading = false;
            if(this.$store.getters.isAuthenticated){
                this.$router.push('/');
            }
      },
      siwtchModel(){
        if(this.model === 'login'){
            this.model = 'sign up';
        }else{
          this.model = 'login';
        }
      }
    },
    components:{
      'form-header':require('components/login/formHeader.vue').default,
      'form-info':require('components/login/formInfo.vue').default
    }
}
</script>