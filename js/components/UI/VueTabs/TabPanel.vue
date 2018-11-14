<template>
<div v-show="isActive" class="tab-panel">
    <slot />
</div>
</template>

<script>
import {
    debounce
} from "../../helpers/debounce"

export default {
    props: {
        id: {
            default: null
        },
        mobile: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isActive: false,
            isVisible: true
        }
    },
    created() {
        this.checkVisibility();
    },
    mounted() {
        window.addEventListener('resize', () => debounce(this.checkVisibility(), 300));
    },
    methods: {
        checkVisibility() {
            if (this.$mq !== 'desktop' && this.mobile) {
                this.isActive = true;
            }
        }
    }
}
</script>
