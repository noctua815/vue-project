<template>
<div class="ep">
    <div class="ep__wr">
        <div class="ep__number">404</div>
        <div class="ep__text">Страница не&nbsp;найдена</div>
        <div class="ep__product-btn">
            <v-button link='/products' text="Перейти к продукции" type="link" class="btn--full"></v-button>
        </div>
        <div class="ep__waste-link" v-if="$config.waste">
            <router-link class="border-link" :to="$config.waste[0].link.original">
                Сдать отходы
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
export default {
    mounted() {
        this.$contentWindow.setView('404')
    }
}
</script>
