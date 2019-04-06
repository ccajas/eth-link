
export default {
    data() {
        return {
            trTime: 0.1
        }
    },
    methods: {
        enter: function (el) {
            let time = (el.dataset.index % this.maxEntries) * this.trTime;
            el.style['transition-delay'] = time +'s';
        },
        afterEnter: function (el) {
            el.style['transition-delay'] = null;
            el.style.transition = 'all '+ this.trTime +'s';
        },
    }
}