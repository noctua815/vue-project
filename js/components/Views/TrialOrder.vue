<template lang="html">
  <div class="pc pc--order">
         <div class="pc-wr" v-show="!this.$formModal.showModal">
            <div class="pc-head">
                <div class="pc-breadcrumbs"></div>
                <div class="pc-title">
                    <h1>Заказать пробную партию</h1>
                </div>
            </div>
            <div class="pc-body">
                <div class="pc-body-wr">
                    <div class="pc-body-left">
                        <div class="pc-fixed-col">
                            <div class="order-promo">
                                <promo value="50" class="promo--no-left"></promo>
                            </div>
                        </div>
                    </div>

                    <div class="pc-body-right">
                        <div class="trial-order" v-if="!loading">
                            <div class="trial-order-list" v-if="data">
                                <div class="items-list" v-for="(category, index) in data" :key="index">
                                    <product-item v-for="(item, index) in category.products" :key="index" :data="item" :category="category.short_name" :select="true" @click.native="selectItem" :data-id="item.id" :data-api="item.link.api"></product-item>
                                </div>
                            </div>
                        </div>

                        <div class="loader" v-if="loading"></div>
                    </div>
                </div>
            </div>

            <mobile-footer></mobile-footer>
         </div>

         <form-modal :trial="trial" :data="formModal"></form-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [],
            trial: true,
            formModal: {
                text: {
                    head: {
                        title: 'Заказать пробную партию',
                        info: 'Сообщите Ваши данные и&nbsp;в&nbsp;ближайщее время с&nbsp;Вами свяжутся наши менеджеры.'
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
                    formName: 'trial',
                    name: {
                        show: true,
                        text: 'Имя',
                    },
                    lastName: {
                        show: true,
                        text: 'Фамилия',
                    },
                    phone: {
                        show: true,
                        text: 'Рабочий телефон',
                    },
                    email: {
                        show: true,
                        text: 'Рабочая почта',
                    },
                    post: {
                        show: true,
                        text: 'Должность',
                    },
                    org: {
                        show: true,
                        text: 'Название организации',
                    },
                    orgAddress: {
                        show: true,
                        text: 'Адрес организации'
                    },
                    site: {
                        show: true,
                        text: 'Сайт'
                    },
                    comment: {
                        show: false
                    },
                    confirm: {
                        show: true
                    },
                    submit: {
                        name: 'Отправить'
                    },
                    api: 'send/trial'
                }
            },
            loading: true
        }
    },
    created() {
        if (this.$config.trial) {
            this.$formModal.displayModal(true);
        } else {
            this.loading = true
            this.fetchCategories()
        }
    },
    mounted() {
        this.$contentWindow.setView('full')
    },
    methods: {
        fetchCategories() {
            let categories = [];

            axios.get('/api/products')
                .then(response => {
                    response.data.forEach(function(item) {
                        let category = {
                            link: item.link.api,
                            short_name: item.short_name
                        }

                        categories.push(category)
                    });

                    _(categories).reverse().value()
                    this.fetchData(categories)
                })
                .catch(e => {
                    console.log(e)
                })
        },
        fetchData(categories) {
            categories.forEach((item) => {
                axios.get(item.link)
                    .then(response => {
                        let category = {
                            products: response.data.products,
                            short_name: item.short_name
                        }

                        this.loading = false
                        this.data.push(category)
                    })
                    .catch(e => {
                        console.log(e)
                    })
            });
        },
        selectItem(event) {
            this.$formModal.displayModal(true);
        }
    },
    beforeRouteLeave(to, from, next) {
        this.$config.trial = null
        next();
    }
}
</script>
