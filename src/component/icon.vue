<template>
    <svg class="icon">
        <use :xlink:href="`#i-${iconName}`"></use>
    </svg>
</template>
<script>
    export default {
        name: "icon",
        props: ['iconName'] ,
    }
</script>

<style scoped lang="stylus">
    .icon
        width: 1em;
        height: 1em;
</style>
