<template>
    <div v-if="type == 'btn'" class="btn" :class="[{'is-disable': disable}, {'btn--progress': startProgress}]">
        <span class="btn__text">{{ text }}</span>

        <span class="btn__progress" v-if="progress"></span>
    </div>

    <router-link v-else :to="link" class="btn">
        <span class="btn__text">{{ text }}</span>
    </router-link>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'btn'
        },
        text: String,
        link: String,
        disable: {
            type: Boolean,
            default: false
        },
        progress: {
            type: Boolean,
            default: false
        },
        startProgress: {
            type: Boolean,
            default: false
        }
    }
}
</script>
