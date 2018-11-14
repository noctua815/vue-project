<template>
<div class="droplist" :class="{'is-opened': open}">
    <div class="droplist__head" @click="open = !open">
        <div class="droplist__head-text">{{ name }}</div>
    </div>
    <div class="droplist__body"  v-show="open">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            open: false
        }
    }
}
</script>
