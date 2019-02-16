import $ from 'jquery';

import Vue from 'vue';
import {
    mapGetters
} from 'vuex';

import {
    createStore
} from 'lib/store/index';

import 'vendor/imgLiquid/imgLiquid';

import CustomHeader from './components/CustomHeader';
const store = createStore([
    "common",
]);

var Page = new Vue({
    el: '#appBox',
    data: function () {
        return {
            // windowHeight: 0,
        };
    },
    methods: {
        init: function () {
            const that = this;

        },
    },
    watch: {

    },
    mounted() {
        const that = this;

        that.init();
    },
    computed: {
        ...mapGetters([
            "windowSize",
            "isMobile",
        ])
    },
    components: {
        CustomHeader,
    },
    store,
});