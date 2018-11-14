<template>
<div class="cw" :class="viewTypeClass">
    <div class="cw-wr">
        <div class="cw-content" ref="content">
            <!-- <breadcrumb></breadcrumb> -->
            <div class="cw-content-wr">
                <VuePerfectScrollbar ref="ps" class="cw-scroll" :settings="scrollSettings" @ps-scroll-y="scrollHandler">
                    <slot/>
                </VuePerfectScrollbar>
            </div>
        </div>

        <div class="cw-menu" :class="{'menu-opened': $menu.showMenu}">
            <main-menu></main-menu>
        </div>
    </div>

    <div class="cw-bg">
        <div class="cw-bg-line"></div>
        <div class="cw-bg-line"></div>
        <div class="cw-bg-line"></div>
        <div class="cw-bg-line"></div>
        <div class="cw-bg-line"></div>
        <div class="cw-bg-line"></div>
    </div>
</div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
    components: {
        VuePerfectScrollbar
    },
    data() {
        return {
            scrollSettings: {
                maxScrollbarLength: 100,
                wheelSpeed: 0.8
            },
            fixedCol: null
        }
    },
    updated() {
        this.$refs.ps.$el.scrollTop = 0;
        this.$refs.ps.update();
        this.fixedCol = document.querySelector('.pc-fixed-col');

        if (!this.fixedCol) {
            let i = 0;
            let loader = setInterval(() => {
                if (this.fixedCol || i >= 5) {
                    this.fixedCol = document.querySelector('.pc-fixed-col');
                    clearInterval(loader);
                }
                i++;
            }, 500);
        }
    },
    computed: {
        viewTypeClass() {
            return 'cw--' + this.$contentWindow.viewType
        }
    },
    methods: {
        scrollHandler(event) {
            if (!this.fixedCol) return

            let isFixed = this.fixedCol.classList.contains('is-fixed');

            if (this.$refs.ps.$el.scrollTop >= 60) {
                if (!isFixed) {
                    let bound = this.fixedCol.getBoundingClientRect();
                    this.fixedCol.style.top = `${bound.top / window.innerHeight * 100}vh`
                    this.fixedCol.style.left = `${bound.left / window.innerWidth * 100}vw`
                    this.fixedCol.classList.add('is-fixed')
                }
            } else if (isFixed) {
                this.fixedCol.style.top = this.fixedCol.style.left = '';
                this.fixedCol.classList.remove('is-fixed')
            }
        }
    }
}
</script>
