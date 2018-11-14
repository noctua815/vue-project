<template>
<div class="pc">
    <div class="pc-wr">
        <div class="pc-head">
            <div class="pc-breadcrumbs">

            </div>
            <div class="pc-title">
                <h1>Упаковка</h1>
            </div>
        </div>
        <div class="pc-body">
            <div class="pc-body-wr">
                <div class="pc-body-left" v-if="$mq === 'desktop'">
                    <div class="pc-fixed-col">
                        <div class="pc-fixed-bag"></div>
                    </div>
                </div>
                <div class="pc-body-right">
                    <div class="pc-content text-content">
                        <p>Мы&nbsp;трепетно относимся к&nbsp;своей продукции и&nbsp;поэтому учли все детали, включая упаковку. Поскольку гранулы Grainatt отличаются высокой степенью чистоты, то&nbsp;и&nbsp;защита их&nbsp;при транспортировке и&nbsp;хранении&nbsp;&mdash; важный для нас аспект.</p>
                        <p>Мешок стандартного размера вмещает 25&nbsp;кг продукта&nbsp;&mdash; это удобно даже для ручной погрузки. Надежная прошивка герметично закрывает тару, а&nbsp;дополнительная обмотка стрейч-пленкой обеспечивает дополнительную защиту от&nbsp;грязи, влаги и&nbsp;пыли.</p>
                        <p>Наш фирменный мешок разработан таким образом, чтобы на&nbsp;любом складе он&nbsp;был заметен со&nbsp;всех ракурсов. Две полосы и&nbsp;логотип зеленого цвета хорошо видны, и&nbsp;сразу понятно, что в&nbsp;них находится сырье Grainatt.</p>
                    </div>

                    <div class="mobile-bag" v-if="$mq !== 'desktop'">
                        <div class="mobile-bag-img"></div>
                    </div>
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
