
export default {
    data() {
        return {
            tEntered: 0.1,
            tAfterEnter: 0.2
        }
    },
    methods: {
        enter: function (el) {
            let time = (el.dataset.index % this.maxEntries) * this.tEntered;
            el.style['transition-delay'] = this.tEntered +'s';
        },
        afterEnter: function (el) {
            el.style['transition-delay'] = null;
            el.style.transition = 'all '+ this.tAfterEnter +'s';
        },
    }
}