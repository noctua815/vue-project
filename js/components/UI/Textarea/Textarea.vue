<template>
<div class="form-field form-field--textarea" :class="{'is-error': hasError, 'is-focus': hasError || isFocus}">
    <label :for="id" class="form-field__label">
        <span class="form-field__label-text">{{ label }}</span>
        <span v-if="hasError"
              class="form-field__error"
              :data-error="fieldError.first(name)">!</span>
    </label>
    <textarea v-bind="$props"
            :value="value"
            @input="$emit('input',$event.target.value)"
            :class="['form-field__input', {'required-field': required}]"
            @focus="onFocus"
            @blur="onBlur"
            ref="input"></textarea>
</div>
</template>

<script>
import autosize from "autosize";
import { Validator } from 'vee-validate';

export default {
    props: {
        type: {
            type: String,
            default: 'text'
        },
        label: String,
        name: String,
        id: String,
        value: {
            type: [String, Number],
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
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
        autosize(this.$refs.input);
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
            }
        },
        autoSize() {

        }
    }
}
</script>
