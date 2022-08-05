<template>
  <div class="row justify-center">
    <q-banner rounded class="my-card bg-cyan-8 text-cyan-1">
            {{ text1 }}
            <br>
            {{ text2 }}
      <template v-slot:action>
        <q-btn 
          flat 
          class="q-mt-xl"
          color="white" 
          :label="label" 
          @click="$emit('clickBtn')"/>
      </template>
    </q-banner>
  </div>
</template>

<script>
export default {
    props:['label','text1','text2']
}
</script>

<style scoped>
.my-card{
  width: 100%;
  max-width: 650px;
}
</style>