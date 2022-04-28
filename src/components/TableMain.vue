<template>
  <table class="table">
    <tr class="row row-first">
      <th>First Name</th>
      <th>Last Name</th>
      <th>Address</th>
      <th>SSN</th>
    </tr>
    <tr class="row" v-for="person in getPeople" :key="person.ssn">
      <th>{{person.firstName}}</th>
      <th>{{person.lastName}}</th>
      <th>{{person.address}}</th>
      <th>{{person.ssn}}</th>
    </tr>
  </table>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  name: 'TableMain',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'getPeople', 'getToken'
    ])
  },
  methods: {

    async getData (jwt) {
      const res = await fetch('http://localhost:8081/api/members', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + jwt.token
        }
      })
      const info = await res.json()
      console.log('buscando personas')
      await this.$store.commit('setPeople', info)
      setTimeout(() => {
        this.getData(jwt)
      }, 120000)
    },
    async auth () {
      console.log('solicitando token')
      const res = await fetch('http://localhost:8081/auth ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ username: 'sarah', password: 'connor' })
      })
      const jwt = await res.json()
      this.$store.commit('setToken', jwt)
      this.getData(this.getToken)
      setTimeout(() => {
        this.auth()
      }, 850000)
    }
  },
  created () {
    this.auth()
  }
}

</script>

<style scoped>
.table{
  height: 100%;
  background-color: white;
  border: 1px rgb(147, 209, 199);
  border-radius: 2rem;
  gap: 0;
  border-collapse: collapse;
  color: black;
}
.row th{
  border-right: 1px rgb(147, 209, 199) solid;
  padding: 2rem;
}
.row th:last-child{
  border-right: none;
}
.row-first{
  border-bottom: 1px solid rgb(147, 209, 199);
}

</style>
