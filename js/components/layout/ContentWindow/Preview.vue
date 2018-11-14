<template>
    <div class="pc-preview" v-if="$mq !== 'desktop'" :class="'pc-preview--' + indent">
        <img class="pc-preview__img" :src="src" :alt="alt">
    </div>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            default: ''
        },
        alt: {
            type: String,
            default: ''
        },
        indent: {
            type: String,
            default: 'normal'
        }
    }
}
</script>
