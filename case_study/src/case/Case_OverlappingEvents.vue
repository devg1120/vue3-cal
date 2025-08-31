<script setup>
//import HelloWorld from './components/HelloWorld.vue';

//import { computed, reactive, ref } from 'vue'
//import { useAppStore } from '@/store'
import { VueCal } from '@/vue-cal'
import Base from './Base.vue'

/*************************************/
let title = "Overlapping Events";
let code_block = `
<vue-cal
  editable-events
  :min-event-width="minEventWidth"
  :events="events">
</vue-cal>

let events_data  = [
     {
       start: '2025-08-18 18:30',
       end: '2025-08-18 20:30',
       title: 'Cross-fit',
       content: '<i class="icon mdi mdi-dumbbell"></i>',
       class: 'sport'
     },
     {
       start: '2025-08-19 14:00',
       end: '2025-08-19 22:00',
       title: 'A big thing',
       content: '<i class="icon mdi mdi-emoticon-outline"></i>',
       class: 'health'
     },
     {
       start: '2025-08-20 16:00',
       end: '2025-08-20 19:00',
       title: 'Another thing',
       content: '<i class="icon mdi mdi-thumb-up-outline"></i>',
       class: 'blue-event'
     },
   ];

`;
/*************************************/

let minEventWidth = 0;
let events_data  = [
    {
      start: '2025-08-18 18:30',
      end: '2025-08-18 20:30',
      title: 'Cross-fit',
      content: '<i class="icon mdi mdi-dumbbell"></i>',
      class: 'sport'
    },
    {
      start: '2025-08-19 14:00',
      end: '2025-08-19 22:00',
      title: 'A big thing',
      content: '<i class="icon mdi mdi-emoticon-outline"></i>',
      class: 'health'
    },
    {
      start: '2025-08-20 16:00',
      end: '2025-08-20 19:00',
      title: 'Another thing',
      content: '<i class="icon mdi mdi-thumb-up-outline"></i>',
      class: 'blue-event'
    },
  ];


function z2p( num ) {
let ret = ( '000' + num ).slice( -2 );
return ret;
}

function fmt( date ) {
const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 and pad with '0'
const day = date.getDate().toString().padStart(2, '0'); // Pad with '0'
const h   = date.getHours().toString().padStart(2, '0'); // 6
const m = date.getMinutes().toString().padStart(2, '0'); // 35
const s = date.getSeconds().toString().padStart(2, '0'); // 20
const millsec = date.getMilliseconds().toString().padStart(3, '0'); // 333
const days    = date.getDay(); // 4 (注)曜日を数値で取得している（

const formattedDate = `${year}-${month}-${day} ${h}:${m}`; // Example: YYYY-MM-DD
return formattedDate;
}

function build_events( data ) {
    let start = new Date(data[0]["start"].split(" " )[0] );
    let today_ = new Date();
    let yyyy = today_.getFullYear(); // 2022
    let mm   = z2p(today_.getMonth()+1 ); // 4 (注)取得値に1を足して5月となる
    let dd   = z2p(today_.getDate()) ; // 5

    let today = new Date( yyyy + "-" + mm + "-" + dd)

    //// 日曜日 - 土曜日 : 0 - 6
    // week  1 2 3 4 5 6 0
    let s_day = start.getDay();
    let t_day = today.getDay();
    if (t_day == 0 ) {
        t_day = 7 ;
    }
    let gap =  s_day - t_day  ;
    let termDay = (today.getTime() - start.getTime()) /  (24*60*60*1000) + gap;
    console.log("termDay", termDay);

    let events_ = [];
    for ( let i = 0; i < data.length ; i++) {
        let start = new Date(data[i].start);
	start.setDate(start.getDate() + termDay);
        let end = new Date(data[i].end);
	end.setDate(end.getDate() + termDay);
        events_.push( {
             title   : data[i].title,
             start   : fmt(start),
             end     : fmt(end),
             content : data[i].content,
             class   : data[i].class,
	});
    }
    return events_ ;
}

let events = build_events( events_data );
//console.log(events);



</script>

<template>
<Base :title :code_block>
<template v-slot:contents>
<!------------------------------------->
<vue-cal
  editable-events
  :min-event-width="minEventWidth"
  :events="events">
</vue-cal>
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
