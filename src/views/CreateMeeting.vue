<template>
  <v-row align="center" justify="center">
    <v-col cols="12" class="text-center">
      <h3>STEP 1 OF 3</h3>
    </v-col>
    <v-col cols="12" class="text-center">
      <h2>What's the occasion?</h2>
    </v-col>
    <v-col cols="12" xl="6">
      <v-card class="rounded">
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="meetingData.title"
                    prepend-icon="mdi-text"
                    label="Title"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="meetingData.location"
                    prepend-icon="mdi-map-marker"
                    label="Location"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="meetingData.description"
                    prepend-icon="mdi-text-long"
                    label="Description"
                    rows="2"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            class="elevation-0"
            tile
            @click="createMeetup()"
            >Continue</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["meeting"]),
    meetingData: {
      get() {
        return this.meeting;
      },
      set(value) {
        this.setMeeting(value);
      },
    },
  },
  methods: {
    ...mapMutations(["setMeeting"]),
    createMeetup() {
      console.log(this.meetingData);
      this.$router.push("/meeting/options");
    },
  },
};
</script>

<style>
</style>