<template>
  <nav>
    <ul class="navbar">
      <li class="navbar-item">Home</li>
      <li class="navbar-item">Other page</li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavbarMain'

}
</script>

<style scoped>
.navbar{
  list-style-type: none;
  display: flex;
  justify-content: space-around;
}
.navbar-item{
  padding-block: 1.5rem;
  border: rgb(186,226,219) 5px solid;
  width: 100%;
  background-color: rgb(147, 209, 199);
  font-weight: 600;
  color: black;
}
.navbar-item:last-child{
  border-left: none;
}
</style>
