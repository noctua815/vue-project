<template>
    <transition name="fade" :duration="200">
        <div class="order-item" v-show="!removed">
            <div class="order-item__thumb">
                <div class="round-preview">
                    <div class="round-preview__border"></div>
                    <div class="round-preview__wr">
                        <img class="round-preview__img" :src="data.preview_img.image" :alt="data.preview_img.alt">
                    </div>
                </div>

                <router-link :to="data.link" class="order-item__thumb-link"></router-link>
            </div>

            <div class="order-item__info">
                <div class="order-item__head">
                    <div class="order-item__title">
                        <router-link :to="data.link" class="order-item__title-link">{{ data.name }}</router-link>
                    </div>
                    <!-- <div class="order-item__type">{{ data.color }}</div> -->
                </div>

                <div class="order-item__body">
                    <div class="order-item__counters">
                        <div class="order-item__counter">
                            <div class="order-item__counter-name small-title small-title--light">Мешки, шт</div>
                            <div class="order-item__counter-item">
                                <v-counter :value="data.count" :id="data.id"></v-counter>
                            </div>
                        </div>
                        <div class="order-item__counter">
                            <div class="order-item__counter-name small-title small-title--light">Масса, кг</div>
                            <div class="order-item__counter-item">
                                <v-counter :value="data.count * 25" :id="data.id" type="measure"></v-counter>
                            </div>
                        </div>
                    </div>

                    <div class="order-item__del" @click="delFromCart">Удалить из заявки</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        data: {
            type: Object
        },
    },
    data() {
        return {
            removed: false
        }
    },
    methods: {
        delFromCart() {
            let order = LS.get('order');

            _.remove(order.items, {
                id: this.data.id
            })

            LS.set('order', order);

            this.removed = true;
            this.$config.orderLength = order.items.length;
        }
    }
}
</script>
