<template>
    <div class="tab-trigger" @click="selectTab(id)" :class="{ 'is-active': isActive}" :id="parentId + '-' + id">
        <router-link :to="link" v-if="link">{{ name }}</router-link>
        <span v-else>{{ name }}</span>
        
        <slot />
    </div>
</template>

<script>
import { bus } from '../../config/bus.js'

    export default {
        props: {
            id: { default: null },
            name: { required: true },
            parentId: {default: ''},
            link: {required: false}
        },
        data() {
            return {
                isActive: false,
                isVisible: true
            }
        },
        methods: {
            selectTab(selectedId) {
                bus.$emit(`tabTriggered-${this.parentId}`, selectedId);
            }
        }
    };
</script>
