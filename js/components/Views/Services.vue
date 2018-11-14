<template>
<div class="pc">
    <div class="pc-wr" v-show="!this.$formModal.showModal">
        <div class="pc-head">
            <div class="pc-breadcrumbs">

            </div>
            <div class="pc-title">
                <h1>Переработка пленки и&nbsp;полимерных изделий</h1>
            </div>
        </div>
        <div class="pc-body">
            <div class="pc-body-wr">
                <div class="pc-body-left">

                    <div class="pc-fixed-col">
                        <div class="pc-fixed-promo service-promo">
                            <promo value="10" measure="т" text="Мы принимаем<br/>
                            ПП / ПВД / ПНД / Стейч пленку<br/>
                            массой от 10 тонн" class="promo--big"></promo>
                        </div>

                        <div class="pc-fixed-btn">
                            <service-button></service-button>
                        </div>
                    </div>
                </div>
                <div class="pc-body-right">
                    <div class="pc-content text-content">
                        <p>Компания Grainatt предлагает вам воспользоваться услугой переработки старой пленочной упаковки и&nbsp;брака полимерных изделий. Ресайклинг полного цикла включает измельчение, мойку, капсулирование &laquo;дроблёнки&raquo; и&nbsp;выпуск
                            вторичных гранул. При производстве используется фильтрующая сетка П-56.</p>

                        <p>Мы&nbsp;принимаем на&nbsp;переработку пленочные материалы из&nbsp;ПВД, ПНД, стрейч и&nbsp;полипропилен (кроме полигонного сбора).</p>

                        <p>Многие производители полимерных изделий испытывают проблему с&nbsp;утилизацией упаковки&nbsp;&mdash; используется её&nbsp;много, и&nbsp;занимает она огромное пространство. Чтобы не&nbsp;загромождать склады, проходы и&nbsp;проезды
                            в&nbsp;цехах, накопившуюся пленку можно превратить во&nbsp;вторсырье.</p>

                        <p>В&nbsp;переработанном виде полимеры занимают как минимум в&nbsp;5&nbsp;раз меньший объем, могут использоваться как добавка к&nbsp;первичному сырью или для выпуска технических пленок. Отбракованную продукцию тоже можно измельчить
                            на&nbsp;профессиональных дробилках, а&nbsp;полученную массу пустить в&nbsp;новое производство. Ресайклинг полного цикла&nbsp;&mdash; это путь от&nbsp;загрязненной старой пленки до&nbsp;выгодной гранулы вторичного использования.
                            </p>

                        <p>Вторично созданные полимеры мы&nbsp;упакуем в&nbsp;новые мешки, уложим их&nbsp;на&nbsp;паллеты и&nbsp;отправим вам для дальнейшего использования. Мы&nbsp;располагаем мощным оборудованием, которое способно измельчить любые полимерные
                            материалы. </p>

                        <p>Мы&nbsp;принимаем на&nbsp;переработку отходы полимеров массой от&nbsp;10&nbsp;тонн. Услуга будет оказана в&nbsp;сроки, согласованные с&nbsp;заказчиком и&nbsp;графиком нашего основного производства.</p>

                        <p>Узнать больше об&nbsp;переработке полимеров, уточнить стоимость работ и&nbsp;согласовать сроки выполнения вы&nbsp;можете по&nbsp;телефону&nbsp;+7 (812) 600-62-46.</p>

                        <div class="service-mobile-btn" v-if="$mq !== 'desktop'">
                            <service-button></service-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <mobile-footer></mobile-footer>
    </div>

    <form-modal :service="true" :data="formModal"></form-modal>
</div>
</template>

<script>
export default {
    data() {
        return {
            formModal: {
                text: {
                    head: {
                        title: 'Заявка на&nbsp;измельчение полимерных изделий',
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
                    formName: 'service',
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
                    api: 'send/service'
                }
            }
        }
    },
    mounted() {
        this.$contentWindow.setView('content')
    }
}
</script>
