<template lang="html">
    <div class="zoom-preview" @click="openWindow">
        <div class="zoom-preview__thumb">
            <div class="round-preview" :class="{'round-preview--no-hover': !showZoom}">
                <div class="round-preview__border"></div>
                <div class="round-preview__wr">
                    <img class="round-preview__img" :src="src" :alt="alt">
                </div>
            </div>
        </div>
        <div class="zoom-preview__btn" v-if="showZoom"></div>
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
        hoverImgSrc: {
            type: String,
            default: ''
        },
        showZoom: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        openWindow() {
            this.$zoom.displayWindow(true)
        }
    }
}
</script>
