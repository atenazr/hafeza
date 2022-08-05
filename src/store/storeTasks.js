import Vue from 'vue'
import { uid } from 'quasar'

const base_url = "https://todooo-2f542-default-rtdb.firebaseio.com"

const state =  {
    tasks:{}
}

const actions = {

    async updateTask(context, payload){

        let userId  = context.rootGetters.userId ;  

        const response = await fetch(
            `${base_url}/tasks/${userId}/${payload.id}.json?`,{
                method:'PATCH',
                body:JSON.stringify(payload.updates)
            }
          );

          const responseData = await response.json();
        //   console.log('response patch update',responseData);
          if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
          }
        
        context.commit('editTask',payload)
    },
    async deleteTask(context,id){
        let userId  = context.rootGetters.userId ;  

        const response = await fetch(
            `${base_url}/tasks/${userId}/${id}.json?`,{
                method:'DELETE'
            });

          const responseData = await response.json();
        //   console.log('response',responseData);
          if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
          }
        context.commit('deleteTask',id)
    },
    async addTask(context,task){
        let userId  = context.rootGetters.userId ; 

        const response = await fetch(
            `${base_url}/tasks/${userId}.json`,{
                method:'POST',
                body:JSON.stringify(task)
            }
          );
          const responseData = await response.json();
        //   console.log('response',responseData);
          if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
          }
        commit('addTask',payload)
    },
    async loadTasks(context,payload){
        const userId  = context.rootGetters.userId ; 

        const response = await fetch(
            `${base_url}/tasks/${userId}.json`)

        const responseData = await response.json();
        // console.log('response',responseData);
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
          }
        if(responseData){
            context.commit('setTasks',responseData);
        }
    }
}

const mutations = {
    addTask(state,payload){
        Vue.set(state.tasks , payload.id , payload.task)
    },
    editTask(state,payload){
        // console.log(payload);
        Object.assign(state.tasks[payload.id],payload.updates)
    },
    deleteTask(state,id){
        Vue.delete(state.tasks,id)
    },
    setTasks(state,payload){
        state.tasks = payload;
    }
}

const getters = {

    tasksTodo : (state) =>{
        let tasks = {};
        Object.keys(state.tasks).forEach(function(key){
            // console.log('task',key,state.tasks[key])
            let task = state.tasks[key];
            if(!task.completed){
                tasks[key] = task;
            }
        })
        return tasks
    },
    tasksCompeleted : (state) =>{
        let tasks = {};
        Object.keys(state.tasks).forEach(function(key){
            // console.log('task',key,state.tasks[key])
            let task = state.tasks[key];
            if(task.completed){
                tasks[key] = task;
            }
        })
        return tasks
    }

}

export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}