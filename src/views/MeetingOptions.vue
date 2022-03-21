<template>
  <v-row class="fill-height" align="center" justify="center">
    <v-col cols="12" class="text-center">
      <h3>STEP 2 OF 3</h3>
    </v-col>
    <v-col cols="12" class="text-center">
      <h2>What are the options?</h2>
    </v-col>
    <v-col cols="12" xl="6">
      <v-card>
        <v-card-text>
          <MonthView @input="getEventList" />
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
            @click="postEventDetails()"
            >Continue</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import moment from "moment";
import MonthView from "../components/MonthView.vue";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    MonthView,
  },
  data: () => ({
    tab: "week",
    events: [],
  }),
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
  mounted() {},
  methods: {
    ...mapMutations(["setMeeting"]),
    getEventList(events) {
      this.events = events;
    },
    async postEventDetails() {
      const eventDetails = this.events?.map((event) => {
        return {
          eventStartDate: moment(new Date(event.start)).format(
            "YYYY-MM-DD HH:mm"
          ),
          eventEndDate: moment(new Date(event.end)).format("YYYY-MM-DD HH:mm"),
          event: {
            id: this.currentMeetUpId,
          },
        };
      });

      this.meeting.options = eventDetails;
      this.$router.push("/meeting/Initiate");

      //   await this.$axios.post("/eventdetail", eventDetails).then(({ data }) => {
      //     console.log(data);
      //     this.$router.push("/create/settings");
      //   });
    },
  },
};
</script>

<style scoped >
</style>