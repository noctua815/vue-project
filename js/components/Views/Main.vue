<template>
<div class="mp">
    <div class="mp-content">
        <div class="mp-tabs">
            <div class="mp-tabs-triggers">
                <tab-triggers id="mp-tabs">
                    <tab-trigger name="Производство" id="production" parent-id="mp-tabs" v-on:click.native="$header.displayTrialBtn(false)"></tab-trigger>
                    <tab-trigger name="Преимущества" id="advantages" parent-id="mp-tabs" v-on:click.native="$header.displayTrialBtn(true)"></tab-trigger>
                </tab-triggers>
            </div>

            <div class="mp-tabs-panels">
                <tab-panels id="mp-tabs">
                    <tab-panel id="production">
                        <div class="mp-prod">
                            <div class="mp-prod-title">
                                <h1>Гранулы, которые мы заслужили</h1>
                            </div>

                            <div class="mp-prod-text text-content">
                                <p>Мы&nbsp;создаем вторичные гранулы полипропилена, которые на&nbsp;96% идентичны по&nbsp;качеству новому сырью. Цена приятно доступна&nbsp;&mdash; вы&nbsp;сэкономите от&nbsp;25&nbsp;до&nbsp;50%. Возьмите наши гранулы для пробного производства&nbsp;&mdash; партию весом 50&nbsp;кг отдаем бесплатно.</p>
                            </div>
                            <div class="mp-prod-sub">
                                <div class="sub-title">Мы делаем мир чище!</div>
                            </div>
                            <div class="mp-prod-link">
                                <v-button link='/trial' text="Заказать пробную партию" type="link" class="btn--full"></v-button>
                            </div>
                        </div>
                    </tab-panel>

                    <tab-panel id="advantages" :mobile="false">
                        <div class="mp-pluses">
                            <div class="mp-plus">
                                <div class="mp-plus__img">
                                    <div class="plus-icon plus-icon-1"></div>
                                </div>
                                <div class="mp-plus__info">
                                    <div class="mp-plus__title">
                                    <div class="small-title">Высочайшее качество</div>
                                </div>
                                    <div class="mp-plus__text">
                                        <p>Наш продукт относится к&nbsp;высшему сорту. В&nbsp;производстве гранулы ведут себя стабильно, подходят для тонкой экструзии и&nbsp;литья. Качество мы&nbsp;подтвердили сертификатом ГОСТ&nbsp;Р (&#8470; РОСС RU.MO10.H00768, действителен до&nbsp;декабря 2020&nbsp;года).</p>
                                    </div>
                                </div>
                            </div>

                            <div class="mp-plus">
                                <div class="mp-plus__img">
                                    <div class="plus-icon plus-icon-2"></div>
                                </div>
                                <div class="mp-plus__info">
                                    <div class="mp-plus__title">
                                    <div class="small-title">Современные технологии</div>
                                </div>
                                    <div class="mp-plus__text">
                                        <p>Мы&nbsp;проводим строгий отбор материалов для переработки. Основные критерии&nbsp;&mdash; однородность, умеренная физическая загрязненность, отсутствие примесей серы.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="mp-plus">
                                <div class="mp-plus__img">
                                    <div class="plus-icon plus-icon-3"></div>
                                </div>
                                <div class="mp-plus__info">
                                    <div class="mp-plus__title">
                                    <div class="small-title">Гарантия</div>
                                </div>
                                    <div class="mp-plus__text">
                                        <p>Для транспортировки мы&nbsp;упаковываем гранулы в&nbsp;плотные фирменные мешки и&nbsp;дополнительно защищаем их&nbsp;стрейч-пленкой. Это исключает загрязнение, увлажнение и&nbsp;потери материала.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </tab-panel>
                </tab-panels>
            </div>
        </div>

        <div class="mp-products">
            <div class="mp-products-title">
                <h2>Наша продукция:</h2>
            </div>
            <div class="mp-products-nav">
                <router-link v-for="(link,index) in $config.categories" :to="link.link.original" :key="index" class="mp-products-link">
                    {{ link.name }}
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    mounted() {
        this.$header.displayTrialBtn(false)
        this.$contentWindow.setView('home')
    }
}
</script>
