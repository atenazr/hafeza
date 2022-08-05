<template>
    <q-card>
        
        <modal-header>Edit Task</modal-header>

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
    props: ['task', 'id'],
    data(){
        return{
            taskToSubmit:{}
        }     
    },
    methods:{
        ...mapActions('tasks',['updateTask','loadTasks']),
        submitForm(){
            this.$refs.modalTaskName.$refs.name.validate();
            if(!this.$refs.modalTaskName.$refs.name.hasError){
                console.log('true');
                this.submitTask()
            }
        },
        async submitTask(){
            await this.updateTask({
                id:this.id,
                updates:this.taskToSubmit
            })
            this.$emit('close');
            // await this.loadTasks();
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
    },
    mounted(){
        console.log('task',this.task);
        this.taskToSubmit = Object.assign({},this.task);
    }
}
</script>
