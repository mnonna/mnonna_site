<template>
    <aside class="app-dialog app-dialog__status" :data-key="dialogKey">
        <div class="app-dialog__message">{{ message }}</div>
        <button class="app-button app-dialog__close" @click="closeMessageDialog">
            <font-awesome-icon :icon="['fa', 'times']" />
        </button>
    </aside>
</template>

<style lang="scss" scoped>

</style>

<script>
import {mapActions} from 'vuex'
export default {
    props: {
        dialogKey: String,
        message: String,
        status: Boolean
    },
    computed: {
        statusString() {
            let status = (this.status === true) ? 'success' : 'error'
            return status 
        }
    },
    methods: {
        ...mapActions({
            dispatchFormMessage: "forms/dispatchFormMessage"
        }),
        closeMessageDialog() {
            this.dispatchFormMessage(this.dialogKey)
        }
    }
}
</script>