
export default {
    data() {
        return {
            tEntered: 0.15,
            tAfterEnter: 0.25
        }
    },
    methods: {
        enter: function (el) {
            let time = (el.dataset.index % this.maxEntries) * this.tEntered;
            el.style['transition-delay'] = this.tEntered +'s';
            el.children[0].style['transition'] = 'all '+ this.tEntered +'s';
        },
        afterEnter: function (el) {
            el.style['transition-delay'] = null;
            el.style.transition = 'all '+ this.tAfterEnter +'s';
            el.children[0].style['transition'] = 'all '+ this.tAfterEnter +'s';
        },
    }
}