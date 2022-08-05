<template>
  
    <q-banner class="bg-grey-3">
            <template v-slot:avatar>
                    <q-icon name="check" color="primary"/>
            </template>
            {{ message }}
            <template v-slot:action>
                    <q-btn flat
                            @click="$emit('clickBtn')"
                            color="primary"
                            :label="btnLabel"/>
            </template>
    </q-banner>
</template>

<script>
export default {
        props:[
                'btnLabel',
                'message'
        ]
}
</script>

<style>