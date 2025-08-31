<script setup>

import  Case01 from './case/Case01.vue';
import  Case_OverlappingEvents from './case/Case_OverlappingEvents.vue';


</script>

<template>

<Case01 />
<Case_OverlappingEvents />

<!--
<VueCal
  :views="['day', 'week']"
  :time-from="7 * 60"
  :time-to="20 * 60"
  :special-hours="specialHours"
/>
-->

</template>

<style scoped>
</style>
