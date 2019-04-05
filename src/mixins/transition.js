
export default {
    methods: {
        enter: function (el) {
            let time = (el.dataset.index % this.maxEntries) * 0.25;
            el.style['transition-delay'] = time +'s';
        },
        afterEnter: function (el) {
            el.style['transition-delay'] = null;
            el.style.transition = 'all 0.25s';
        },
    }
}