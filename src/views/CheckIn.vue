<template>
  <form class="mt-3" @submit.prevent="handleCheckIn">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="card bg-light">
            <div class="card-body">
              <h3 class="font-weight-light mb-3">Check in</h3>
              <section class="form-group">
                <div class="col-12 alert alert-danger px-3" v-if="error">
                  {{ error }}
                </div>
                <label class="form-control-label sr-only" for="displayName"
                  >Name</label
                >
                <input
                  required
                  class="form-control mb-3"
                  type="text"
                  placeholder="Name"
                  v-model="displayName"
                />
              </section>
              <section class="form-group">
                <label class="form-control-label sr-only mt-2" for="Email"
                  >Email</label
                >
                <input
                  required
                  class="form-control"
                  type="email"
                  placeholder="Email"
                  v-model="eMail"
                />
              </section>
              <div class="form-group text-right mb-0 mt-4 mybutton">
                <button class="btn btn-primary" type="submit">Check in</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "CheckIn",
  data: function () {
    return {
      displayName: null,
      eMail: null,
    };
  },
  props: ["error"],
  methods: {
    handleCheckIn: function () {
      //console.log(this.$route.params.meetingID);

      this.$emit("checkIn", {
        userID: this.$route.params.userID,
        meetingID: this.$route.params.meetingID,
        displayName: this.displayName,
        eMail: this.eMail,
      });
      this.displayName = null;
      this.eMail = null;
    },
  },
};
</script>

<style>
.mybutton {
  text-align: right;
}
</style>
