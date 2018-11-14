<template>
    <div class="menu-footer" v-if="$mq !== 'desktop'">
        <div class="menu-footer-wr">
            <div class="menu-footer-studio">
                <studio-link></studio-link>
            </div>
            <div class="menu-footer-copyright">
                <copyright></copyright>
            </div>
        </div>
    </div>
</template>
