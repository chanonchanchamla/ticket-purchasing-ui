<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" class="pa-3 pa-lg-4 text-h3 font-weight-light">
        Upcoming Shows
      </v-col>
      <template v-for="(program) in programs" :key="program.title">
        <ticket-tile :program="program" />
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'
import ticketTile from '@/views/Home/TicketTile.vue'
import sample01 from '@/assets/sample-01.jpg'
import sample02 from '@/assets/sample-02.jpg'
import sample03 from '@/assets/sample-03.jpg'
import sample04 from '@/assets/sample-04.jpg'
import sample05 from '@/assets/sample-05.jpg'
import sample06 from '@/assets/sample-06.jpg'
import sample07 from '@/assets/sample-07.jpeg'
import sample08 from '@/assets/sample-08.jpg'

export default defineComponent({
  name: 'HomeView',
  components: {
    ticketTile,
  },
  data: () => ({
    programs: [
      {
        title: 'Sample-01',
        image: sample01,
        price: 229.00,
        date: 'Sun Jun 23, 2024',
      },
      {
        title: 'Sample-02',
        image: sample02,
        price: 199.00,
        date: 'Sat Jun 22, 2024',
      },
      {
        title: 'Sample-03',
        image: sample03,
        price: 199.00,
        date: 'Sat Jun 22, 2024',
      },
      {
        title: 'Sample-04',
        image: sample04,
        price: 219.00,
        date: 'Sun Jun 23, 2024',
      },
      {
        title: 'Sample-05',
        image: sample05,
        price: 219.00,
        date: 'Mon Jun 24, 2024',
      },
      {
        title: 'Sample-06',
        image: sample06,
        price: 179.00,
        date: 'Mon Jun 24, 2024',
      },
      {
        title: 'Sample-07',
        image: sample07,
        price: 239.00,
        date: 'Mon Jun 24, 2024',
      },
      {
        title: 'Sample-08',
        image: sample08,
        price: 189.00,
        date: 'Sat Jun 22, 2024',
      },
    ],
  }),
});
</script>
