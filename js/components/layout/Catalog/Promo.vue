<template>
<div class="promo">
    <div class="promo__big-text">
        <div class="promo__value">{{ value }}</div>
        <div class="promo__measure">{{ measure }}</div>
    </div>
    <div class="promo__text" v-html="text"></div>
</div>
</template>

<script>
export default {
    props: {
        value: String,
        measure: {
            type: String,
            default: 'кг'
        },
        text: {
            type: String,
            default: 'Возьмите 50&nbsp;кг материала на&nbsp;пробу бесплатно и&nbsp;убедитесь в&nbsp;его качестве'
        }
    }
}
</script>
