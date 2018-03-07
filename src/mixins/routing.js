
export default {
    created: function () {
    this.hello()
    },
    watch: {
        currentRoute: function (val, oldVal) {

            let path = this.currentRoute.split('/');
            this.view = routes['/'+ path[1]] || 'notfound';
            this.detail = path[2] || '';

            console.log('loading view: '+ this.view.tableinfo + ' | '+ this.view.rowinfo);
        }
    },
    methods: 
    {
        hello: function () {
            console.log('hello from mixin!')
        }
    }
}
