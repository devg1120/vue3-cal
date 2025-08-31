<script setup>
//import HelloWorld from './components/HelloWorld.vue';

//import { computed, reactive, ref } from 'vue'
//import { useAppStore } from '@/store'
import { VueCal } from '@/vue-cal'
import Base from './Base.vue'

/*************************************/
let title = "基本";
let code_block = `
<VueCal 
  :views="['day', 'week']"
  :time-from="7 * 60"
  :time-to="20 * 60"
  :special-hours="specialHours"
/>
`;
/*************************************/

</script>

<template>
<Base :title :code_block>
<template v-slot:contents>
<!------------------------------------->
   <VueCal 
      :views="['day', 'week']"
      :time-from="7 * 60"
      :time-to="20 * 60"
      :special-hours="specialHours"
   />
<!------------------------------------->
</template>

<template v-slot:desc>
<!------------------------------------->
   <p>DESCRIPTION</p>
   <ul>
     <li>Neil Armstrong</li>
     <li>Alan Bean</li>
     <li>Peter Conrad</li>
     <li>Edgar Mitchell</li>
     <li>Alan Shepard</li>
   </ul>
<!------------------------------------->
</template>

</Base>
</template>
