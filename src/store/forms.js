const state = () => ({
    messages: []
})

const getters = {
    getFormMessages(state) {
        return state.messages
    }
}

const mutations = {
    pushFormMessage(state, {message, key, status}) {
        state.messages.push({
            message: message,
            key: key,
            status: status
        })
    },
    popFormMessage(state, key) {
        let index = state.messages.findIndex(elKey => {
            return elKey.key === key
        })

        if(index !== -1) state.messages.splice(index, 1)
    }
}

const actions = {
    addFormMessage({commit}, formMessage) {
        commit('pushFormMessage', {
            message: formMessage.message,
            key: formMessage.key,
            status: formMessage.status
        })
    },
    dispatchFormMessage({commit}, key) {
        commit('popFormMessage', key)
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}