<template>
    
    <div class="q-mt-lg">

        <list-header
            bgColor="bg-green-4">Compeleted</list-header>

		<q-list 
			separator
			bordered>
				<task
					v-for="(task,key) in tasksCompeleted"
					:key="key"
					:task="task"
					:id="key">
				</task>
		</q-list>

    
    </div>

</template>

<script>
export default {
    props:['tasksCompeleted'],
    components:{
        'task':require('components/tasks/task.vue').default,
        'list-header':require('components/tasks/shared/listHeader.vue').default
    }
}
</script>

<style>

</style>
