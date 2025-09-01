<script setup>
import { ref } from 'vue';


//import HelloWorld from './components/HelloWorld.vue';

//import { computed, reactive, ref } from 'vue'
//import { useAppStore } from '@/store'
import { VueCal } from '@/vue-cal'
import Base from './Base.vue'
import '@mdi/font/css/materialdesignicons.min.css'

/*************************************/
const showDialog = ref(false)
const selectedEvent = ref(null)

let title = "Editting Events";
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


let md_mode = 'light';
//let md_mode = 'dark';
let md_content = `

## One of the world's most
- sm
- editable
- create event
- event class
- events-on-month-view
- all-day-events
- locale="ja"
- :time-from="7 * 60" :time-to="18 * 60" :time-step="30" 
- :special-hours="specialHours"

`;

/*************************************/

let minEventWidth = 0;
let events_data  = [
    {
      start: '2025-08-18 18:30',
      end: '2025-08-18 20:30',
      title: 'Cross-fit',
      content: '<i class="icon mdi mdi-dumbbell"></i>',
      contentFull: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil inventore expedita veniam deleniti, labore corporis quas, aspernatur praesentium quia nisi, omnis quod autem.',
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

function fmt_yyyymmdd (date ) {
const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 and pad with '0'
const day = date.getDate().toString().padStart(2, '0'); // Pad with '0'
const h   = date.getHours().toString().padStart(2, '0'); // 6
const m = date.getMinutes().toString().padStart(2, '0'); // 35
const s = date.getSeconds().toString().padStart(2, '0'); // 20
const millsec = date.getMilliseconds().toString().padStart(3, '0'); // 333
const days    = date.getDay(); // 4 (注)曜日を数値で取得している（

const formattedDate = `${year}-${month}-${day}`; // Example: YYYY-MM-DD
return formattedDate;
}
function fmt_hhmm (date ) {
const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 and pad with '0'
const day = date.getDate().toString().padStart(2, '0'); // Pad with '0'
const h   = date.getHours().toString().padStart(2, '0'); // 6
const m = date.getMinutes().toString().padStart(2, '0'); // 35
const s = date.getSeconds().toString().padStart(2, '0'); // 20
const millsec = date.getMilliseconds().toString().padStart(3, '0'); // 333
const days    = date.getDay(); // 4 (注)曜日を数値で取得している（

const formattedDate = `${h}:${m}`; // Example: HH:MM
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

//let events = build_events( events_data );
//console.log(events);

function  setDate(HH,MM,DAYSUB) {		 
    var date1 = new Date();
    date1.setHours(HH,MM);
    date1.setDate(date1.getDate() +DAYSUB);
    return date1;
  }
/*
const events = [
  {
    //start: new Date(new Date().setHours(11, 0)).subtractDays(2),
    //end: new Date(new Date().setHours(13, 0)).subtractDays(2),
    start: setDate(11,0,-2),
    end:   setDate(13,0,-2),
    title: 'Salsa Dance Class',
    content: '<i class="w-icon mdi mdi-dance-ballroom"></i>',
    class: 'sport',
    schedule: 2
  }];
*/

const events = [
  {
    //start: new Date(new Date().setHours(11, 0)).subtractDays(2),
    //end: new Date(new Date().setHours(13, 0)).subtractDays(2),
    start: setDate(0,0,0),
    end:   setDate(0,0,3),
    allDay: true,
    title: 'ALL DAY',
    content: '<i class="w-icon mdi mdi-dance-ballroom"></i>',
    class: 'sport',
    schedule: 2
  },
  {
    //start: new Date(new Date().setHours(11, 0)).subtractDays(2),
    //end: new Date(new Date().setHours(13, 0)).subtractDays(2),
    start: setDate(0,0,0),
    end:   setDate(0,0,4),
    allDay: true,
    title: 'ALL DAY',
    content: '<i class="w-icon mdi mdi-dance-ballroom"></i>',
    class: 'health',
    schedule: 2
  },
  {
    //start: new Date(new Date().setHours(11, 0)).subtractDays(2),
    //end: new Date(new Date().setHours(13, 0)).subtractDays(2),
    start: setDate(0,0,2),
    end:   setDate(0,0,5),
    allDay: true,
    title: 'ALL DAY',
    content: '<i class="w-icon mdi mdi-dance-ballroom"></i>',
    class: 'leisure',
    schedule: 2
  },
  {
    //start: new Date(new Date().setHours(11, 0)).subtractDays(2),
    //end: new Date(new Date().setHours(13, 0)).subtractDays(2),
    start: setDate(11,0,-2),
    end:   setDate(13,0,-2),
    title: 'Salsa Dance Class',
    content: '<i class="w-icon mdi mdi-dance-ballroom"></i>',
    class: 'sport',
    schedule: 2
  },
		 
  {
    //start: new Date(new Date().setHours(12, 30)),
    //end: new Date(new Date().setHours(13, 30)),
    start: setDate(12,30,0),
    end:   setDate(13,30,0),
    title: 'Doctor Appt.',
    content: '<i class="w-icon mdi mdi-stethoscope"></i>',
    contentFull: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil inventore expedita veniam deleniti, labore corporis quas, aspernatur praesentium quia nisi, omnis quod autem.',
    class: 'health',
    schedule: 1
  },
  {
    //start: new Date(new Date().setHours(11, 30)).addDays(1),
    //end: new Date(new Date().setHours(12, 30)).addDays(1),
    start: setDate(11,30,1),
    end:   setDate(12,30,1),
    title: 'Dentist Appt.',
    content: '<i class="w-icon mdi mdi-tooth"></i>',
    class: 'health',
    schedule: 2
  },
  {
    //start: new Date(new Date().setHours(13, 0)).addDays(1),
    //end: new Date(new Date().setHours(14, 0)).addDays(1),
    start: setDate(13,0,1),
    end:   setDate(14,0,1),
    title: 'Cross-fit',
    content: '<i class="w-icon mdi mdi-dumbbell"></i>',
    class: 'sport',
    schedule: 2
  },
  {
    //start: new Date(new Date().setHours(10, 0)).addDays(3),
    //end: new Date(new Date().setHours(11, 30)).addDays(3),
    start: setDate(10,0,3),
    end:   setDate(11,30,3),
    title: 'Swimming Class',
    content: '<i class="w-icon mdi mdi-swim"></i>',
    class: 'sport',
    schedule: 2
  },
  {
    //start: new Date(new Date().setHours(11, 35)).addDays(3),
    //end: new Date(new Date().setHours(12, 30)).addDays(3),
    start: setDate(11,35,3),
    end:   setDate(12,30,3),
    title: 'Brunch with Jane',
    content: '<i class="w-icon mdi mdi-food-croissant"></i>',
    class: 'leisure',
    schedule: 1,
    background: false
  },
  {
    //start: new Date(new Date().setHours(9, 0)).addDays(4),
    //end: new Date(new Date().setHours(10, 0)).addDays(4),
    start: setDate(9,0,4),
    end:   setDate(10,0,4),
    title: 'Doctor Appt.',
    content: '<i class="w-icon mdi mdi-stethoscope"></i>',
    class: 'health',
    schedule: 1
  },
  {
    //start: new Date(new Date().setHours(11, 30)).addDays(4),
    //end: new Date(new Date().setHours(12, 25)).addDays(4),
    start: setDate(11,30,4),
    end:   setDate(12,25,4),
    title: 'BK with Mark',
    content: '<i class="w-icon mdi mdi-food"></i>',
    class: 'leisure',
    schedule: 2
  },
  {
    //start: new Date(new Date().setHours(12, 30)).addDays(4),
    //end: new Date(new Date().setHours(14, 30)).addDays(4),
    start: setDate(12,30,4),
    end:   setDate(14,30,4),
    title: 'Movie Theater',
    content: '<i class="w-icon mdi mdi-ticket"></i>',
    class: 'leisure',
    schedule: 1
  },
  {
    //start: new Date(new Date().setHours(11, 30, 21, 0)).addDays(5),
    //end: new Date(new Date().setHours(12, 30, 23, 30)).addDays(5),
    start: setDate(11,30,5),
    end:   setDate(12,30,5),
    title: 'Movie Night',
    content: '<i class="w-icon mdi mdi-popcorn"></i>',
    class: 'leisure',
    schedule: 1
  },
  {
    //start: new Date(new Date().setHours(10, 0)).addDays(7),
    //end: new Date(new Date().setHours(11, 0)).addDays(7),
    start: setDate(10,0,7),
    end:   setDate(11,0,7),
    title: 'Doctor Appt.',
    content: '<i class="w-icon mdi mdi-stethoscope"></i>',
    class: 'health',
    schedule: 1
  }
];

const specialHours = {
  mon: { from: 9 * 60, to: 17 * 60, class: 'business-hours' },
  tue: { from: 9 * 60, to: 17 * 60, class: 'business-hours' },
  wed: [
    { from: 9 * 60, to: 12 * 60, class: 'business-hours' },
    { from: 14 * 60, to: 17 * 60, class: 'business-hours' }
  ],
  thu: { from: 9 * 60, to: 17 * 60, class: 'business-hours' },
  fri: { from: 9 * 60, to: 18 * 60, class: 'business-hours' }
}

const createEvent = ({ event, resolve }) => {
  resolve({
    ...event,
    title: 'New Event! 🎉'
  })
}

const vuecalRef = ref(null)



const prog_createEvent = () => {
  vuecalRef.value.view.createEvent({
    start:  setDate(11,0,1), 
    end:    setDate(13,0,1),
    title: 'prog New Event 🎉',
    class: 'none',
  })
}
const openDialog = ({ event }) => {
  console.log("event click");
  selectedEvent.value = event
  showDialog.value = true
}


</script>

<template>
<Base :title :code_block :md_mode :md_content>

<template v-slot:contents>
<!------------------------------------->
<button @click="prog_createEvent">Create Event</button>

<vue-cal
  :views="['day', 'days','week', 'month']"
  ref="vuecalRef"

  editable-events
  @event-create="createEvent"
  @event-click="openDialog"
  events-on-month-view
  all-day-events

  sm
  :time-from="8 * 60" :time-to="18 * 60" :time-step="30" 
  :special-hours="specialHours"

  :min-event-width="minEventWidth"
  :events="events">

</vue-cal>

<w-dialog
  v-if=" selectedEvent"
  v-model="showDialog"
  :title="selectedEvent.title"
  width="300">
  <w-flex align-center justify-end gap2>
    <w-icon class="grey">mdi mdi-calendar</w-icon>
    <!--
    <small>{{ selectedEvent.start.format() }}</small>
    -->
    <small>{{ fmt_yyyymmdd(selectedEvent.start) }}</small>
    <w-icon class="grey ml2">mdi mdi-clock-outline</w-icon>
    <!--
    <small>
      {{ selectedEvent.start.formatTime() }}
      - {{ selectedEvent.end.formatTime() }}
    </small>
    -->
    <small>
      {{ fmt_hhmm(selectedEvent.start) }}
      - {{ fmt_hhmm(selectedEvent.end) }}
    </small>
    
  </w-flex>
  <w-flex
    class="align-center justify-center title1 mt6 mb4"
    v-html="selectedEvent.content">
  </w-flex>
  <p>{{ selectedEvent.contentFull }}</p>
</w-dialog>
<!------------------------------------->
</template>


</Base>
</template>

<style >
.vuecal__event {color: #fff;border: 1px solid;}
.vuecal__event.leisure {background-color: #fd9c42d9;}
.vuecal__event.health {background-color: #57cea9cc;}
.vuecal__event.sport {background-color: #ff6666d9;}
.vuecal__event.lunch {
  background-color: repeating-linear-gradient(45deg, transparent 0 10px, #ffffff11 10px 20px);
  border: none;
}

.business-hours {background-color: #00daff21;}

</style>

