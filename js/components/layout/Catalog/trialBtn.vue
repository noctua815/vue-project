<template>
    <div class="trial-btn">
        <v-button link='/trial' text="Пробная партия" type="link" @click.native="selectItem"></v-button>
    </div>
</template>

<script>
export default {
    props: {
        data: Object
    },
    methods: {
        selectItem() {
            this.$config.trial = this.data;
        }
    }
}
</script>
