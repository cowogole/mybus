
<template>
  <v-dialog
    v-model="show"
    persistent
    background-color="white"
    max-width="600px"
  >
    <v-card v-for="stop in currentRecord" :key="stop.gtfsId" ma-4>
      <v-card-title class="ma-2"
        ><v-icon large left color="orange darken-2">
          mdi-bus-stop-covered
        </v-icon>
        {{ stop.name }}</v-card-title
      >
      <v-card
        v-for="bus in stop.patterns"
        :key="bus.code"
        class="ma-4"
        color="#26c6da"
        dark
        flat
        max-width="600"
      >
        <v-row>
          <v-col cols="6">
            <v-card-title>
              <v-icon large left> mdi-map-marker-right </v-icon>
              <span class="text-h6 font-weight-light">
                {{ bus.headsign }}
              </span>
            </v-card-title>
          </v-col>
          <v-col cols="6">
            <v-card-title>
              <v-icon large left> mdi-bus </v-icon>
              <span class="text-h6 font-weight-light">
                {{ bus.route.mode }} - {{ bus.route.shortName }}</span
              >
            </v-card-title>
          </v-col>
        </v-row>

        <v-card-title>
          <span class="text-h8 font-weight-light">
            {{ bus.route.longName }}</span
          >
        </v-card-title>
      </v-card>

      <v-card-actions>
        <v-btn class="ma-5" text color="teal accent-4" @click="show = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    currentRecord: Array,
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  data() {
    return {};
  },

  methods: {},
};
</script>