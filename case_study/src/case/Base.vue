<script setup lang="ts">
import { VueCodeHighlighter } from 'vue-code-highlighter'
import 'vue-code-highlighter/dist/style.css'

interface Props {
    title: String,
    code_block: String
}
const props = defineProps<Props>()

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

    <slot name="desc" />
  </div>
</template>

<style @scoped>
/*
pre {
  text-align: start;
}
*/
</style>
