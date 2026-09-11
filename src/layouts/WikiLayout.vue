<script setup>
import AppNavbar from '../components/AppNavbar.vue'
</script>

<template>
  <div class="bg-page">
    <div class="bg-fixed-layer" style="background-image: url('/images/background.jpg')" />
    <AppNavbar />
    <router-view />
  </div>
</template>
