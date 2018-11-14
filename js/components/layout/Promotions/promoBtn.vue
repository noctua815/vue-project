<template>
    <div class="promo-btn">
        <v-button text="Оставить заявку на акцию" @click.native="selectItem"></v-button>
    </div>
</template>

<script>
export default {
    props: {
        id: Number
    },
    methods: {
        selectItem() {
            this.$config.promoId = this.id
            this.$formModal.displayModal(true)
            this.$contentWindow.setView('full')
        }
    }
}
</script>
