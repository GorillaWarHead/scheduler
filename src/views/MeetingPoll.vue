<template>
  <div>
    <v-row align="center" justify="center">
      <v-col xl="6">
        <v-card>
          <v-card-title class="justify-center">Share your invite </v-card-title>
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col class="d-flex">
                  <!-- :value="`${currentMeetUpId}/${$route.params.token}`" -->

                  <v-text-field
                    ref="url"
                    outlined
                    dense
                    hide-details
                    class="rounded-r-0"
                    v-model="url"
                  ></v-text-field>
                  <v-btn
                    @click="copyText()"
                    color="primary"
                    class="elevation-0 py-5 rounded-l-0"
                    >copy</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col xl="6">
        <v-card>
          <v-card-title class="justify-center">{{
            eventData.title | Capitalize
          }}</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-simple-table dense>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th>
                            <span class="d-block"></span>
                          </th>
                          <th
                            class="text-center"
                            v-for="event in meetingData.options"
                            :key="event.id"
                          >
                            <span class="d-block text-h5">
                              {{
                                moment(event.eventStartDate).format("MMM")
                              }}</span
                            >
                            <span class="d-block text-h4 font-weight-bold">
                              {{ moment(event.eventStartDate).format("DD") }}
                            </span>
                            <span class="d-block text-h5">
                              {{ moment(event.eventStartDate).format("ddd") }}
                            </span>
                            <span class="d-block text-h5">
                              {{ moment(event.eventStartDate).format("HH:mm") }}
                            </span>
                            <span class="d-block text-h5">
                              {{ moment(event.eventEndDate).format("HH:mm") }}
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="text-h6">
                            {{
                              eventData.repense &&
                              Object.keys(eventData.repense).length
                            }}
                            Participant
                          </td>
                          <td
                            v-for="event in eventData.eventDetailDto"
                            :key="event.id"
                            class="text-center text-h6"
                          >
                            {{
                              eventData.repense &&
                              Object.values(eventData.repense)
                                .flat()
                                .filter((repense) => repense === event.id)
                                .length
                            }}
                            /
                            {{
                              eventData.repense &&
                              Object.keys(eventData.repense).length
                            }}
                          </td>
                        </tr>
                        <tr>
                          <td :style="{ width: '250px' }">
                            <v-form ref="form" lazy-validation>
                              <v-text-field
                                prepend-icon="mdi-account-circle"
                                v-model="name"
                                :rules="requiredFieldRules"
                                placeholder="Enter Your Name"
                                dense
                                outlined
                                hide-details
                              ></v-text-field>
                            </v-form>
                          </td>
                          <td
                            v-for="(event, idx) in meetingData.options"
                            :key="idx"
                          >
                            <v-checkbox
                              :value="idx"
                              v-model="votes"
                            ></v-checkbox>
                          </td>
                        </tr>
                        <tr
                          v-for="(value, key) in eventData.repense"
                          :key="key"
                        >
                          <td class="text-h6">
                            <v-icon left>mdi-account-circle</v-icon
                            >{{ key | split }}
                          </td>
                          <td
                            v-for="event in eventData.eventDetailDto"
                            :key="event.id"
                            class="text-center"
                          >
                            <v-icon
                              color="green"
                              v-if="value.find((v) => v === event.id)"
                            >
                              mdi-check-circle-outline
                            </v-icon>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" text v-if="votes.length > 0">
              <v-icon>mdi-check</v-icon>
              <span>{{ votes.length }}</span>
            </v-btn>
            <v-btn
              color="primary"
              class="elevation-0"
              tile
              :disabled="!name"
              @click="send()"
            >
              <span class="d-block">{{
                votes.length > 0 ? "Send" : "Cannot Attend"
              }}</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from "moment";
import { mapMutations, mapState } from "vuex";

export default {
  data: () => ({
    moment,
    url: null,
    eventData: {},
    votes: [],
    name: "",
    requiredFieldRules: [(v) => !!v || "This field is required"],
  }),
  // async asyncData({ params, $axios }) {
  //   $axios.setToken(params.token, "Bearer");
  //   const { data } = await $axios.$get(`/event/eventReponse/${params.id}`);
  //   return { data };
  // },
  computed: {
    ...mapState(["meeting"]),
    meetingData: {
      get() {
        return this.meeting;
      },
      set(value) {
        this.serMeeting(value);
      },
    },
  },
  mounted() {
    if (window) {
      this.url = window.location.href;
    }
    // this.fetchEventData();
  },
  filters: {
    Capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    split(value) {
      if (!value) return "";
      value = value.toString();
      return value.split("_")[0];
    },
  },
  methods: {
    ...mapMutations(["setMeeting"]),
    copyText() {
      let textToCopy = this.$refs.url.$el.querySelector("input");
      textToCopy.select();
      document.execCommand("copy");
    },
    async fetchEventData() {
      this.$axios.setToken(this.$route.params.token, "Bearer");
      await this.$axios
        .$get(`/event/eventReponse/${this.$route.params.id}`)
        .then((data) => {
          console.log(data);
          this.eventData = { ...data };
          this.eventData.eventDetailDto.forEach((element) => {
            if (element.eventReponse.length > 0) {
              element.eventReponse.forEach((participant) => {
                this.participants.push({
                  name: participant.name,
                  vote: {
                    eventId: element.id,
                  },
                });
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async send() {
      if (this.validate()) {
        const eventVotes = this.votes.map((vote) => {
          return {
            name: this.name,
            eventDetail: {
              id: vote,
            },
          };
        });
        await this.$axios
          .post("/eventreponse", eventVotes)
          .then(() => {
            this.name = "";
            this.votes = [];
            this.reset();
            this.fetchEventData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    validate() {
      return this.$refs.form?.validate();
    },
    reset() {
      return this.$refs.form?.reset();
    },
    resetValidation() {
      return this.$refs.form?.resetValidation();
    },
  },
};
</script>

<style>
table,
th,
td {
  border: thin solid rgba(0, 0, 0, 0.12);
}
.v-input__slot {
  align-items: center;
  justify-content: center;
}
</style>