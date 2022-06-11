<template>
  <v-container fluid>
    <v-card class="d-flex justify-center mb-0" elevation="0" tile>
      <v-card class="pa-2 ma-2" tile elevation="0">
        <v-text-field
          id="textField"
          label="Search bus stops"
          solo
          prepend-icon="mdi-map-marker"
          v-model="address"
          @input="debouncedHandler"
        ></v-text-field>
      </v-card>
    </v-card>

    <v-card
      class="d-flex justify-center mb-1"
      elevation="0"
      v-for="staion in stationsList"
      :key="staion.gtfsId"
      tile
    >
      <v-card
        color="#26c6da"
        dark
        flat
        class="ml-4"
        width="400"
        @click.stop="popUpDia(staion.gtfsId)"
      >
        <v-row>
          <v-col>
            <v-card-title>
              <v-icon large left> mdi-sign-caution </v-icon>
              <span class="text-h6 font-weight-light">
                {{ staion.name }}
              </span>
            </v-card-title>
          </v-col>
        </v-row>
      </v-card>
    </v-card>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <StopView
      v-if="showStops"
      v-model="showStops"
      :currentRecord="stopInfo"
      width="600px"
    />
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import StopView from "./StopView.vue";
import { getStopData } from "@/util/gqlfunctions.js";

const stationsListGql = gql`
  query stops($name: String!) {
    stops(name: $name) {
      gtfsId
      name
      code
      lat
      lon
    }
  }
`;

export default {
  name: "HelloWorld",
  components: {
    StopView,
  },
  data() {
    return {
      stationsList: [],
      stopInfo: [],
      address: "", //"eg. Innopoli",
      showStops: false, //switch for displaying StopView components
      overlay: false, // show Loading, to prevent user action while loading data
    };
  },

  methods: {
    /**
     * @description fetch data via apollo & present on UI
     * @param name stop name from text field, user input
     */
    async getData() {
      const list = await this.$apollo.query({
        query: stationsListGql,
        variables: {
          name: this.address,
        },
      });
      //TODO deal with error or null res
      this.stationsList = [].concat(list.data.stops);
      console.log(this.stationsList);
    },

    /**
     * @description get and show stop and route info
     * @param {*} id
     */
    async popUpDia(id) {
      this.overlay = true;
      getStopData(id).then((res) => {
        //TODO deal with error or null res
        this.stopInfo = [].concat(res.data.stop);
        console.log(this.stopInfo);
        this.showStops = true;
      });
      this.overlay = false;
      this.showStops = true;
    },
  },

  /**
   * @description use loadsh to prevent frequent database queries during user input.
   */
  created() {
    this.debouncedHandler = debounce(() => {
      console.log("New value:", this.address);
      if (this.address !== "") {
        this.getData();
      } else {
        this.stationsList = [];
      }
    }, 500);
  },

  /**
   * @description remove loadsh before unmount.
   */
  beforeUnmount() {
    this.debouncedHandler.cancel();
  },
};
</script>

<style scoped>
.v-text-field {
  width: 400px;
}
</style>
