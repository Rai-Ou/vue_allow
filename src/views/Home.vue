<template>
  <div class="home">
    <img @click="tel" alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods:{
    tel(){
      window.location.href = 'tel://031182057888' 
    }
  }
}
</script>
