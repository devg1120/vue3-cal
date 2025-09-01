<script setup lang="ts">
import { VueCodeHighlighter } from 'vue-code-highlighter'
import 'vue-code-highlighter/dist/style.css'
import { VMarkdownView } from 'vue3-markdown'
import 'vue3-markdown/dist/vue3-markdown.css'

interface Props {
    title: String,
    code_block: String,
    md_mode:    String,
    md_content: String
}
const props = defineProps<Props>()

//const mdcontent = "## One of the world's most popular markdown editors"
//const md_mode = 'light'
//const md_mode = 'dark'

</script>

<template>
  <div>
    <h2>{{title}}</h2>
    <slot name="contents" />

    <!--
    <pre><code class="code-block">
       {{ code_block }}
    </code></pre>
    -->

    <VueCodeHighlighter :code="code_block" lang="js" title="vue" />

    <!--
    <slot name="desc" />
    -->

    <VMarkdownView
     :mode="md_mode"
     :content="md_content"
    ></VMarkdownView>

  </div>
</template>

<style scoped>

/*
pre {
  text-align: start;
}
*/
slot.vuecal__event {color: #fff;border: 1px solid;}
slot.vuecal__event.leisure {background-color: #fd9c42d9;}
slot.vuecal__event.health {background-color: #57cea9cc;}
slot.vuecal__event.sport {background-color: #ff6666d9;}
slot.vuecal__event.lunch {
  background-color: repeating-linear-gradient(45deg, transparent 0 10px, #ffffff11 10px 20px);
  border: none;
}
</style>
