<template>
  <div>
      <q-card class="my-card">
        <q-card-section>
            <div>

                <div class="q-ma-md">
                    <q-input 
                        label="email" 
                        type="email" 
                        autofocus 
                        v-model="info.email" />
                </div>

                <div class="q-ma-md">
                    <q-input 
                        label="password" 
                        type="password" 
                        class="q-m-md"
                        v-model="info.password" />
                </div>

                <div class="q-ma-md">
                    <q-btn color="cyan-8" text-color="cyan-1" :label="btnLabel" @click="submitForm"/>
                </div>

            </div>
            
        </q-card-section>
    </q-card>

  </div>
</template>

<script>
export default {
    props:[
        'btnLabel'
    ],
    data(){
        return{
                info:{
                    email:'',
                    password:''
                }
        }
    },
    methods:{
        submitForm(){
            // console.log('temp',this.info);
            this.$emit('submitForm',this.info);
        }
    },
    components:{
        // 'modal-task-name':require('components/tasks/shared/modalTaskName.vue').default
    }
    

}
</script>

<style scoped lang="scss">
.my-card{
  width: 100%;
  max-width: 650px;
  padding: 1rem;
  margin: 1rem auto;
}
@media  screen and (min-width : 767px) {
    .my-card{
        padding:2rem 4rem;
    }

}
</style>