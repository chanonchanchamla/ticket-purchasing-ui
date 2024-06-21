<template>
  <v-app>
    <v-main>
      <v-slide-x-transition mode="out-in">
        <router-view key="content" />
      </v-slide-x-transition>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>

<style lang="sass">
@import '@/sass/CustomTheme.sass'
</style>
