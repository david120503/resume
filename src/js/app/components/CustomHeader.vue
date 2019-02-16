<template>
    <div id="header" class="shadow">
        <nav class="navbar navbar-dark">
            <div class="container animated fadeIn">
                <ul>
                    <li>
                        <i class="fas fa-home"></i>
                        HOME
                    </li>
                    <li>ABOUT</li>
                    <li>WORKS</li>
                    <li>EXPERIENCE</li>
                    <li>SKILL</li>
                    <li>PORTFOLIOS</li>
                </ul>
                <a href="#0" data-activates="nav-mobile" id="nav-btn" class="button-collapse nav-icon">
                <i class="ion-navicon"></i></a>
            </div>
        </nav>
    </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
export default {
    data: function(){
        return {
            
        }
    },
    methods: {
        init: function(){
            const that = this;
        },
        
    },
    watch: {

    },
    computed: {
        ...mapGetters([
        ])
    },
    mounted() {
        const that = this;
        that.init();
    },
    props: {

    },
    components: {

    }
};
</script>
