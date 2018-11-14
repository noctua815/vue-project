<template lang="html">
    <div class="pc">
         <div class="pc-wr" v-if="!loading" v-show="!this.$formModal.showModal">
            <div class="pc-head">
                <div class="pc-breadcrumbs"></div>
                <div class="pc-title">
                    <h2 class="pse-head">Акции и новости</h2>
                </div>
            </div>
            <div class="pc-body">
                <div class="pc-body-wr">
                    <div class="pc-body-left">
                        <div class="pc-fixed-col">
                            <!-- Tabs -->
                            <div class="pc-fixed-tabs">
                                <tab-triggers id="content-tabs" class="fixed">
                                    <tab-trigger name="Акции" id="promotions" parent-id="content-tabs" link="/promotions"></tab-trigger>
                                    <tab-trigger name="Новости" id="news" parent-id="content-tabs" link="/news"></tab-trigger>
                                </tab-triggers>
                            </div>
                            <!-- END Tabs -->

                            <!-- Zoom -->
                            <div class="pc-fixed-zoom" v-if="$mq === 'desktop'">
                                <zoom-preview :src="data.image.preview.image" :alt="data.image.preview.alt"></zoom-preview>
                            </div>
                            <!-- END Zoom -->

                            <!-- Buttons -->
                            <div class="pc-fixed-btn" v-if="$mq === 'desktop'">
                                <promo-button :id="data.id"></promo-button>
                            </div>
                            <!-- END Buttons -->
                        </div>
                    </div>

                    <div class="pc-body-right">
                        <tab-panels id="content-tabs">
                            <tab-panel id="promotions">
                                <div class="news-content">
                                    <div class="news-content__title pse-subhead">
                                        <h1>{{ data.name }}</h1>
                                    </div>

                                    <!-- Mobile preview -->
                                    <div class="news-content__mobile-preview" v-if="$mq !== 'desktop' && data.image.full">
                                        <div class="pc-fixed-preview">
                                            <pc-preview :src="data.image.full.image" :alt="data.image.full.alt" indent="big"></pc-preview>
                                        </div>
                                    </div>
                                    <!-- END Mobile preview -->

                                    <div class="news-content__descr text-content" v-html="data.description"></div>
                                    <div class="news-content__mobile-btn" v-if="$mq !== 'desktop'">
                                        <promo-button :id="data.id"></promo-button>
                                    </div>
                                </div>
                            </tab-panel>

                            <tab-panel id="news" :mobile="false"></tab-panel>
                        </tab-panels>
                    </div>
                </div>
            </div>

            <mobile-footer></mobile-footer>

            <zoom-window :data="data"
                         :title="data.name"
                         :text="data.description"
                         :show-cart-btn="false"
                         class="zoom-window--big-text"></zoom-window>
         </div>

        <div class="loader" v-if="loading"></div>
        <form-modal :promo="this.$config.promoId" :data="formModal"></form-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            data: null,
            formModal: {
                text: {
                    head: {
                        title: 'Заявка на акцию',
                        info: 'Сообщите Ваши данные и&nbsp;мы&nbsp;проинформируем Вас о&nbsp;ближайших акциях.'
                    },
                    message: {
                        success: {
                            title: 'Ваша заявка успешно отправлена!',
                            info: 'В ближайшее время с Вами свяжутся наши менеджеры'
                        },
                        error: {
                            title: 'Произошла ошибка',
                            info: 'Попробуйте повторить попытку позже'
                        }
                    }
                },
                form: {
                    formName: 'promotion',
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
                        show: false
                    },
                    confirm: {
                        show: true
                    },
                    submit: {
                        name: 'Заказать партию'
                    },
                    api: 'send/promo'
                }
            }
        }
    },
    created() {
        this.fetchData();
    },
    mounted() {
        this.$contentWindow.setView('content')
    },
    methods: {
        fetchData() {
            this.loading = true

            axios.get('/api' + this.$route.path)
                .then(response => {
                    this.data = response.data;
                    this.loading = false;
                })
                .catch(e => {
                    this.$router.push({ path: '/error' })
                    console.log(e)
                })
        }
    }
}
</script>
