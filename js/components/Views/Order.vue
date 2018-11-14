<template lang="html">
  <div class="pc pc--order">
         <div class="pc-wr" v-show="!this.$formModal.showModal">
            <div class="pc-head">
                <div class="pc-breadcrumbs"></div>
                <div class="pc-title">
                    <h1>Заявка <span v-if="$mq !== 'desktop'">({{ $config.orderLength }})</span></h1>
                </div>
            </div>
            <div class="pc-body">
                <transition name="opacity" mode="out-in">
                    <div class="pc-body-wr" v-if="$config.orderLength" key="order">
                        <div class="pc-body-left">
                            <div class="pc-fixed-col" v-if="$mq === 'desktop'">
                                <div class="order-counter">
                                    <div class="order-counter__title small-title small-title--light">Кол-во товаров:</div>
                                    <div class="order-counter__value">{{ $config.orderLength }}</div>
                                </div>

                                <div class="order-info small-title small-title--light">
                                    Вторичные гранулы упаковываются в&nbsp;фирменные мешки высокой плотности по&nbsp;25&nbsp;кг
                                </div>

                                <div class="order-send">
                                    <v-button link='/' text="Оформить" @click.native="showForm" :progress="true"></v-button>
                                </div>
                            </div>
                        </div>

                        <div class="pc-body-right">
                            <div class="order-items-wr" v-if="!loading">
                                <div class="order-items">
                                    <order-item v-for="(item, index) in data" :key="index" :data="item"></order-item>
                                </div>

                                <div class="order-mobile" v-if="$mq !== 'desktop'">
                                    <div class="order-mobile-send">
                                        <v-button link='/' text="Оформить" @click.native="showForm" :progress="true"></v-button>
                                    </div>

                                    <div class="order-mobile-promo">
                                        <promo value="25" text="Вторичные гранулы упаковываются в&nbsp;фирменные мешки высокой плотности по&nbsp;25&nbsp;кг" class="promo--big"></promo>
                                    </div>

                                    <div class="order-mobile-bag">
                                        <div class="mobile-bag" v-if="$mq !== 'desktop'">
                                            <div class="mobile-bag-img"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="loader loader--order" v-if="loading"></div>
                        </div>
                    </div>

                    <div class="pc-body-wr" v-else key="order-empty">
                        <div class="order-empty">
                            <div class="order-empty__text">
                                <p>На&nbsp;данный момент в&nbsp;вашей заявке нет товаров. <br/>Вы&nbsp;можете ознакомиться с&nbsp;нашей продукцией:</p>
                            </div>
                            <div class="order-empty__nav">
                                <div class="list-nav">
                                    <router-link v-for="(link, index) in $config.categories" :key="index" class="list-nav-item" :to="link.link.original" tag="div">
                                        <a class="list-nav-link" > {{ link.name }}</a>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <!-- TODO add loader -->
            <mobile-footer></mobile-footer>
         </div>

         <form-modal :orders="orders" :data="formModal"></form-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            data: {},
            orders: {},
            formModal: {
                text: {
                    head: {
                        title: 'Заявка',
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
                    formName: 'order',
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
                        name: 'Отправить'
                    },
                    api: 'send/order'
                }
            }
        }
    },
    created() {
        this.loading = true
        this.orders = this.getOrder();

        axios.post('/api/cart', {
                products: this.orders
            })
            .then(response => {
                if (response.data.status === 'ok')
                    this.data = response.data.products
                    this.loading = false
            })
            .catch(e => {
                console.log(e)
            })

    },
    mounted() {
        this.$contentWindow.setView('full')
    },
    methods: {
        showForm() {
            this.orders = this.getOrder();
            this.$formModal.displayModal(true);
        },
        getOrder() {
            let order = LS.get('order'),
                orderString = JSON.stringify(order.items);

            return orderString;
        }
    }
}
</script>
