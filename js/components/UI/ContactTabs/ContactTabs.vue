<template lang="html">
    <div class="menu-contacts">
        <div class="menu-contacts-tabs">
            <tab-triggers :id="id" class="tab-triggers--compact" :mobile="false">
                <tab-trigger name="Продажи" id="sale" :parent-id="id"></tab-trigger>
                <tab-trigger name="Закупки" id="purchase" :parent-id="id"></tab-trigger>
                <tab-trigger name="Контроль качества" id="quality-control" :parent-id="id"></tab-trigger>
                <tab-trigger name="Производство" id="production" :parent-id="id"></tab-trigger>
            </tab-triggers>
        </div>

        <div class="menu-contacts-panels">
            <tab-panels :id="id">
                <tab-panel id="sale">
                    <div class="contacts-section">
                        <div class="contacts-mobile-title" v-if="$mq !== 'desktop'">
                            <h2>Продажи</h2>
                        </div>
                        <div class="contacts-block">
                            <div class="contacts-title">
                                <div class="small-title">Телефон</div>
                            </div>
                            <div class="contacts-info">
                                <div class="contacts-info-row">
                                    <a class="link" href="tel:+7(921)931-63-63">+7 (921) 931-63-63</a>
                                </div>
                                <div class="contacts-info-row">
                                    <a class="link" href="tel:+7(812)600-62-46">+7 (812) 600-62-46</a>
                                </div>
                            </div>
                        </div>

                        <div class="contacts-block">
                            <div class="contacts-title">
                                <div class="small-title">Почта</div>
                            </div>
                            <div class="contacts-info">
                                <div class="contacts-info-row">
                                    <a class="link" href="mailto:sales@grainatt.com">sales@grainatt.com</a>
                                </div>
                            </div>
                        </div>

                        <div class="contacts-block">
                            <div class="contacts-title">
                                <div class="small-title">МЕССЕНДЖЕРЫ</div>
                            </div>
                            <div class="contacts-info">
                                <div class="messengers">
                                    <a href="whatsapp://send?phone=num" class="messengers-item messengers-item--whatsapp"></a>
                                    <a href="tg://resolve?domain=" class="messengers-item messengers-item--telegram"></a>
                                    <a href="viber://add?number=num" class="messengers-item messengers-item--viber"></a>
                                </div>
                            </div>
                        </div>

                        <div class="contacts-block">
                            <div class="contacts-title">
                                <div class="small-title">Адрес офиса</div>
                            </div>
                            <div class="contacts-info">
                                <div class="contacts-info-row">
                                    Санкт-Петербург, Заставская <br/>д.7, лит. А, оф 311
                                </div>
                            </div>
                        </div>
                    </div>
                </tab-panel>

                <tab-panel id="purchase">
                    <div class="contacts-section">
                        <div class="contacts-mobile-title" v-if="$mq !== 'desktop'">
                            <h2>Закупки</h2>
                        </div>
                        <div class="contacts-block">
                            <div class="contacts-title">
                                <div class="small-title">Телефон</div>
                            </div>
                            <div class="contacts-info">
                                <div class="contacts-info-row">
                                    <a class="link" href="tel:+7 (911) 999-75-15">+7 (911) 999-75-15</a>
                                </div>
                                <div class="contacts-info-row">
                                    <a class="link" href="tel:+7 (921) 858-08-76">+7 (921) 858-08-76</a>
                                </div>
                                <div class="contacts-info-row">
                                    <a class="link" href="tel:+7 (812) 600-62-43">+7 (812) 600-62-43</a>
                                </div>
                            </div>
                        </div>

                        <div class="contacts-block">
                            <div class="contacts-title">
                                <div class="small-title">Почта</div>
                            </div>
                            <div class="contacts-info">
                                <div class="contacts-info-row">
                                    <a class="link" href="mailto:snk@grainatt.com">snk@grainatt.com</a>
                                </div>
                                <div class="contacts-info-row">
                                    <a class="link" href="mailto:svk@grainatt.com ">svk@grainatt.com </a>
                                </div>
                            </div>
                        </div>

                        <div class="contacts-block">
                            <div class="contacts-title">
                                <div class="small-title">МЕССЕНДЖЕРЫ</div>
                            </div>
                            <div class="contacts-info">
                                <div class="messengers">
                                    <a href="whatsapp://send?phone=num" class="messengers-item messengers-item--whatsapp"></a>
                                    <a href="tg://resolve?domain=" class="messengers-item messengers-item--telegram"></a>
                                    <a href="viber://add?number=num" class="messengers-item messengers-item--viber"></a>
                                </div>
                            </div>
                        </div>

                        <div class="contacts-block">
                            <div class="contacts-title">
                                <div class="small-title">Адрес офиса</div>
                            </div>
                            <div class="contacts-info">
                                <div class="contacts-info-row">
                                    Санкт-Петербург, Заставская <br/>д.7, лит. А, оф 311
                                </div>
                            </div>
                        </div>
                    </div>
                </tab-panel>

                <tab-panel id="quality-control">
                    <div class="contacts-section">
                        <div class="contacts-mobile-title" v-if="$mq !== 'desktop'">
                            <h2>Контроль качества</h2>
                        </div>
                        <div class="contacts-block">
                            <div class="contacts-title">
                                <div class="small-title">Генеральный директор</div>
                            </div>
                            <div class="contacts-info">
                                <div class="contacts-info-row">
                                    Колмогоров Константин Юрьевич
                                </div>
                                <div class="contacts-info-row contacts-info-row--top">
                                    <a class="link" href="tel:+7 (931) 255-05-03">+7 (931) 255-05-03</a>
                                </div>
                            </div>
                        </div>

                        <div class="contacts-block">
                            <div class="contacts-title">
                                <div class="small-title">Адрес офиса</div>
                            </div>
                            <div class="contacts-info">
                                <div class="contacts-info-row">
                                    Санкт-Петербург, Заставская <br/>д.7, лит. А, оф 313
                                </div>
                            </div>
                        </div>

                        <div class="contacts-block">
                            <div class="contacts-title">
                                <div class="small-title">Почта</div>
                            </div>
                            <div class="contacts-info">
                                <div class="contacts-info-row">
                                    <a class="link" href="mailto:info@grainatt.com">info@grainatt.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </tab-panel>

                <tab-panel id="production">
                    <div class="contacts-section">
                        <div class="contacts-mobile-title" v-if="$mq !== 'desktop'">
                            <h2>Производство</h2>
                        </div>
                        <div class="contacts-block">
                            <div class="contacts-title">
                                <div class="small-title">Адрес производства</div>
                            </div>
                            <div class="contacts-info">
                                <div class="contacts-info-row">
                                    Санкт-Петербург, Грузовой проезд д.7
                                </div>
                            </div>
                        </div>
                    </div>
                </tab-panel>
            </tab-panels>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: {default: ''}
    }
}
</script>
