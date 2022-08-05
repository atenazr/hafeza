<template>
    
        <div>
            
            <list-header
                bgColor="bg-orange-4">Todo</list-header>

            <q-list 
                separator
                bordered>
                    <task
                        v-for="(task,key) in tasksTodo"
                        :key="key"
                        :task="task"
                        :id="key">
                    </task>
            </q-list>
        
        </div>

</template>

<script>

export default {
    props:['tasksTodo'],
    data(){
        return{
        }
    },
    components:{
        'task':require('components/tasks/task.vue').default,
        'list-header':require('components/tasks/shared/listHeader.vue').default
    }
}
</script>

<style>

</style>