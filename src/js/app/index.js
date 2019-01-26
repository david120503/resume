import $ from 'jquery';
import TweenMax from 'TweenMax';
import ScrollMagic from 'ScrollMagic';


import 'animation.gsap';
import 'debug.addIndicators';

import { WOW } from 'wowjs';

import Vue from 'vue';
import {mapGetters } from 'vuex';

import {createStore} from 'lib/store/index';

import 'vendor/imgLiquid/imgLiquid';


window.controller = new ScrollMagic.Controller();

window.controller_leave = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: 'onLeave'
    }
});

window.controller_enter = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: 'onEnter'
    }
});


const store = createStore([
    "common",
]);

var Page = new Vue({
    el: '#appBox',
    data: function(){
        return {
            windowHeight: 0,
        };
    },
    methods: {
        init: function(){
            const that = this;
            that.navBarClick();
        },
        navBarClick: function(){
            const that = this;
            $(window).bind("scroll resize", function(){
                let scrollTop = $(window).scrollTop() + 10;
                let sceneBox = $(".pp-scene-box");
                let navRel = "";
                for (let i = 0; i < sceneBox.length; i++) {
                    let top = sceneBox.eq(i).offset().top ;
                    let bottom = top + sceneBox.eq(i).outerHeight();
                    if ( !!sceneBox.eq(i) && sceneBox.eq(i).attr("rel") &&  (top <= scrollTop && scrollTop < bottom ) ) {
                        navRel = sceneBox.eq(i).attr("nav-rel");
                        break;
                    }
                }

                $(".nav-bar ul li").removeClass("active");
                $(".nav-bar ul li[rel='"+ navRel +"']").addClass("active");

                switch (navRel) {
                    case "example":
                        $(".nav-bar").addClass("orange-bg");
                        break;
                    default:
                        $(".nav-bar").removeClass("orange-bg");
                        break;
                }

            }).trigger("scroll");

            $(".nav-bar ul li").bind("click", function(){
                let navRel = $(this).attr("rel");
                if ($(".pp-scene-box[nav-rel='" + navRel + "']").length > 0) {
                    let top = $(".pp-scene-box[nav-rel='" + navRel + "']").eq(0).offset().top;
                    $("body, html").stop().animate({scrollTop: top}, 500, 'swing');
                }
            });

        },
    },
    watch: {

    },
    mounted() {
        const that = this;

        $(window).bind("resize", function(){
            const params = {
                width: $(window).width(),
                height: $(window).height(),
            };
            that.$store.dispatch("setWindowSize", params);
        }).trigger("resize");

        that.init();
    },
    computed: {
        ...mapGetters([
            "windowSize",
            "creatorList",
            "isMobile",
        ])
    },
    components: {
        SenceGroup_1_2,
        SenceGroup_3_4,
        Scene5,
        Scene6,
        Scene7,
        Scene8,
    },
    store,
});
