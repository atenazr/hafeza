<template>

  <q-item 
  	@click="updateCompeleted"
  	:class="!mtask.completed ? 'bg-orange-1' : 'bg-green-1'"
  	clickable
  	v-ripple>
    <q-item-section side top>
      <q-checkbox :value="mtask.completed" class=“no-pointer-events” />
    </q-item-section>

    <q-item-section>
      <q-item-label
      	:class=" mtask.completed ?'text-strike' : '' ">
      	{{ mtask.name }}
      </q-item-label>
    </q-item-section>

    <q-item-section 
	v-if="mtask.dueDate"
	side>
    	<div class="row">
    		<div class="column justify-center">
		    	<q-icon 
		    		name="event"
		    		size="18px"
		    		class="q-mr-xs" />
    		</div>
	    	<div class="column">
          <q-item-label 
          	class="row justify-end"
          	caption>
          	{{ mtask.dueDate }}
          </q-item-label>
          <q-item-label
          	class="row justify-end"
          	caption>
          	<small>{{ mtask.dueTime }}</small>
          </q-item-label>
	    	</div>
    	</div>
    </q-item-section>

	<q-item-section side>
		<div class="row">
			<q-btn
				@click.stop="showEditTask = true" 
				flat 
				round 
				dense
				color="primary"
				icon="edit" />

			<q-btn
				@click.stop="promptToDelete(id)" 
				flat 
				round 
				dense
				color="red"
				icon="delete" />
		</div>
    </q-item-section>

	<q-dialog v-model="showEditTask">
      <edit-task 
	  :task="task"
	  :id="id"
	  @close="showEditTask = false"></edit-task>
    </q-dialog>

  </q-item>
  
</template>

<script>
import { mapActions } from 'vuex'
	export default {
        props: ['task', 'id'],
        data(){
            return{
				mtask : this.task,
				mid : this.id,
				showEditTask:false
            }
		},
		methods:{
			...mapActions('tasks',['updateTask','deleteTask','loadTasks']),
			async updateCompeleted(){
				await this.updateTask({id:this.mid,updates:{
					...this.task,
					completed : !this.mtask.completed
				}})
			},
			async promptToDelete(id){
				this.$q.dialog({
        		title: 'Confirm',
        		message: 'really delete ?',
        		cancel: true,
        		persistent: true
      			}).onOk(() => {
					this.deleteTask(id);
						});
				// await this.loadTasks();
		}
	},
	components:{
		'edit-task':require('components/tasks/editTask.vue').default
	},
	created(){
		console.log('mid',this.mid,this.id)
	}
}
</script>

<style>
	
</style>