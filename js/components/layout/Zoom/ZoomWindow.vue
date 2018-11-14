<template>
<transition>
    <div class="zoom-window" v-show="$zoom.showWindow && $mq === 'desktop'">
        <div class="zoom-window__wr">
            <div class="zoom-window__content">
                <div class="zoom-window__title">
                    <h2>{{ title }}</h2>
                </div>
                <div class="zoom-window__text">
                    <VuePerfectScrollbar ref="psZoom" class="cw-scroll" :settings="scrollSettings">
                        <div class="text-content" v-html="text"></div>
                    </VuePerfectScrollbar>
                </div>
                <div class="zoom-window__add">
                    <slot></slot>
                </div>

                <div class="zoom-window__actions">
                    <div class="zoom-window__action" v-if="showCartBtn">
                        <trial-button :data="data"></trial-button>
                    </div>

                    <div class="zoom-window__action" v-if="showCartBtn">
                        <cart-button :id="data.id" type="zoom"></cart-button>
                    </div>

                    <div class="zoom-window__action" v-if="showWasteBtn">
                        <waste-button :id="data.id"></waste-button>
                    </div>
                </div>
                <div class="zoom-window__back" @click="closeWindow">
                    <div class="back-btn">{{ backBtnText }}</div>
                </div>
            </div>
            <div class="zoom-window__preview">
                <img class="zoom-window__preview-img" :src="data.image.full.image + imgSize" :alt="data.image.full.alt">
            </div>
        </div>

        <div class="zoom-window__bg">
            <div class="zoom-window__bg-line"></div>
            <div class="zoom-window__bg-line"></div>
            <div class="zoom-window__bg-line"></div>
            <div class="zoom-window__bg-line"></div>
            <div class="zoom-window__bg-line"></div>
        </div>
    </div>
</transition>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
    components: {
        VuePerfectScrollbar
    },
    props: {
        data: {
            type: Object,
            default: {}
        },
        imgSize: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: ''
        },
        showCartBtn: {
            type: Boolean,
            default: true
        },
        showWasteBtn: {
            type: Boolean,
            default: false
        },
        backBtnText: {
            type: String,
            default: 'Назад'
        }
    },
    data() {
        return {
            scrollSettings: {
                maxScrollbarLength: 100,
                wheelSpeed: 0.8
            }
        }
    },
    mounted() {
        document.body.addEventListener('keyup', e => {
            if (e.keyCode === 27) {
                this.closeWindow()
            }
        })
    },
    // updated() {
    //     this.$refs.ps.update();
    // },
    methods: {
        closeWindow() {
            this.$zoom.displayWindow(false)
        }
    }
}
</script>
