<template>
<div class="tab-panels">
    <div class="tab-panels-wr">
        <slot />
    </div>
</div>
</template>

<script>
export default {
    props: {
        id: {
            default: null
        }
    },
    data() {
        return {
            tabPannels: [],
            type: 'panels'
        }
    },
    created() {
        this.tabPannels = this.$children;
    }
};
</script>
