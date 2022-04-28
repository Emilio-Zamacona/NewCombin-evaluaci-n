<template>
  <footer class="footer">
    <p>copyright</p>
    <p>All rights reserved</p>

  </footer>
</template>

<script>
export default {
  name: 'FooterMain'
}

</script>

<style scoped>
.footer{
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-block: 1.5rem;
  padding-inline: 4rem;
  background-color: rgb(147, 209, 199);
  color: black;
  font-weight: 600;
}

</style>
