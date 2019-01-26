export default {
    setWindowSize(state, params) {
        let windowSize = JSON.parse(JSON.stringify(state.windowSize));
        state.windowSize = {...windowSize, ...params};

        if (params.width > state.mobileWidth) {
            state.isMobile = false;
        } else {
            state.isMobile = true;
        }
    },
}