<template lang="html">
    <div class="pc">
         <div class="pc-wr" v-if="!loading">
            <div class="pc-head">
                <div class="pc-breadcrumbs"></div>
                <div class="pc-title">
                    <h1>{{ data.name }}</h1>
                </div>
            </div>
            <div class="pc-body">
                <div class="pc-body-wr">
                    <div class="pc-body-left">
                        <div class="pc-fixed-col">
                            <!-- Tabs -->
                            <div class="pc-fixed-tabs">
                                <tab-triggers id="content-tabs" :mobile="false">
                                    <tab-trigger name="Описание" id="about" parent-id="content-tabs" @click.native="showTypes=false"></tab-trigger>
                                    <tab-trigger name="Подходит для" id="type" parent-id="content-tabs" @click.native="showTypes=true"></tab-trigger>
                                </tab-triggers>
                            </div>
                            <!-- END Tabs -->

                            <!-- Zoom -->
                            <div class="pc-fixed-zoom" v-if="$mq === 'desktop'">
                                <zoom-preview :src="data.image.preview.image" :alt="data.image.preview.alt"></zoom-preview>
                            </div>
                            <!-- END Zoom -->

                            <!-- Mobile preview -->
                            <div class="pc-fixed-preview" v-else>
                                <pc-preview :src="data.image.full.image" :alt="data.image.full.alt" indent="middle"></pc-preview>
                            </div>
                            <!-- END Mobile preview -->

                            <!-- Buttons -->
                            <div class="pc-fixed-btn" v-show="!showTypes">
                                <trial-button :data="data"></trial-button>

                                <div class="pc-fixed-btn-order">
                                    <cart-button :id="data.id" type="main"></cart-button>
                                </div>
                            </div>
                            <!-- END Buttons -->

                            <!-- Mobile certificate -->
                            <div class="pc-fixed-certf" v-if="$mq !== 'desktop'">
                                <certf-link></certf-link>
                            </div>
                            <!-- END Mobile certificate -->

                            <!-- Production types -->
                            <div class="pc-fixed-types" v-if="showTypes && data.production_types.length">
                                <div class="pc-fixed-types-title small-title">Тип производства</div>

                                <div class="pc-fixed-types-list">
                                    <div class="pc-fixed-types-item" v-for="(item, index) in data.production_types" :key="index">
                                        {{ item.production_name }}
                                    </div>
                                </div>
                            </div>
                            <!-- END Production types -->
                        </div>
                    </div>

                    <div class="pc-body-right">
                        <tab-panels id="content-tabs">
                            <tab-panel id="about">
                                <div class="product">
                                    <div class="product-left">
                                        <!-- Mobile droplists -->
                                        <div class="product-mobile-droplist" v-if="data.production_types || data.product_types" v-show="$mq !== 'desktop'">
                                            <droplist name="Тип производства" v-if="data.production_types">
                                                <div class="droplist-item" v-for="(item, index) in data.production_types" :key="index">
                                                    {{ item.production_name }}
                                                </div>
                                            </droplist>

                                            <droplist name="Тип продукции" v-if="data.product_types">
                                                <div class="droplist-item" v-for="(item, index) in data.product_types" :key="index">
                                                    {{ item.product_types_name }}
                                                </div>
                                            </droplist>
                                        </div>
                                        <!-- END Mobile droplists -->

                                        <div class="pc-mobile-title" v-if="$mq !== 'desktop'">
                                            <div class="small-title small-title--light">Описание</div>
                                        </div>
                                        <div class="product-text">
                                            <div class="text-content" v-html="data.description"></div>
                                        </div>

                                        <!-- Похожие продукты -->
                                        <div class="product-similar" v-if="data.relative_products.length > 0">
                                            <div class="product-similar-title">
                                                <h2 class="small-title small-title--light">Похожие гранулы</h2>
                                            </div>
                                            <div class="product-similar-list">
                                                <div class="items-list items-list--small">
                                                    <product-item v-for="(item, index) in data.relative_products" :key="index" :data="item" :category="data.short_name" class="product-item--small"></product-item>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- END Похожие продукты -->
                                    </div>
                                    <div class="product-right">
                                        <div class="product-certificate" v-if="$mq === 'desktop'">
                                            <certf-link></certf-link>
                                        </div>

                                        <!-- Свойства -->
                                        <div class="product-params" v-if="data.properties.length > 0">
                                            <div v-for="(item,index) in data.properties" :key="index" class="product-params-item">
                                                <div class="product-params-name">{{ item.label }}</div>
                                                <div class="product-params-value">{{ item.value }}</div>
                                            </div>
                                        </div>
                                        <!-- END Свойства -->
                                    </div>
                                </div>
                            </tab-panel>

                            <tab-panel id="type" :mobile="false">
                                <div class="types-list">
                                    <div class="types-list-title">
                                        <h2 class="small-title">Тип продукции</h2>
                                    </div>
                                    <div class="types-list-content">
                                        <div v-for="(item, index) in data.product_types" :key="index" class="types-list-item">
                                            {{ item.product_types_name }}

                                            <!-- <router-link :to="data.link.original" class="types-list-link">{{ item.name }}</router-link> -->
                                        </div>
                                    </div>
                                </div>
                            </tab-panel>
                        </tab-panels>
                    </div>
                </div>
            </div>

            <mobile-footer></mobile-footer>

            <zoom-window :data="data"
                         :title="data.name"
                         :text="data.description"
                         :product-id="data.id"
                         back-btn-text="Назад к товару"></zoom-window>
         </div>

        <div class="loader" v-if="loading"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            data: null,
            showTypes: false
        }
    },
    watch: {
        '$route': 'fetchData'
    },
    created() {
        this.fetchData();
    },
    mounted() {
        this.$contentWindow.setView('content')
    },
    methods: {
        fetchData() {
            this.data = null
            this.loading = true

            axios.get('/api' + this.$route.path)
                .then(response => {

                    this.data = response.data;

                    if (this.data.product_types.length) {
                        this.typesHover();
                    }

                    this.loading = false;
                })
                .catch(e => {
                    this.$router.push({ path: '/error' })
                    console.log(e)
                })
        },
        // TODO менять img по ховеру
        typesHover() {

        }
    }
}
</script>
