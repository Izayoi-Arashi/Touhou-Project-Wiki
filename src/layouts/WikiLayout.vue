<script setup>
import AppNavbar from '../components/AppNavbar.vue'
</script>

<template>
  <div class="bg-page">
    <div class="bg-fixed-layer" style="background-image: url('/images/background.jpg')" />
    <AppNavbar />
    <transition name="page-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
