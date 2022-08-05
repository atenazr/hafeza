<template>
  <q-page class="q-pa-md">

	  	<div v-if="$store.getters.isAuthenticated">

			  	<div v-if="isLoading" class="q-mt-xl q-pt-xl">
					<spinner text="wait a minute"></spinner>
				</div>

			  	<div v-else>

					<task-todo 
						v-if="Object.keys(tasksTodo).length"
						:tasksTodo="tasksTodo"></task-todo>
					
					<modal-message
						v-else 
						message="No tasks to do today!" btnLabel="Add Task" @clickBtn="showAddTask = true"></modal-message>

					<task-compeleted 
						v-if="Object.keys(tasksCompeleted).length"
						:tasksCompeleted="tasksCompeleted"></task-compeleted>

					<div class="absolute-bottom text-center q-mb-lg">
						<q-btn
							@click="showAddTask = true" 
							round
							size="24px"
							color="primary"
							icon="add"
						/>
					</div>


					<q-dialog v-model="showAddTask">
					<add-task @close="showAddTask = false"></add-task>
					</q-dialog>
				
				</div>

		</div>

		<div v-else>

			<modal-message
				message="You have to login to your acoount or Sign up !" btnLabel="Login or Sign up" @clickBtn="$router.push('/login')"></modal-message>

		</div>

  </q-page>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'

export default {
		data(){
			return{
				showAddTask:false,
				isLoading:false
			}
		},
		computed: {
			...mapGetters('tasks',['tasksTodo','tasksCompeleted'])
		},
		methods:{
			...mapActions('tasks',['loadTasks'])
		},
		components:{
		 	'task-compeleted':require('components/tasks/taskCompeleted').default,
			'task-todo':require('components/tasks/taskTodo.vue').default,
	  		'addTask':require('components/tasks/addTask.vue').default,
			'modal-message':require('components/tasks/shared/modalMessage.vue').default
		},
		async created(){
			this.isLoading = true;	
			try{
				await this.loadTasks();
			}catch(err){
				console.log('error',err);
			}
			this.isLoading = false;
		}
}
</script>

<style>
	
</style>