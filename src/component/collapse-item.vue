<template>
    <div class="collapse-item">
        <div class="title" @click="toggle" :data-name="name">
            {{title}}
        </div>
        <div class="content" v-if="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'collapse-item',
        props: {
            title: {
                type: String,
                required: true
            },
            name: {
                type: String
            }
        },
        data() {
            return {
                open: false,
                selected: []
            };
        },
        inject: ['eventBus'],
        mounted() {
            this.eventBus && this.eventBus.$on('update:selected', (names) => {
                if (names.includes(this.name)) {
                    this.open = true;
                } else {
                    this.open = false;
                }
            });
        },
        methods: {
            toggle() {
                if (this.open) {
                    this.eventBus && this.eventBus.$emit('update:removeSelected', this.name)
                } else {
                    this.eventBus && this.eventBus.$emit('update:addSelected', this.name)
                }
            },
        }
    };
</script>

<style scoped lang="stylus">
    $grey = #ddd;
    $border-radius = 4px;
    .collapse-item
        .title
            border: 1px solid $grey
            margin-top -1px;
            margin-left: -1px;
            margin-right -1px
            min-height 32px;
            padding 0 8px;
            display flex;
            align-items center
            background: lighten($grey, 8%)
        &:first-child
            .title
                border-top-left-radius: $border-radius;
                border-top-right-radius: $border-radius;
        &:last-child
            .title:last-child
                border-bottom-left-radius: $border-radius;
                border-bottom-right-radius: $border-radius;
        .content {
            padding: 8px;
        }
</style>

