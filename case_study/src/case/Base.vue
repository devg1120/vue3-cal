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
</style>
