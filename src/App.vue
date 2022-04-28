<template>
  <div id="app">
    <NavbarMain/>
    <div class="main-container">
      <FormMain/>
      <TableMain/>
    </div>
    <FooterMain/>
  </div>
</template>

<script>
import FormMain from './components/FormMain.vue'
import TableMain from './components/TableMain.vue'
import NavbarMain from './components/NavbarMain.vue'
import FooterMain from './components/FooterMain.vue'
export default {
  name: 'App',
  components: {
    FormMain,
    TableMain,
    NavbarMain,
    FooterMain
  }
}
</script>

<style>
@import './styles/main.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main-container{

  margin: 3rem;
  display: flex;
  justify-content: space-around;
  gap: 3rem;
  height: 100%;
  padding: 2rem;
}
</style>
