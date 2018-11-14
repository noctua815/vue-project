<template>
    <div class="copyright">
        &copy;&nbsp;Grainatt, {{ fullYear }}
    </div>
</template>

<script>
export default {
    computed: {
        fullYear: function() {
            return new Date().getFullYear()
        }
    }
}
</script>
