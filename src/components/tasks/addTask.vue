<template>
    <q-card>
        
        <modal-header>Add Task</modal-header>

        <form @submit.prevent="submitForm">
            <q-card-section class="q-pt-none">

                    <modal-task-name 
                        :name.sync="taskToSubmit.name"
                        ref="modalTaskName"></modal-task-name>

                    <modal-task-duedate 
                        :dueDate.sync="taskToSubmit.dueDate"
                        @clear='deleteDueDate'></modal-task-duedate>

                    <modal-task-duetime
                        v-if="taskToSubmit.dueDate" 
                        :dueTime.sync="taskToSubmit.dueTime"></modal-task-duetime>

            </q-card-section>

            <modal-buttons />

        </form>

      </q-card>
</template>

<script>
import {mapActions} from 'vuex'
export default{
    data(){
        return{
            taskToSubmit:{
                name:'',
                dueDate:'',
                dueTime:'',
                completed:false
            }
        }     
    },
    methods:{
        ...mapActions('tasks',['addTask','loadTasks']),
        async submitForm(){
            this.$refs.modalTaskName.$refs.name.validate();
            if(!this.$refs.modalTaskName.$refs.name.hasError){
                // console.log('true');
                await this.submitTask()
            }
        },
        async submitTask(){
            await this.addTask(this.taskToSubmit);
            // await this.loadTasks();
            this.$emit('close');   
        },
        deleteDueDate(){
            this.taskToSubmit.dueDate='';
            this.taskToSubmit.dueTime='';
        }
    },
    components:{
        'modal-header':require('components/tasks/shared/modalHeader.vue').default,
        'modal-task-name':require('components/tasks/shared/modalTaskName.vue').default,
        'modal-task-duedate':require('components/tasks/shared/modalTaskDuedate.vue').default,
        'modal-task-duetime':require('components/tasks/shared/modalTaskDuetime.vue').default,
        'modal-buttons':require('components/tasks/shared/modalButtons.vue').default
    }
}
</script>
