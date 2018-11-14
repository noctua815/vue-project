<template>
<div class="breadcrumb">
    <!-- {{ crumbs }} -->
    <div class="breadcrumb-item">
        <!-- <router-link to="/" class="breadcrumb-link">Link</router-link> -->
    </div>
</div>
</template>

<script>
export default {
    // computed: {
    //     crumbs: function() {
    //         let pathArray = this.$route.path.split("/")
    //         pathArray.shift()
    //         let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
    //             console.log(this.$route.matched[idx].meta)
    //             breadcrumbArray.push({
    //                 path: path,
    //                 to: breadcrumbArray[idx - 1] ?
    //                     "/" + breadcrumbArray[idx - 1].path + "/" + path :
    //                     "/" + path,
    //                 text: this.$route.matched[idx] ? this.$route.matched[idx].meta.breadcrumb : path,
    //             });
    //             return breadcrumbArray;
    //         }, [])
    //         return breadcrumbs;
    //     }
    // }
}
</script>
