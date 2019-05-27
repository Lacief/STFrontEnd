
<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <h1 class="grey--text">My Activities</h1>

      <!-- dialog -->
      <v-dialog max-width="600px" v-model="dialog">
        <v-btn flat slot="activator" class="success" left>Add New Activity</v-btn>
        <v-card>
          <v-card-text>
            <v-form ref="form" class="px-3">
              <v-text-field v-model="activities.name" label="Name" prepend-icon="folder"></v-text-field>
              <v-text-field v-model="activities.status" label="Status" prepend-icon="folder"></v-text-field>
              <v-textarea v-model="activities.content" label="Content" prepend-icon="edit"></v-textarea>
              <v-text-field v-model="activities.category" label="Category" prepend-icon="folder"></v-text-field>
              <v-spacer></v-spacer>
              <v-btn flat @click="submit" class="success mx-0 mt-3" :loading="loading">Submit</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-spacer></v-spacer>

      <!-- user selection -->
      <v-flex xs12 sm3>
        <v-select
          menu-props="offsetY"
          :items="authors"
          label="Select User"
          v-model="activities.author"
        ></v-select>
      </v-flex>

    <!-- activities presentation -->
    </v-layout>
    <v-card flat v-for="activity in projects" :key="activity.name" class>
      <v-layout row wrap>
        <v-flex xs12 sm4 md2>
          <div class="grey--text">Name</div>
          <div>{{ activity.name }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="grey--text">Status</div>
          <div>{{ activity.status }}</div>
        </v-flex>
        <v-flex xs6 sm4 md12>
          <div class="grey--text">Content</div>
          <div>{{ activity.content }}</div>
        </v-flex>
        <v-flex xs2 sm4 md2>
          <div class="grey--text">Category</div>
          <div>{{ activity.category }}</div>
        </v-flex>
        <v-flex xs2 sm4 md2>
          <div class="grey--text">Author</div>
          <div>{{ activity.author }}</div>
        </v-flex>

        <v-btn flat fab left color="warning" @click="modifyItem(activity)">
          <v-icon>edit</v-icon>
        </v-btn>

        <v-btn flat fab left color="danger" @click="deleteItem(activity.id)">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
/* eslint-disable */
import db from "@/fb";
export default {
  data() {
    return {
      activities: {
        name: "",
        status: "",
        content: "",
        category: "",
        author: "user1"
      },
      defaultItem: {
        name: "",
        status: "",
        content: "",
        category: "",
        author: "user1"
      },
      projects: [],
      loading: false,
      dialog: false,
      authors: ["user1", "user2", "user3"],
      itemID: "",
      i: 0
    };
  },
  methods: {
    submit() {
      console.log(this.itemID);
      this.loading = true;
      const activities = {
        name: this.activities.name,
        status: this.activities.status,
        content: this.activities.content,
        category: this.activities.category,
        author: this.activities.author
      };
      if (this.i==0){
        db.collection("Activity")
        .add(activities)
        .then(() => {
          this.loading = false;
          this.dialog = false;
          console.log("added to db");
        });
      }
      else if (this.i==1){
        db.collection("Activity").doc(this.itemID).update(activities)
          .then(() => {
            this.loading = false;
            this.dialog = false;
            console.log("added to db");
            console.log(activities);
          });
        this.i=0
        this.itemID = '';
      }
      this.$refs.form.reset();
    },
     modifyItem: function(activity) {
        console.log(activity.id)
        this.activities = Object.assign({}, activity)
        console.log(Object.assign({}, activity))
        this.itemID = activity.id
        this.dialog = true;
        this.i=1
     },
    deleteItem: function(id) {
      db.collection("Activity").doc(id).delete()
        .then(function() {
          console.log("Document successfully deleted!");
          window.location.reload();
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    }
  },
  created() {
    db.collection("Activity").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === "added") {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
  }
};
</script>