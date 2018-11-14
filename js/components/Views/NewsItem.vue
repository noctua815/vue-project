<template lang="html">
    <div class="pc">
         <div class="pc-wr" v-if="!loading">
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
                                <tab-triggers id="content-tabs" :active-tab="1" class="fixed">
                                    <tab-trigger name="Акции" id="promotions" parent-id="content-tabs" link="/promotions"></tab-trigger>
                                    <tab-trigger name="Новости" id="news" parent-id="content-tabs" link="/news"></tab-trigger>
                                </tab-triggers>
                            </div>
                            <!-- END Tabs -->

                            <!-- Zoom -->
                            <div class="pc-fixed-zoom" v-if="$mq === 'desktop'">
                                <zoom-preview :src="data.image.preview.image" :alt="data.image.preview.alt" :show-zoom="false"></zoom-preview>
                            </div>
                            <!-- END Zoom -->
                        </div>
                    </div>

                    <div class="pc-body-right">
                        <tab-panels id="content-tabs">
                            <tab-panel id="promotions" :mobile="false"></tab-panel>

                            <tab-panel id="news" >
                                <div class="news-content">
                                    <div class="news-content__title pse-subhead">
                                        <h1>{{ data.name }}</h1>
                                    </div>
                                    <div class="news-content__date" v-if="data.date_public">
                                        {{ data.date_public }}
                                    </div>

                                    <!-- Mobile preview -->
                                    <div class="news-content__mobile-preview" v-if="$mq !== 'desktop' && data.image.full">
                                        <div class="pc-fixed-preview">
                                            <pc-preview :src="data.image.full.image" :alt="data.image.full.alt" indent="big"></pc-preview>
                                        </div>
                                    </div>
                                    <!-- END Mobile preview -->

                                    <div class="news-content__descr text-content" v-html="data.description"></div>
                                </div>
                            </tab-panel>
                        </tab-panels>
                    </div>
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
            loading: false,
            data: null
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
