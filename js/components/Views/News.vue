<template lang="html">
    <div class="pc">
         <div class="pc-wr">
            <div class="pc-head">
                <div class="pc-breadcrumbs">

                </div>
                <div class="pc-title">
                    <h1> Акции и новости </h1>
                </div>
            </div>
            <div class="pc-body">
                <div class="pc-body-wr">
                    <!-- Left col -->
                    <div class="pc-body-left">
                        <div class="pc-fixed-col">
                            <div class="pc-fixed-tabs">
                                <tab-triggers id="content-tabs" :active-tab="1" class="fixed">
                                    <tab-trigger name="Акции" id="promotions" parent-id="content-tabs" link="/promotions"></tab-trigger>
                                    <tab-trigger name="Новости" id="news" parent-id="content-tabs" link="/news"></tab-trigger>
                                </tab-triggers>
                            </div>
                        </div>
                    </div>
                    <!-- END Left col -->

                    <!-- Right col -->
                    <div class="pc-body-right">
                        <tab-panels id="content-tabs">
                            <tab-panel id="promotions"></tab-panel>

                            <tab-panel id="news">
                                <div class="items-list-wr" v-if="!loading">
                                    <div class="items-list" v-if="data.length">
                                        <news-item v-for="(item, index) in data" :key="index" :data="item"></news-item>
                                    </div>
                                    <div class="loading-message" v-else>
                                        <div class="loading-message__text">Пока нет новостей</div>
                                    </div>
                                </div>

                                <div class="loader" v-if="loading"></div>
                            </tab-panel>
                        </tab-panels>
                    </div>
                    <!-- END Right col -->
                </div>
            </div>

            <mobile-footer></mobile-footer>
         </div>
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
        this.fetchData()
    },
    mounted() {
        this.$contentWindow.setView('content')
    },
    methods: {
        fetchData() {
            axios.get('/api' + this.$route.path)
                .then(response => {
                    this.data = response.data
                    this.loading = false
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }
}
</script>
