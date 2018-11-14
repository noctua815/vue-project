<template lang="html">
    <div class="pc">
         <div class="pc-wr" v-if="$config.waste" v-show="!this.$formModal.showModal">
            <div class="pc-head" :class="{'pc-head--big': $mq !== 'desktop'}">
                <div class="pc-breadcrumbs"></div>
                <div class="pc-title">
                    <h2 class="pse-head">Закупка отходов</h2>
                </div>
            </div>

            <div class="pc-body">
                <div class="pc-body-wr">
                    <div class="pc-body-left">
                        <div class="pc-fixed-col">
                            <div class="pc-fixed-tabs">
                                <tab-triggers id="content-tabs" class="fixed">
                                    <tab-trigger name="Виды отходов" id="nomenclature" parent-id="content-tabs" :link="activeLink"></tab-trigger>
                                    <tab-trigger name="Описание" id="about" parent-id="content-tabs" link="/waste-types"></tab-trigger>
                                </tab-triggers>
                            </div>
                            <div class="pc-fixed-waste-nav">
                                <div class="type-nav">
                                    <div class="type-nav__item" v-for="(item, index) in $config.waste" :key="index">
                                        <router-link :to="item.link.original" class="type-nav__link is-active">
                                            {{ item.short_name }}
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pc-body-right">
                        <tab-panels id="content-tabs">
                            <tab-panel id="nomenclature">
                                <div class="waste" v-if="!loading">
                                    <div class="waste-title">
                                        <h2> {{ data.name }} </h2>
                                    </div>
                                    <div class="waste-list">
                                        <!-- Waste item -->
                                        <div class="waste-item" v-for="(item, index) in data.products" :key="index">
                                            <div class="waste-item__preview" v-if="$mq === 'desktop'">
                                                <div class="waste-item__thumb" v-if="item.image.preview">
                                                    <zoom-preview :src="item.image.preview.image + '_200-200'" :alt="item.image.preview.alt" @click.native="showZoom(index)" class="zoom-preview--big"></zoom-preview>
                                                </div>

                                                <div class="waste-item__thumb" v-else>
                                                    <zoom-preview src="/img/default-preview.png" :alt="item.name" :show-zoom="false"></zoom-preview>
                                                </div>
                                            </div>

                                            <div class="waste-item__info">
                                                <div class="waste-item__name">{{ item.name }}</div>
                                                <div class="waste-item__text" v-html="item.description"></div>

                                                <div class="waste-item__mobile-preview" v-if="$mq !== 'desktop'">
                                                    <div class="waste-item__thumb" v-if="item.image.preview">
                                                        <pc-preview :src="item.image.preview.image + '_1024-1024'" :alt="item.image.preview.alt"></pc-preview>
                                                    </div>
                                                    <div class="waste-item__thumb" v-else>
                                                        <pc-preview src="/img/default-preview.png" :alt="item.name" class="pc-preview--default"></pc-preview>
                                                    </div>
                                                </div>

                                                <div class="waste-item__add">
                                                    <div class="waste-item__price">
                                                        <div class="waste-item__price-text">Цена:</div>
                                                        <div class="waste-item__price-value">{{ item.price }}</div>
                                                    </div>

                                                    <div class="waste-item__btn">
                                                        <waste-button :id="item.id"></waste-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- END Waste item -->
                                    </div>
                                </div>
                            </tab-panel>

                            <tab-panel id="about"></tab-panel>
                        </tab-panels>

                         <div class="loader" v-if="loading"></div>
                    </div>
                </div>
            </div>

            <div v-if="zoomItem">
                <zoom-window :data="zoomItem"
                             :title="zoomItem.name"
                             :text="zoomItem.description"
                             :show-cart-btn="false"
                             :show-waste-btn="true"
                             imgSize="_700-1100">
                    <div class="zoom-window-waste">
                        <div class="waste-item__price">
                            <div class="waste-item__price-text">Цена:</div>
                            <div class="waste-item__price-value">{{ zoomItem.price }}</div>
                        </div>
                    </div>
                </zoom-window>
            </div>

            <mobile-footer></mobile-footer>
         </div>

          <form-modal :waste="this.$config.wasteId" :data="formModal"></form-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: null,
            loading: false,
            zoomItem: null,
            waste: null,
            activeLink: null,
            formModal: {
                text: {
                    head: {
                        title: 'Продать отходы',
                        info: 'Сообщите Ваши данные и&nbsp;в&nbsp;ближайщее время с&nbsp;Вами свяжутся наши менеджеры.'
                    },
                    message: {
                        success: {
                            title: 'Ваш заказ успешно оформлен!',
                            info: 'В ближайшее время с Вами свяжутся наши менеджеры'
                        },
                        error: {
                            title: 'Произошла ошибка',
                            info: 'Попробуйте повторить попытку позже'
                        }
                    }
                },
                form: {
                    formName: 'waste',
                    name: {
                        show: true,
                        text: 'Ваше имя',
                    },
                    lastName: {
                        show: false
                    },
                    phone: {
                        show: true,
                        text: 'Контактный телефон',
                    },
                    email: {
                        show: true,
                        text: 'Ваша почта',
                    },
                    post: {
                        show: false
                    },
                    org: {
                        show: true,
                        text: 'Название организации',
                    },
                    orgAddress: {
                        show: false
                    },
                    site: {
                        show: false
                    },
                    comment: {
                        show: true,
                        text: 'Оставить комментарий'
                    },
                    confirm: {
                        show: true
                    },
                    submit: {
                        name: 'Оформить'
                    },
                    api: 'send/waste'
                }
            }
        }
    },
    created() {
        this.loading = true
        this.fetchData()
    },
    mounted() {
        this.$contentWindow.setView('content')
    },
    watch: {
        '$route': function() {
            this.loading = true
            this.fetchData()
        }
    },
    methods: {
        fetchData() {
            let $this = this

            axios.get('/api' + this.$route.path)
                .then(response => {
                    this.data = response.data
                    this.activeLink = this.$config.waste[0].link.original
                    this.loading = false
                })
                .catch(e => {
                    this.$router.push({ path: '/error' })
                    console.log(e)
                })
        },
        showZoom(index) {
            this.zoomItem = this.data.products[index]
        }
    }
}
</script>
