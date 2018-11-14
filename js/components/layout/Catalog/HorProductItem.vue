<template>
    <div class="hr-prod-item">
        <div class="hr-prod-item__thumb">
            <div class="round-preview">
                <div class="round-preview__border"></div>
                <div class="round-preview__wr">
                    <img class="round-preview__img" :src="data.image.preview.image" :alt="data.image.preview.alt">
                </div>
            </div>
        </div>

        <div class="hr-prod-item__info">
            <div class="hr-prod-item__name">{{ data.name }}</div>
            <div class="hr-prod-item__add">
                <div class="hr-prod-item__color">
                    {{  data.properties[0].value }}
                </div>
                <div class="hr-prod-item__measure">50кг</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: Object
    }
}
</script>
