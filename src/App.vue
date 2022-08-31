<template>
  <div id="app"></div>
  <MyNavigation :user="user" @logout="logout" />
  <router-view
    class="container"
    :user="user"
    :meetings="meetings"
    @logout="logout"
    @addMeeting="addMeeting"
    @deleteMeeting="deleteMeeting"
    @checkIn="checkIn"
    :error="error"
  />
</template>

<script>
import MyNavigation from "./components/MyNavigation.vue";
import Firebase from "firebase/compat/app";
import db from "./db.js";
export default {
  name: "app",
  components: {
    MyNavigation,
  },
  data: function () {
    return {
      user: null,
      meetings: [],
      error: null,
    };
  },
  methods: {
    logout: function () {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.user = null;
          this.$router.push("login");
        });
    },
    addMeeting: function (payload) {
      db.collection("users").doc(this.user.uid).collection("meetings").add({
        name: payload,
        createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
      });
    },
    deleteMeeting: function (playload) {
      db.collection("users")
        .doc(this.user.uid)
        .collection("meetings")
        .doc(playload)
        .delete();
    },
    checkIn: function (payload) {
      db.collection("users")
        .doc(payload.userID)
        .collection("meetings")
        .doc(payload.meetingID)
        .get()
        .then((doc) => {
          if (doc.exists) {
            db.collection("users")
              .doc(payload.userID)
              .collection("meetings")
              .doc(payload.meetingID)
              .collection("attendees")
              .add({
                displayName: payload.displayName,
                eMail: payload.eMail,
                createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then(() =>
                this.$router.push(
                  "/atendees/" + payload.userID + "/" + payload.meetingID
                )
              );
          } else {
            this.error = "Sorry, no such meeting";
          }
        });
    },
  },
  mounted() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;

        //Read information
        db.collection("users")
          .doc(this.user.uid)
          .collection("meetings")
          .onSnapshot((snapshot) => {
            const snapData = [];

            snapshot.forEach((doc) => {
              snapData.push({
                id: doc.id,
                name: doc.data().name,
              });
            });
            this.meetings = snapData.sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              } else {
                return 1;
              }
            });
          });
      }
    });
    // db.collection("users")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       this.user = doc.data().name;
    //     });
    //   })
    //   .catch((error) => {
    //     console.log("Error getting documents: ", error);
    //   });

    // db.collection("users")
    //   .doc("7cR36hxhcRknmDGUPW5B")
    //   .get()
    //   .then((snapshot) => {
    //     this.user = snapshot.data().name;
    //   });
  },
};
</script>

<style lang="scss">
$primary: #05b2dd;
@import "node_modules/bootstrap/scss/bootstrap";
</style>
