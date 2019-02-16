<template>
    <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="shadow">
        <b-navbar-brand href="#">NavBar</b-navbar-brand>

        <b-navbar-toggle target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item href="#">About</b-nav-item>
                <b-nav-item href="#">Work</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown text="語言" right>
                <b-dropdown-item href="#">English</b-dropdown-item>
                <b-dropdown-item href="#">中文</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
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
