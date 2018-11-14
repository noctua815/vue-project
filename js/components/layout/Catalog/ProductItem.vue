<template>
<div class="product-item" @click="selectItem">
    <div class="product-item__thumb">
        <div class="round-preview">
            <div class="round-preview__border"></div>
            <div class="round-preview__wr">
                <img class="round-preview__img" :src="imageSrc" :alt="imageAlt">
            </div>
        </div>
    </div>

    <div class="product-item__info">
        <div class="product-item__type" v-if="$mq === 'desktop'">{{ shortCategory }}</div>
        <div class="product-item__type" v-else>{{ category }}</div>
        <div class="product-item__name">{{ data.properties[0].value }}</div>
    </div>
    <router-link v-if="!select" :to="data.link.original" :key="data.link.original" class="product-item__link">{{ category + ' ' + data.properties[0].value }}</router-link>
</div>
</template>

<script>
export default {
    props: {
        data: Object,
        shortCategory: String,
        category: String,
        select: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        imageSrc() {
            return this.data.image.preview ? this.data.image.preview.image : '/img/default-preview.png'
        },
        imageAlt() {
            return this.data.image.preview ? this.data.image.preview.alt : this.category
        }
    },
    methods: {
        selectItem() {
            if (this.select) {
                this.$config.trial = this.data;
            }
        }
    }
}
</script>
