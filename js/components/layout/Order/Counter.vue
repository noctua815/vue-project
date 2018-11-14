<template>
<div class="counter">
    <div class="counter__btn counter__btn-minus" @click="decrementValue"></div>
    <div class="counter__value">
        <input class="counter__input" type="text" name="" readonly v-model="counter">
    </div>
    <div class="counter__btn counter__btn-plus" @click="incrementValue"></div>
</div>
</template>

<script>
export default {
    props: {
        value: Number,
        id: [String, Number],
        type: {
            type: String,
            default: 'main'
        }
    },
    data() {
        return {
            min: 0,
            counter: 1,
            multiple: 25,
            bindCounter: null
        }
    },
    mounted() {
        if (this.type == 'main') {
            this.bindCounter = this.$parent.$children.find(item => item.id === this.id && item.type == 'measure')
        } else if (this.type == 'measure') {
            this.bindCounter = this.$parent.$children.find(item => item.id === this.id && item.type == 'main')
        }

        if (this.value) {
            this.counter = this.value
        }
    },
    methods: {
        searchProductInlocalStorage: function(element, index, array) {
            return this.id === element.id;
        },
        decrementValue() {
            let value = this.type == 'measure' ? this.multiple : 1

            if (this.counter - value >= 1) {
                this.counter = this.counter - value;
                this.changeBindCounter(this.counter);
            }
        },
        incrementValue() {
            let value = this.type == 'measure' ? this.multiple : 1

            this.counter = this.counter + value;
            this.changeBindCounter(this.counter);
        },
        changeBindCounter(value) {
            let order = LS.get('order'),
                curProduct = order.items.find(this.searchProductInlocalStorage),
                mainCount = 0;

            if (this.type == 'main') {
                this.bindCounter.counter = this.counter * this.multiple;
                mainCount = this.counter;
            } else if (this.type == 'measure') {
                this.bindCounter.counter = this.counter / this.multiple;
                mainCount = this.counter / this.multiple;
            }

            curProduct.count = mainCount;

            LS.set('order', order);
        }
    }
}
</script>
