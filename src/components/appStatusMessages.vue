<template>
    <section>
        <div class="" v-for="msg in getFormMessages" :key="msg.key">
            <dialogBox :message="msg.message" :status="msg.status" :dialogKey="msg.key"/>
        </div>
    </section>
</template>

<script>
import {mapGetters} from 'vuex'
import dialogBox from './dialogs/dialogBox'
export default {
    components: {
        dialogBox
    },
    computed: {
        ...mapGetters({
            getFormMessages: 'forms/getFormMessages'
        })
    }
}
</script>