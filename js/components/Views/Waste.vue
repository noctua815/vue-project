<template lang="html">
    <div class="pc">
         <div class="pc-wr">
            <div class="pc-head" :class="{'pc-head--big': $mq !== 'desktop'}">
                <div class="pc-breadcrumbs">

                </div>
                <div class="pc-title">
                    <h1>Закупка отходов</h1>
                </div>
            </div>
            <div class="pc-body">
                <div class="pc-body-wr">
                    <div class="pc-body-left">
                        <div class="pc-fixed-col waste-tabs">
                            <div class="pc-fixed-tabs" v-if="$config.waste">
                                <tab-triggers id="content-tabs" :active-tab="1" class="fixed">
                                    <tab-trigger name="Виды отходов" id="nomenclature" parent-id="content-tabs" :link="$config.waste[0].link.original"></tab-trigger>
                                    <tab-trigger name="Описание" id="about" parent-id="content-tabs" link="/waste-types"></tab-trigger>
                                </tab-triggers>
                            </div>
                        </div>
                    </div>

                    <div class="pc-body-right">
                        <tab-panels id="content-tabs">
                            <tab-panel id="nomenclature"></tab-panel>

                            <tab-panel id="about">
                                <div class="text-content">
                                    <p>На&nbsp;вашем предприятии используется много упаковки? Вы&nbsp;можете выгодно продать эти отходы нам, решив проблему вывоза и&nbsp;утилизации полимеров.</p>

                                    <h2>Прием отработанной стрейч-пленки и&nbsp;других упаковочных отходов</h2>
                                    <p>Мы&nbsp;покупаем б/у упаковку и&nbsp;тару из&nbsp;ПВД, ПНД и&nbsp;полипропилена. Эти отходы подвергаются переработке и&nbsp;становятся новым сырьем для выпуска изделий из&nbsp;полимеров.</p>
                                    <p>Используя наше предложение, промышленные предприятия могут вернуть в&nbsp;оборот затраченные средства и&nbsp;сократить расходы на&nbsp;вывоз и&nbsp;утилизацию отходов.</p>

                                    <p>Вы можете продать следующие отходы:</p>
                                    <ul>
                                        <li>стрейч-пленку,</li>
                                        <li>биг-бэги 1-стропные, 2-стропные и&nbsp;4-стропные,</li>
                                        <li>полипропиленовые мешки из-под пищевых продуктов, удобрений, стройматериалов (в&nbsp;том числе с&nbsp;печатью),</li>
                                        <li>пологи полипропиленовые ж/д,</li>
                                        <li>прозрачные мешки и&nbsp;пленки из&nbsp;ПВД и&nbsp;ПНД.</li>
                                    </ul>

                                    <h2>Наши цены на&nbsp;прием отходов</h2>
                                    <p>Стоимость отработанной упаковки бывает разной, потому что ее&nbsp;качественные показатели влияют на&nbsp;сложность переработки. Наши закупочные цены выше, чем в&nbsp;среднем по&nbsp;рынку&nbsp;&mdash; до&nbsp;30&nbsp;рублей за&nbsp;1&nbsp;кг (включая НДС).</p>
                                    <p>Сдать вторсырье, подходящее для переработки, вы&nbsp;можете навалом и&nbsp;в&nbsp;спрессованном виде. Мы&nbsp;оцениваем каждую партию индивидуально&nbsp;&mdash; важное значение имеют объемы, загрязненность, влажность, необходимость сортировки.</p>
                                    <p>В&nbsp;качестве бонуса предлагаем бесплатный вывоз крупных партий отходов с&nbsp;вашей площадки:</p>

                                    <ul>
                                        <li>в&nbsp;СПб вы&nbsp;можете продать нам стрейч-пленки, материалы из&nbsp;ПНД и&nbsp;ПВД, полипропилен объемом от&nbsp;300&nbsp;кг.;</li>
                                        <li>в&nbsp;регионах России закупаем материалы под вторсырье массой не&nbsp;менее 3&nbsp;тонн.</li>
                                    </ul>

                                    <p>Регулярность вывоза будет оговорена при заключении договора.</p>

                                    <h2>Зачем сдавать вторсырье в&nbsp;переработку?</h2>
                                    <p>Огромные объемы пленки и&nbsp;пластика, используемые в&nbsp;производстве, могут и&nbsp;должны получить вторую жизнь. Это важно и&nbsp;для бизнеса, и&nbsp;для экологии: оборот вторсырья снижает потребление природных ресурсов, а&nbsp;производство новой упаковки становится дешевле.</p>
                                    <p>Бессистемная утилизация пленок, мешков, пластика и&nbsp;полипропиленовых изделий наносит урон природе. Загрязнены огромные полигоны земли, реки, моря и&nbsp;океаны, а&nbsp;ведь всего 50&nbsp;лет назад планета не&nbsp;задыхалась от&nbsp;пластика.</p>
                                    <p>Внесите свой вклад в&nbsp;сохранение экологии, не&nbsp;игнорируйте необходимость сдать отходы в&nbsp;переработку&nbsp;&mdash; это проще и&nbsp;выгоднее, чем кажется.</p>
                                    <p>Мы&nbsp;делаем мир чище! Присоединяйтесь к&nbsp;нам!</p>
                                </div>
                            </tab-panel>
                        </tab-panels>
                    </div>
                </div>
            </div>

            <mobile-footer></mobile-footer>
         </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$contentWindow.setView('content')
    }
}
</script>
