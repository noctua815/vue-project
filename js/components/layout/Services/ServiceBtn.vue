<template>
    <div class="service-btn">
        <v-button text="Оставить заявку" @click.native="selectItem"></v-button>
    </div>
</template>

<script>
export default {
    methods: {
        selectItem() {
            this.$formModal.displayModal(true)
            this.$contentWindow.setView('full')
        }
    }
}
</script>
