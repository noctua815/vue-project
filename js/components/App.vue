<template>
<div class="page">
    <div class="page-bg">
        <picture>
            <source media="(max-width: 640px)" srcset="/img/main-bg/bg-mobile.jpg">
            <source media="(max-width: 1024px)" srcset="/img/main-bg/bg.jpg">
            <source media="(min-width: 1025px)" srcset="/img/main-bg/bg@2x.jpg, /img/main-bg/bg@3x.jpg 2x">
            <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="Grainatt">
        </picture>
    </div>

    <!-- Header -->
    <page-header></page-header>

    <!-- Sidebar -->
    <sidebar :sidebar-links="$sidebar.sidebarLinks"></sidebar>

    <!-- Content -->
    <content-window>
        <router-view></router-view>
    </content-window>

    <!-- Footer -->
    <page-footer></page-footer>
</div>
</template>

<script>
export default {
    name: 'App',
    updated: function() {
        // console.log(this.$route)
    }
}
</script>
