<template>
<div class="news-item" :class="{'news-item--date': data.date_public}">
    <div class="news-item__thumb">
        <div class="round-preview">
            <div class="round-preview__border"></div>
            <div class="round-preview__wr">
                <img class="round-preview__img" :src="imageSrc" :alt="imageAlt">
            </div>
        </div>
    </div>

    <div class="news-item__info">
        <div class="news-item__name">{{ data.name }}</div>
        <div class="news-item__descr" v-if="data.date_public">{{ data.date_public }}</div>
    </div>
    <router-link :to="data.link.original" :key="data.link.original" class="news-item__link">{{ data.name }}</router-link>
</div>
</template>

<script>
export default {
    props: {
        data: Object
    },
    computed: {
        imageSrc() {
            return this.data.image.preview ? this.data.image.preview.image : '/img/default-preview.png'
        },
        imageAlt() {
            return this.data.image.preview ? this.data.image.preview.alt : this.name
        }
    }
}
</script>
