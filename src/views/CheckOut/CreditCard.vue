<template>
  <v-radio :value="card.cardNumber" class="align-start mt-2 py-5 px-2">
    <template v-slot:label>
      <v-row no-gutters class="pl-2">
        <v-col cols="auto pr-4">
          <v-img :src="visaLogo" width="56" height="36" cover position="center 40%" />
        </v-col>
        <v-col cols="auto">
          <v-row no-gutters>
            <v-col cols="12" class="text-subtitle-1 font-weight-medium">
              {{ card.providerName }} - {{ card.cardNumber }}
            </v-col>
            <v-col cols="12" class="text-body-2 text-grey-darken-1 pt-1">
              <v-row no-gutters>
                <v-col cols="auto">
                  {{ card.holderName }}
                </v-col>
                <v-col cols="auto px-2">
                  |
                </v-col>
                <v-col cols="auto">
                  exp. {{ card.expireMonth }}/{{ card.expireYear }}
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="text-body-2 font-weight-medium pt-1">
              <v-row no-gutters>
                <v-col cols="auto" class="text-blue-darken-3">
                  Edit
                </v-col>
                <v-col cols="auto" class="text-grey-darken-1 px-2">
                  |
                </v-col>
                <v-col cols="auto" class="text-blue-darken-3">
                  Delete
                </v-col>
              </v-row>
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
                :model-value="card.securityCode"
                label="" variant="outlined" density="compact" type="password"
                color="blue-darken-3" bg-color="white" hide-details disabled
              >
                <template v-slot:append-inner>
                  <v-icon color="green-darken-4">mdi-check-circle-outline</v-icon>
                </template>
              </v-text-field>
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
      </v-row>
    </template>
  </v-radio>
</template>

<script>
import visaLogo from '@/assets/Visa.jpg'
import backOfCard from '@/assets/back-of-card.png'

export default {
  name: 'CreditCard',
  props: {
    card: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    visaLogo,
    backOfCard,
  }),
}

</script>
