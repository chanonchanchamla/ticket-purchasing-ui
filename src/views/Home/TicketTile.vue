<template>
  <v-col cols="6" sm="6" md="4" lg="3" xl="2" class="pa-3 pa-lg-4">
    <v-row no-gutters class="outlined rounded cursor-pointer" @click="go()">
      <v-col cols="12">
        <v-img
          :src="program.image"
          aspect-ratio="1" cover position="center center"
        />
      </v-col>
      <v-col cols="12" class="px-2 px-lg-4 pt-3 pb-3 pb-sm-0">
        <v-row no-gutters justify="space-between">
          <v-col cols="12" sm="auto" class="text-subtitle-1 font-weight-medium">
            {{ program.title }}
          </v-col>
          <v-col cols="12" sm="auto" class="text-subtitle-1 font-weight-medium">
            ${{ program.price.toFixed(2) }}
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="px-2 px-lg-4 pb-3 hidden-xs text-body-2 text-grey-darken-3">
        {{ program.date }}
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'

export default defineComponent({
  name: 'TicketTile',
  props: {
    program: {
      type: Object,
      default: null,
    },
  },
  methods: {
    ...mapMutations({
      setSelectedProgram: 'setSelectedProgram',
    }),
    go() {
      this.setSelectedProgram(this.program)
      this.$router.push({
        name: 'show',
        params: { title: this.program.title },
      })
    },
  },
})
</script>
