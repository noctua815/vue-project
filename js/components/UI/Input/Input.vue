<template>
<div class="form-field"
    :class="{'is-error': hasError, 'is-focus': hasError || isFocus}">

    <label :for="id" class="form-field__label">
        <span class="form-field__label-text">{{ label }}</span>
        <span v-if="hasError"
              class="form-field__error"
              :data-error="fieldError.first(name)">!</span>
    </label>

    <input v-bind="$props"
           :value="value"
           class="form-field__input"
           ref="input"
           @input="$emit('input',$event.target.value)"
           @focus="onFocus"
           @blur="onBlur">
</div>
</template>

<script>
import { Validator } from 'vee-validate';

const phoneNumber = {
    validate (value) {
        return new Promise(resolve => {
            resolve({ valid: value.slice(-1) != '_' })
        })
    }
}

Validator.extend('phoneNumber', phoneNumber)

export default {
    props: {
        type: {
            type: String,
            default: 'text'
        },
        label: String,
        name: String,
        id: String,
        value: [String, Number],
        fieldError: {
            type: Object
        },
        hasError: {
            type: Boolean
        }
    },
    data() {
        return {
            errorText: 'Обязательное поле',
            isFocus: false
        }
    },
    mounted() {
        this.initInput()
    },
    methods: {
        onFocus() {
            if (!this.isFocus) {
                this.$el.classList.add('is-focus')
                this.isFocus = true
            }
        },
        onBlur() {
            if (!this.$refs.input.value.length) {
                this.$el.classList.remove('is-focus')
                this.isFocus = false
            }
        },
        initInput() {
            if (this.type == 'tel') {
                Inputmask({
                    "mask": "+7 (999) 999-99-99",
                    showMaskOnFocus: true,
                    showMaskOnHover: false,
                    clearMaskOnLostFocus: true
                }).mask(this.$refs.input)
            }
        }
    }
}
</script>
