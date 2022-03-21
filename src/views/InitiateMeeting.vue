<template>
  <v-row align="center" justify="center">
    <v-col cols="12" class="text-center">
      <h3>STEP 3 OF 3</h3>
    </v-col>
    <v-col cols="12" class="text-center">
      <h2>Tell your participants who you are</h2>
    </v-col>
    <v-col cols="12" xl="6">
      <v-card>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="meetingData.owner"
                    prepend-icon="mdi-account-circle"
                    label="Name"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="meetingData.ownerEmail"
                    prepend-icon="mdi-email"
                    label="Email"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="$router.push(-1)" outlined tile icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn
            color="primary"
            class="elevation-0"
            tile
            @click="createMeetup()"
            >Finish</v-btn
          >
          <!-- <v-btn color="primary" class="elevation-0" tile @click="skipInfo()"
            >Skip</v-btn
          > -->
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["meeting"]),
    meetingData: {
      get() {
        return this.meeting;
      },
      set(value) {
        this.setMeeting = value;
      },
    },
  },
  methods: {
    ...mapMutations(["setMeeting"]),
    createMeetup() {
      console.log(this.meetingData);
      this.$router.push("/meeting/38497NVF598347");
    },
  },
};
</script>

<style>
</style>