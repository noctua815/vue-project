<template>
<div class="order-btn" @click="addCart" :class="{'is-added': added}">
    <div class="order-btn__text">
        <span v-if="!added">Заказать партию</span>
        <span v-else>Добавлено в заявку</span>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            added: false,
            relatedButton: null
        }
    },
    props: {
        id: {
            type: Number,
            default: 0
        },
        type: String
    },
    created() {
        let order = LS.get('order'),
            isAdded = this.checkIsAdded(order);

        this.added = isAdded
    },
    mounted() {
        this.$nextTick(function() {
            if (this.type === 'main') {
                this.relatedButton = this.$parent.$children.find(item => item.$el.nodeType === 1 && item.$el.classList.contains('zoom-window'))

                this.relatedButton = this.relatedButton.$children.find(item => item.id === this.id && item.type === 'zoom')
            } else if (this.type === 'zoom') {
                this.relatedButton = this.$parent.$parent.$children.find(item => item.id === this.id && item.type === 'main')
            }
        })
    },
    methods: {
        addCart() {
            let order = LS.get('order'),
                item = {
                    id: this.id,
                    count: 1
                };

            this.added = !this.added
            this.relatedButton.added = this.added

            if (this.added) {
                order.items.push(item)
            } else {
                _.remove(order.items, {
                    id: this.id
                })
            }

            this.$config.orderLength = order.items.length
            LS.set('order', order)
        },
        checkIsAdded(order) {
            let $this = this,
                isAdded = _.find(order.items, function(item) {
                    return item.id === $this.id
                });

            return isAdded !== undefined
        }
    }
}
</script>
