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

//let md_mode = 'light';
let md_mode = 'dark';
let md_content = `

## One of the world's most

- aaaa
- bbbb
- cccc

`;
/*************************************/

</script>

<template>
<Base :title :code_block :md_mode :md_content>

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

</Base>
</template>
