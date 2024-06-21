<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" class="pt-0 pt-md-2 pb-3">
        <v-btn flat class="text-none text-subtitle-2 text-grey-darken-2" @click="goBack()">
          <v-icon size="24" class="mr-2">mdi-arrow-left</v-icon>
          Upcoming Show
        </v-btn>
      </v-col>
      <v-col cols="12" sm="12" md="7" lg="7" xl="7">
        <v-row no-gutters class="pa-2">
          <v-col cols="12" class="outlined rounded">
            <v-row no-gutters class="py-4 px-6">
              <v-col cols="auto" class="text-h6 pb-3">
                Delivery
              </v-col>
              <v-col cols="auto" class="pl-1">
                <v-icon color="green-lighten-1" size="32">
                  mdi-check-circle-outline
                </v-icon>
              </v-col>
              <v-col cols="12" class="pb-1 text-subtitle-1 font-weight-medium">
                Mobile Entry - Free
              </v-col>
              <v-col cols="12" class="text-body-2 text-grey-darken-1">
                Tickets Available by {{ program.date }}
              </v-col>
              <v-col cols="12" class="text-body-2 text-grey-darken-1">
                These mobile tickets will be transferred directly to you from a trusted seller.
                We'll email you instructions on how to accept them on the original ticket provider's mobile app.
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="outlined rounded mt-4">
            <v-row no-gutters class="pt-4 pb-6 px-6">
              <v-col cols="auto" class="text-h6 pb-3">
                Payment
              </v-col>
              <v-col cols="auto" class="pl-1">
                <v-icon color="green-lighten-1" size="32">
                  mdi-check-circle-outline
                </v-icon>
              </v-col>
              <v-col cols="12" class="pl-4 text-subtitle-1 font-weight-medium">
                Use Credit / Debit Card
              </v-col>
              <v-col cols="12">
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-radio-group
                      :model-value="paymentMethod"
                      color="blue-darken-3" hide-details
                      @update:model-value="changePaymentMethod($event, 1)"
                    >
                      <template v-for="card in cards" :key="card">
                        <credit-card
                          :card="card"
                          :class="paymentMethod === card.cardNumber ? 'outlined rounded card--selected' : ''"
                        />
                      </template>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="px-2 py-5 cursor-pointer" @click="dialogAddCard = true">
                <v-row no-gutters align="center">
                  <v-col cols="auto">
                    <v-icon color="blue-darken-3" size="36">
                      mdi-plus
                    </v-icon>
                  </v-col>
                  <v-col cols="auto" class="pl-2 pr-3">
                    <v-img :src="newCard" height="32" width="44" cover />
                  </v-col>
                  <v-col cols="auto" class="text-blue-darken-3 text-subtitle-1 font-weight-medium">
                    Add New Card
                  </v-col>
                </v-row>
              </v-col>
              <v-divider />
              <v-col cols="12" class="px-4 py-5">
                <v-row no-gutters>
                  <v-col cols="12" class="text-subtitle-1 font-weight-medium">
                    Or Pay With
                  </v-col>
                  <v-col cols="12" class="text-body-2 font-weight-medium">
                    By using a digital wallet and continuing past this page, you have read and are accepting the
                    <span class="text-blue-darken-3">
                      Term of Use.
                    </span>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                :class="selectedWallet === true ? 'outlined rounded card--selected' : ''"
                cols="12" class="px-2 py-4"
              >
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-radio-group
                      :model-value="selectedWallet"
                      color="blue-darken-3" hide-details
                      @update:model-value="changePaymentMethod($event, 2)"
                    >
                      <v-radio :value="true">
                        <template v-slot:label>
                          <v-row no-gutters align="center">
                            <v-col cols="auto pl-2 pr-5">
                              <v-icon size="36" color="blue-darken-3">
                                mdi-wallet
                              </v-icon>
                            </v-col>
                            <v-col cols="auto">
                              <v-row no-gutters>
                                <v-col cols="12" class="text-subtitle-1 font-weight-medium">
                                  Digital wallet
                                </v-col>
                                <v-col cols="12" class="text-body-2 text-grey-darken-1 pt-1">
                                  User Name
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" md="5" lg="5" xl="5">
        <v-row no-gutters class="pa-2">
          <v-col cols="12" class="outlined rounded">
            <v-row no-gutters class="py-4 px-6">
              <v-col cols="12" class="text-h6">
                <v-row no-gutters justify="space-between">
                  <v-col cols="auto">
                    Total
                  </v-col>
                  <v-col cols="auto">
                    ${{ total.toFixed(2) }}
                    <v-icon size="24" color="grey-darken-1">
                      mdi-chevron-up
                    </v-icon>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="pt-3 pb-1 text-subtitle-1 font-weight-medium">
                Tickets
              </v-col>
              <v-col cols="12" class="text-body-2 text-grey-darken-4">
                <v-row no-gutters justify="space-between">
                  <v-col cols="auto">
                    Resale Tickets: ${{ program.price.toFixed(2) }} x {{ quantity }}
                  </v-col>
                  <v-col cols="auto">
                    ${{ totalTickets.toFixed(2) }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="pt-3 pb-1 text-subtitle-1 font-weight-medium">
                Notes From Seller
              </v-col>
              <v-col cols="12" class="text-body-2 text-grey-darken-4">
                xfr XFER Proof of at least one dose of COVID-19 vaccination
                for ages 5 to 11 and guests ages 12 and up will be required
                to show proof of two COVID-19 vaccine doses or one dose of
                the Johnson & Johnson vaccince. Mask must be worn.
              </v-col>
              <v-col cols="12" class="pt-3 pb-1 text-subtitle-1 font-weight-medium">
                Fees
              </v-col>
              <v-col cols="12" class="text-body-2 text-grey-darken-4">
                <v-row no-gutters justify="space-between">
                  <v-col cols="auto">
                    Service Fee: ${{ serviceFee }} x {{ quantity }}
                  </v-col>
                  <v-col cols="auto">
                    ${{ totalServiceFee.toFixed(2) }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="text-body-2 text-grey-darken-4">
                <v-row no-gutters justify="space-between">
                  <v-col cols="auto">
                    Order Processing Fee
                  </v-col>
                  <v-col cols="auto">
                    $${{ orderProcessingFee.toFixed(2) }}
                  </v-col>
              </v-row>
              </v-col>
              <v-col cols="12" class="pt-3 pb-1 text-subtitle-1 font-weight-medium">
                Delivery
              </v-col>
              <v-col cols="12" class="text-body-2 text-grey-darken-4">
                <v-row no-gutters justify="space-between">
                  <v-col cols="auto">
                    Mobile Entry
                  </v-col>
                  <v-col cols="auto">
                    Free
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="pt-6 pb-1 text-body-2 font-weight-medium text-blue-darken-2 cursor-pointer" @click="goBack()">
                Cancel Order
              </v-col>
              <v-col cols="12" class="pt-6 pb-1 text-body-2 font-weight-medium">
                *All Sales Final - No Refunds
              </v-col>
              <v-col cols="12" class="d-flex pt-3 pb-1 text-body-2 font-weight-medium">
                <label for="accepted">
                  <v-row no-gutters align="center">
                    <v-col cols="auto" class="d-flex">
                      <input type="checkbox" id="accepted" class="input--checkbox cursor-pointer">
                    </v-col>
                    <v-col cols="auto pl-2 cursor-pointer">
                      I have read and agree to the current
                      <span class="text-blue-darken-2 cursor-pointer" @click.prevent="">
                        Terms of Use.
                      </span>
                    </v-col>
                  </v-row>
                </label>
              </v-col>
              <v-col cols="12" class="py-4">
                <v-btn
                  :rounded="false" width="100%" height="2.6rem"
                  flat color="light-green-darken-4" class="text-none text-subtitle-1"
                >
                  Place Order
                </v-btn>
              </v-col>
              <v-col cols="12" class="text-xsmall">
                *Exceptions may apply, see our Terms of Use.
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <dialog-new-card
      :model-value="dialogAddCard"
      @update:modelValue="dialogAddCard = $event"
      @addNewCard="addNewCard($event)"
      />
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import creditCard from '@/views/CheckOut/CreditCard.vue'
import dialogNewCard from '@/views/CheckOut/AddNewCard.vue'
import newCard from '@/assets/card.png'

export default {
  name: 'CheckOut',
  components: {
    creditCard,
    dialogNewCard,
  },
  data: () => ({
    newCard,
    serviceFee: 44.08,
    orderProcessingFee: 2.95,
    paymentMethod: 999,
    selectedWallet: null,
    cards: [
      {
        providerName: 'Visa',
        cardNumber: 999,
        holderName: 'User Name',
        expireYear: '28',
        expireMonth: '04',
        securityCode: '000',
      },
    ],
    dialogAddCard: false,
  }),
  computed: {
    ...mapState({
      program: (state) => state.selectedProgram,
      quantity: (state) => state.quantity,
    }),
    totalServiceFee() {
      return this.serviceFee * this.quantity
    },
    totalTickets() {
      if (this.program == null) return 0
      return this.program.price * this.quantity
    },
    total() {
      return (this.totalTickets + this.serviceFee) + this.orderProcessingFee
    },
  },
  methods: {
    ...mapMutations({
      reset: 'reset',
    }),
    goBack() {
      this.reset()
      this.$router.push({ name: 'home' })
    },
    uncheckWallet(event) {
      console.log(event)
      if (event == null) return
      this.selectedWallet = null
      this.paymentMethod = event
    },
    uncheckCard(event) {
      console.log(event)
      if (event == null) return
      this.paymentMethod = null
      this.selectedWallet = event
    },
    changePaymentMethod(event, method) {
      console.log(event, method)
      if (method === 1) return this.uncheckWallet(event)
      this.uncheckCard(event)
    },
    addNewCard(cardInfo) {
      this.cards.push(cardInfo)
    },
  },
}
</script>

<style scoped>
.input--checkbox {
  width: 1rem;
  height: 1rem;
}
.card--selected {
  background-color: #F2F7FB;
  border: thin solid #E1E4F7 !important;
}
</style>
