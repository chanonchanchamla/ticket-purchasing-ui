<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" class="pt-0 pt-md-2 pb-5">
        <v-btn flat class="text-none text-subtitle-2 text-grey-darken-2" @click="goBack()">
          <v-icon size="24" class="mr-2">mdi-arrow-left</v-icon>
          Upcoming Show
        </v-btn>
      </v-col>
      <v-col cols="12" sm="5" md="5" lg="4" xl="4" class="px-0 px-sm-5">
        <v-img :src="program.image" aspect-ratio="1" cover position="center center" class="outlined rounded" />
      </v-col>
      <v-col cols="12" sm="7" md="7" lg="8" xl="8" class="px-0 px-sm-5 pt-8 pt-sm-0">
        <v-row no-gutters>
          <v-col cols="12" class="text-h4">
            Sample-01
          </v-col>
          <v-col cols="12" class="text-body-1 pt-5 text-indent">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat et urna non volutpat.
            Nunc eu lectus bibendum, auctor mauris malesuada, dapibus augue. Duis blandit justo aliquam ipsum gravida egestas.
            Curabitur ipsum ipsum, finibus non enim ac, tincidunt euismod libero. Integer sagittis ut sem et bibendum.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam aliquam tincidunt congue.
            Phasellus sollicitudin sapien eget massa ultrices eleifend in ac nulla.
          </v-col>
          <v-col cols="12" class="text-body-1 pt-5 text-right">
            Tickets Available by {{ program.date }}
          </v-col>
          <v-col cols="12" class="text-h6 pt-3 text-right">
            Resale Price ${{ program.price.toFixed(2) }}
          </v-col>
          <v-col cols="12" class="pt-3">
            <v-row no-gutters justify="end" align="center">
              <v-col cols="auto" class="pr-2">
                <v-btn flat icon @click="minus()">
                  <v-icon color="grey-darken-2">mdi-minus</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="1">
                <v-text-field
                  :model-value="quantity"
                  label="" variant="outlined" density="compact" hide-details
                  type="number" maxlength="2" center-affix hide-spin-buttons
                  color="blue-darken-3" bg-color="white"
                  @update:modelValue="quantity = $event"
                />
              </v-col>
              <v-col cols="auto" class="pl-2">
                <v-btn flat icon @click="plus()">
                  <v-icon color="green-darken-3">mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row no-gutter justify="end">
          <v-col cols="12" sm="10" md="8" lg="6" class="pt-10">
            <v-row no-gutters justify="space-between" align="end">
              <v-col cols="auto" class="text-h5">
                Total
              </v-col>
              <v-col cols="auto" class="text-h5">
                ${{ total.toFixed(2) }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row no-gutters justify="end">
          <v-col cols="12" sm="10" md="8" lg="6" class="pt-5">
            <v-btn
              :rounded="false" width="100%" height="2.6rem"
              flat color="light-green-darken-4" class="text-none text-subtitle-1"
              @click="go()"
            >
              Checkout
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapMutations } from 'vuex'

export default defineComponent({
  name: 'ProgramView',
  data: () => ({
    quantity: 1,
  }),
  computed: {
    ...mapState({
      program: (state) => state.selectedProgram,
    }),
    total() {
      return this.program.price * this.quantity
    },
  },
  methods: {
    ...mapMutations({
      setQuantity: 'setQuantity',
      reset: 'reset',
    }),
    plus() {
      this.quantity += 1
    },
    minus() {
      if (this.quantity <= 1) return
      this.quantity -= 1
    },
    go() {
      this.setQuantity(this.quantity)
      this.$router.push({ name: 'checkout' })
    },
    goBack() {
      this.reset()
      this.$router.push({ name: 'home' })
    },
  },
})
</script>

<style>
.text-indent {
  text-indent: 2rem;
}
</style>
