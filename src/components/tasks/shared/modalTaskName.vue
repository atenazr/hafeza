<template>
  <q-input 
     class="q-mb-sm" 
     outlined 
     :value="name" 
     label="name"
     autofocus
     ref="name"
     @input="$emit('update:name',$event)"
     :rules="[val => !!val || 'Field is required']" >

        <template v-slot:append>
            <q-icon 
            v-if="name"
            @click="$emit('update:name','')"
            name="close" class="cursor-pointer" />
        </template>

  </q-input>
</template>

<script>
export default {
    props:[
        'name'
    ]
}
</script>

<style>

</style>