<template lang="html">
    <div class="pc">
         <div class="pc-wr" v-if="!loading">
            <div class="pc-head">
                <div class="pc-breadcrumbs">

                </div>
                <div class="pc-title">
                    <h1> {{ data.categories_full_name }} </h1>
                </div>
            </div>
            <div class="pc-body">
                <div class="pc-body-wr">
                    <!-- Left col -->
                    <div class="pc-body-left">
                        <div class="pc-fixed-col">
                            <div class="pc-fixed-tabs">
                                <tab-triggers id="content-tabs" :mobile="false">
                                    <tab-trigger name="Номенклатура" id="nomenclature" parent-id="content-tabs"></tab-trigger>
                                    <tab-trigger name="Описание" id="about" parent-id="content-tabs"></tab-trigger>
                                </tab-triggers>
                            </div>
                            <div class="pc-fixed-promo" v-if="$mq === 'desktop'">
                                <promo value="50"></promo>
                            </div>
                            <div class="pc-fixed-btn" v-if="$mq === 'desktop'">
                                <v-button link='/trial' text="Пробная партия" type="link"></v-button>
                            </div>
                            <div class="pc-fixed-link">
                                <certf-link></certf-link>
                            </div>
                        </div>
                    </div>
                    <!-- END Left col -->

                    <!-- Right col -->
                    <div class="pc-body-right">
                        <tab-panels id="content-tabs">
                            <tab-panel id="nomenclature">
                                <div class="items-list" v-if="data.products">
                                    <product-item v-for="(item, index) in data.products" :key="index" :data="item" :short-category="data.short_name" :category="data.name"></product-item>
                                </div>

                                <div class="pc-mobile-block" v-if="$mq !== 'desktop'">
                                    <div class="pc-mobile-block-promo">
                                        <promo value="50"></promo>
                                    </div>
                                    <div class="pc-mobile-block-btn">
                                        <v-button link='/trial' text="Пробная партия" type="link"></v-button>
                                    </div>
                                </div>
                            </tab-panel>

                            <tab-panel id="about">
                                <div class="pc-mobile-title" v-if="$mq !== 'desktop'">
                                    <div class="small-title small-title--light">Описание</div>
                                </div>

                                <div class="text-content" v-html="data.description"></div>
                            </tab-panel>
                        </tab-panels>
                    </div>
                    <!-- END Right col -->
                </div>
            </div>

            <mobile-footer></mobile-footer>
         </div>

         <div class="loader" v-if="loading"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: null,
            loading: true
        }
    },
    created() {
        if (this.$config.category[`${this.$route.path}`]) {
            this.loading = false
            this.data = this.$config.category[`${this.$route.path}`]
        } else {
            this.loading = true
            this.fetchData()
        }
    },
    mounted() {
        this.$contentWindow.setView('content')
    },
    methods: {
        fetchData() {
            axios.get('/api' + this.$route.path)
                .then(response => {
                    this.loading = false
                    this.data = response.data
                    this.$config.category[`${this.$route.path}`] = this.data
                })
                .catch(e => {
                    this.$router.push({ path: '/error' })
                    console.log(e)
                })
        }
    }
}
</script>
