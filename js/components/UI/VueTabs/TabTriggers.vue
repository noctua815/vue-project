<template>
<div class="tab-triggers" :class="{'triggers-init': init}" :id="id" v-show="show">
    <div class="tab-triggers-wr" ref="wr">
        <slot></slot>

        <div class="tab-slider" ref="slider">
            <div class="tab-slider-line" ref="line"></div>
        </div>

    </div>
</div>
</template>

<script>
import TweenMax from "gsap"
import {
    bus
} from '../../config/bus.js'

import {
    debounce
} from "../../helpers/debounce"

export default {
    props: {
        id: {
            default: null
        },
        activeTab: {
            type: Number,
            required: false
        },
        mobile: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            tabTriggers: [],
            relatedPanels: null,
            type: 'triggers',
            selectedTabIndex: 0,
            show: true,
            init: false,
            hendlerResize: null
        }
    },
    created() {
        this.tabTriggers = this.$children;
    },
    mounted() {
        let $this = this

        this.handleResize = debounce(() => {
            this.resizeEvents()
        }, 1000)

        setTimeout(() => {
            this.initTabs();
        }, 100)

        bus.$on(`tabTriggered-${this.id}`, (id) => {
            this.selectTab(id);
        });

        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
        bus.$off(`tabTriggered-${this.id}`)
    },
    methods: {
        initTabs() {
            this.setSliderWidth();

            if (this.$mq === 'desktop' && !this.init || this.mobile && !this.init) {
                this.relatedPanels = this.$parent.$children.find(item => item.type === 'panels' && this.id === item.id);

                this.relatedPanels = this.relatedPanels.$children;

                if (this.activeTab) {
                    this.selectTab(this.tabTriggers[this.activeTab].id);
                } else if (this.tabTriggers.length) {
                    this.selectTab(this.tabTriggers[0].id);
                }

                this.init = true
            }

            this.show = this.$mq !== 'desktop' && !this.mobile ? false : true
        },
        findTab(id) {
            return this.relatedPanels.find(tab => tab.id === id);
        },
        selectTab(selectedId, event) {
            const selectedTab = this.findTab(selectedId),
                $this = this;

            this.selectedTabIndex = this.relatedPanels.indexOf(selectedTab);

            if (!selectedTab) {
                return;
            }

            this.tabTriggers.forEach((tab, index) => {
                tab.isActive = (tab.id === selectedTab.id);
                $this.relatedPanels[index].isActive = (tab.id === selectedTab.id);
            });

            this.moveLine(this.tabTriggers[this.selectedTabIndex].$el)
        },
        setSliderWidth() {
            if (this.$mq === 'desktop') {
                let elWidth = this.$refs.line.offsetWidth;
                let offsetLeft = (this.tabTriggers[0].$el.offsetWidth - elWidth) / 2,
                    offsetRight = (this.tabTriggers[this.tabTriggers.length - 1].$el.offsetWidth - elWidth) / 2,
                    parentWidth = this.$refs.wr.offsetWidth;

                TweenLite.to(this.$refs.slider, 0, {
                    left: offsetLeft,
                    width: parentWidth - offsetLeft - offsetRight
                })
            } else {
                TweenLite.to(this.$refs.slider, 0, {
                    left: 0,
                    width: '100%'
                })
            }
        },
        moveLine(tabEl) {
            let moveX = 0,
                newWidth = 0;

            if (this.$mq === 'desktop') {
                moveX = tabEl.getBoundingClientRect().left - this.$refs.slider.getBoundingClientRect().left + (tabEl.offsetWidth - this.$refs.line.offsetWidth) / 2;
            } else {
                newWidth = tabEl.offsetWidth * 1.3;
                moveX = tabEl.getBoundingClientRect().left - this.$refs.slider.getBoundingClientRect().left - (newWidth - tabEl.offsetWidth) / 2;
            }

            if (this.$refs.line) {
                if (this.$mq === 'desktop') {
                    TweenLite.to(this.$refs.line, 0.3, {
                        x: moveX
                    })
                } else {
                    TweenLite.to(this.$refs.line, 0.3, {
                        x: moveX,
                        width: newWidth
                    })
                }
            }
        },
        resizeEvents() {
            this.initTabs();

            if (this.init) {
                if (this.$mq === 'desktop') {
                    this.setSliderWidth();
                }
                this.moveLine(this.tabTriggers[this.selectedTabIndex].$el);
            }
        }
    }
};
</script>
