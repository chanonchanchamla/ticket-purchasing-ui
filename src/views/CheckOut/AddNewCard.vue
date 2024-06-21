<template>
  <v-dialog
    :model-value="dialogAddCard"
    width="600" persistent
  >
    <v-card
      max-width="800"
      title="Add New Card"
    >
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" sm="12" md="8" lg="7" xl="7" class="py-2">
            <v-text-field
              :model-value="cardNumber"
              variant="outlined" density="compact" label="Card Number"
              hide-details color="blue-darken-3" bg-color="white"
              type="number" hide-spin-buttons
              @update:modelValue="cardNumber = $event"
            />
          </v-col>
          <v-col cols="12" sm="12" md="8" lg="7" xl="7" class="py-2">
            <v-text-field
              :model-value="holderName"
              variant="outlined" density="compact" label="Card Holder Name"
              hide-details color="blue-darken-3" bg-color="white"
              @update:modelValue="holderName = $event"
            />
          </v-col>
          <v-col cols="12">
            <v-row no-gutters align="center" class="py-2">
              <v-col cols="auto" class="pr-4">
                Expire
              </v-col>
              <v-col cols="auto">
                <v-text-field
                  :model-value="expireMonth"
                  variant="outlined" density="compact" label="MM"
                  hide-details color="blue-darken-3" bg-color="white"
                  type="number" hide-spin-buttons width="4rem"
                  @update:modelValue="expireMonth = $event"
                />
              </v-col>
              <v-col cols="auto" class="px-2">
                /
              </v-col>
              <v-col cols="auto">
                <v-text-field
                  :model-value="expireYear"
                  variant="outlined" density="compact" label="YY"
                  hide-details color="blue-darken-3" bg-color="white"
                  type="number" hide-spin-buttons width="4rem"
                  @update:modelValue="expireYear = $event"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="text-body-2 pt-3">
            Security Code
          </v-col>
          <v-col cols="12">
            <v-row no-gutters align="center">
              <v-col cols="6" sm="6" md="4" lg="3" xl="3">
                <v-text-field
                  :model-value="securityCode"
                  label="" variant="outlined" density="compact" type="password"
                  color="blue-darken-3" bg-color="white" hide-details
                  @update:modelValue="securityCode = $event"
                />
              </v-col>
              <v-col cols="6" sm="6" md="8" lg="9" xl="9" class="pl-3">
                <v-row cols="12" no-gutters align="center">
                  <v-col cols="auto">
                    <v-img :src="backOfCard" width="44" height="32" cover class="rounded"/>
                  </v-col>
                  <v-col cols="auto" class="text-caption pl-2">
                    3-digits on back of card
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col v-if="error" cols="12" class="text-body-2 text-red font-weight-medium pt-4">
            {{ errorMessage }}
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-col cols="12" class="text-right">
          <v-btn
            class="ms-auto px-3 text-grey-darken-2"
            text="Cancel"
            @click="close()"
          />
          <v-btn
            class="ms-auto px-3"
            text="Add"
            @click="addNewCard()"
          />
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import trim from 'lodash/trim'
import backOfCard from '@/assets/back-of-card.png'

export default defineComponent({
  name: 'AddNewCard',
  props: {
    dialogAddCard: {
      type: Boolean,
      default: null,
    },
  },
  data: () => ({
    backOfCard,
    cardNumber: null,
    holderName: null,
    expireMonth: null,
    expireYear: null,
    providerName: 'Visa',
    securityCode: null,
    error: false,
    errorMessage: null,
  }),
  methods: {
    close() {
      this.$emit('update:modelValue', false)
      this.reset()
    },
    setError(message) {
      this.error = true
      this.errorMessage = message
      return false
    },
    verify() {
      this.error = false
      if (trim(this.cardNumber) === '' || trim(this.cardNumber).length < 3) {
        return this.setError('Require card number')
      }
      if (trim(this.holderName) === '') {
        return this.setError('Require card holder name')
      }
      if (trim(this.expireMonth) === '' || trim(this.expireMonth) < 2) {
        return this.setError('Require expire month')
      }
      if (trim(this.expireYear) === '' || trim(this.expireYear) < 2) {
        return this.setError('Require expire year')
      }
      if (trim(this.securityCode) === '' || trim(this.securityCode) < 3) {
        return this.setError('Require securiry code')
      }
    },
    addNewCard() {
      if (this.verify() === false) return
      const cardInfo = {
        holderName: this.holderName,
        cardNumber: this.cardNumber,
        providerName: this.providerName,
        expireMonth: this.expireMonth,
        expireYear: this.expireYear,
        securityCode: this.securityCode,
      }
      this.$emit('addNewCard', cardInfo)
      this.$emit('update:modelValue', false)
      this.reset()
    },
    reset() {
      this.holderName = null
      this.cardNumber = null
      this.expireMonth = null
      this.expireYear = null
      this.securityCode = null
    },
  },
})
</script>
