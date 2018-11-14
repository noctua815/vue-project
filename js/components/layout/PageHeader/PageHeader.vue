<template>
<header class="header">
    <div class="header__wr">
        <div class="header__logo">
            <router-link class="logo" to="/"></router-link>
        </div>

        <div class="header__links" v-if="$mq === 'desktop'">
            <div class="header__link">
                <a href="#cashmyvisit" class="link">Обратный звонок</a>
            </div>

            <transition name="opacity">
                <div class="header__link" v-if="$header.showTrialBtn">
                    <router-link class="link" to="/trial" @click.native="$formModal.displayModal(false)">Заказать пробную партию</router-link>
                </div>
            </transition>
        </div>

        <div class="header__menu">
            <transition name="opacity">
                <div class="call-block" v-if="$mq === 'desktop' && show">
                    <div class="call-block__info">
                        Санкт-Петербург
                    </div>
                    <div class="call-block__link">
                        <a class="link" :href="'tel:' + phone">{{ phone }}</a>
                    </div>
                </div>
            </transition>

            <div class="menu-btn" :class="{ 'is-opened' : $menu.showMenu }" @click="toggleOpen">
                <div class="menu-btn__wr">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</header>
</template>

<script>
export default {
    props: {
        showTrialBtn: {
            type: Boolean,
            default: true
        },
    },
    data() {
        return {
            phone: '+7 (812) 600-62-46',
            phones: ['+7 (812) 600-62-46', '+7 (812) 600-62-43'],
            show: false,
            lastTrialBtnStatus: false
        }
    },
    watch: {
        $route: function(newRoute, oldRoute) {
            this.checkPhoneNumber()
        }
    },
    mounted() {
        this.checkPhoneNumber()
    },
    methods: {
        toggleOpen() {
            if (this.$menu.showMenu) {
                this.$contentWindow.setView(this.$contentWindow.beforeMenuOpenType);
                this.$contentWindow.viewType = this.$contentWindow.beforeMenuOpenType;
                this.$contentWindow.beforeMenuOpenType = '';
                this.$header.showTrialBtn = this.lastTrialBtnStatus
                this.lastTrialBtnStatus = false
            } else {
                this.$contentWindow.beforeMenuOpenType = this.$contentWindow.viewType;
                this.$contentWindow.setView('menu');
                this.lastTrialBtnStatus = this.$header.showTrialBtn
                this.$header.showTrialBtn = true
            }

            this.$menu.showMenu = !this.$menu.showMenu
        },
        checkPhoneNumber() {
            let path = this.$route.path;

            if (path.indexOf('/products') >= 0 || path.indexOf('catalog-')  >= 0) {
                this.show = true
                this.phone = this.phones[0]
            } else if (path.indexOf('/waste-types') >= 0) {
                this.show = true
                this.phone = this.phones[1]
            } else {
                this.show = false
            }
        }
    }
}
</script>
