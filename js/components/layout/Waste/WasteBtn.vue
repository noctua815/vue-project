<template>
    <div class="trial-btn">
        <v-button text="Продать отходы" @click.native="selectItem"></v-button>
    </div>
</template>

<script>
export default {
    props: {
        id: Number
    },
    methods: {
        selectItem() {
            this.$config.wasteId = this.id
            this.$formModal.displayModal(true)
            this.$contentWindow.setView('full')
        }
    }
}
</script>
