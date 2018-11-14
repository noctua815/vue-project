<template>
<div class="checkbox">
    <input class="checkbox__input" type="checkbox" :id="id" :name="name" :checked="value" @change="$emit('input', $event.target.checked)">
    <label class="checkbox__label" :for="id" ref="label">
        <slot></slot>
    </label>
</div>
</template>

<script>
export default {
    props: {
        id: String,
        name: String,
        value: Boolean
    }
}
</script>
