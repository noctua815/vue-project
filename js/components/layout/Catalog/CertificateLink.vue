<template>
    <a class="small-link" :href="link" target="_blank">Сертификат качества</a>
</template>

<script>
export default {
    props: {
        link: {
            type: String,
            default: '/sert.pdf'
        }
    }
}
</script>
