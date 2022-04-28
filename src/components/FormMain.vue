<template>
  <section>
    <form class="form">
      <input
        @input="inputValidate(form.firstName.length < 1, 'First Name needs at least one character.')"
        v-model="form.firstName"
        type="text"
        placeholder="First Name"
        id="firstName"
        name="firstName">
      <input
        @input="inputValidate(form.lastName.length < 1, 'Last Name needs at least one character.')"
        v-model="form.lastName"
        type="text"
        placeholder="Last Name"
        id="lastName"
        name="lastName">
      <input
        @input="inputValidate(form.address.length < 1, 'Address needs at least one character.')"
        v-model="form.address"
        type="text"
        placeholder="Address"
        id="address"
        name="address">
      <input
        @input="inputValidate(regex.test(form.ssn) === false, 'Please enter a valid SSN number (XXX-XX-XXXX)')"
        v-model="form.ssn"
        type="text"
        placeholder="SSN"
        id="ssn"
        name="ssn">
      <div class="button-container">
        <button class="form-button" type="button" @click="resetForm">Reset</button>
        <button :disabled="disableSubmit" class="form-button" type="button" @click="addPerson(getToken,formValidate())">Save</button>
      </div>
    </form>
    <transition name="appearBottom">
      <div v-if="warning.length>0" class="modal warning">
        <p v-for="problem in warning" :key="problem.id">{{problem}} </p>
      </div>
    </transition>
    <transition name="appearBottom">
      <div v-if="addedUser" class="modal added">
        <p>User added successfully</p>
      </div>
    </transition>

  </section>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FormMain',
  data () {
    return {
      form: {
        firstName: '',
        lastName: '',
        address: '',
        ssn: ''
      },
      noSubmit: false,
      validatedFields: [],
      disableSubmit: true,
      warning: [],
      addedUser: false,
      regex: /^\d{3}-\d{2}-\d{4}$/
    }
  },
  computed: {
    ...mapGetters([
      'getPeople', 'getToken'
    ])

  },
  methods: {
    resetForm () {
      this.form = {
        firstName: '',
        lastName: '',
        address: '',
        ssn: ''
      }
      this.validatedFields = []
      this.resetWarning()
    },
    resetWarning () {
      this.warning = []
    },
    userAddSuccess () {
      if (!this.addedUser) {
        this.addedUser = true
      } setTimeout(() => {
        this.addedUser = false
      }, 2500)
    },
    inputValidate (condition, text) {
      this.warning = this.warning.filter(e => e !== text)
      if (condition) {
        this.warning.push(text)
        this.validatedFields = this.validatedFields.filter(e => e !== text)
      } else {
        this.validatedFields = this.validatedFields.filter(e => e !== text)
        this.validatedFields.push(text)
      }
      console.log(this.validatedFields.length)
      this.formValidate()
    },
    formValidate () {
      if (this.validatedFields.length >= 4) {
        this.disableSubmit = false
        return true
      } else {
        this.disableSubmit = true
        return false
      }
    },
    async addPerson (jwt, validated) {
      if (validated) {
        const validatedForm = JSON.parse(JSON.stringify(this.form))
        const res = await fetch('http://localhost:8081/api/members ', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + jwt.token,
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(validatedForm)
        })
        const resJson = await res.json()
        if (res.ok) {
          await this.$store.commit('addPerson', validatedForm)
          this.userAddSuccess()
          this.resetForm()
        } else if (resJson.message.includes('Duplicate SSN')) {
          this.warning.push('SSN Already in use.')
        }
      }
    }
  }

}

</script>

<style scoped>
.form{
  background-color: rgb(147, 209, 199);
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: black 1px solid; */
  padding: 2rem;
  gap: 2rem;
  border-radius: 2rem;
  box-shadow: 3px 3px 3px #2b2b2b78;
}
.form input{
  border: #2b2b2b78 1px solid;
  border-radius: 5px;
  background-color: white;
  padding: 1rem;
}
.button-container{
  display: flex;
  gap: 2rem;
}
.form-button{
  /* border: black 1px solid; */
  border-radius: 4px;
  width: 100px;
  padding: 1rem;
  background-color: white;
}
.modal{
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 100px;
  z-index: 3;
  padding: 1.5rem;
  border-radius: 1rem;
}
.warning{
  background-color: rgb(245, 88, 88);
  color: white;
}
.warning p{
  padding-block: 10px;
}
.added{
  background-color: rgb(56, 160, 77);
  color: white;
}
.appearBottom-enter-active{
  animation: appearBottom .5s ease;
}
.appearBottom-leave-active{
  animation: appearBottom .5s ease reverse;
}
@keyframes appearBottom{
  0%{opacity: 0;transform: translate(-50%,50px);}
  100%{opacity: 1;transform: translate(-50%,0px);}
}
</style>
