
import vlink  from '../views/components/vLink.vue';

export default {
    props: {
        /*apptitle: {
            type: String,
            required: true
        },
        conn: {
            type: Boolean,
            required: true 
        },*/
        containerClass: {
            type: String,
            required: true
        }
    },
    components: {
        vlink
    },
    data: function() {
        return {
            ethRequest: ''
        }
    },
    methods: {
        textchange: function (event) 
        {
            let el = document.getElementById(event.target.id);
            el.style['font-size'] = (el.value.length <= 42) ? '1em' : '0.8em';
        },
        goToLocation: function (route, request)
        {
            let href = '/'+ route +'/'+ request;
            window.history.pushState(null, '', href);
            this.$root.updateRoute();
        },
        sendRequest: function() 
        {
            let request = this.ethRequest.split('0x').join('');

            if(/[0-9a-fA-F]{40,64}/.test(request)) {
                if (request.length === 40) 
                    this.goToLocation('addr', '0x'+ request);

                if (request.length === 64)
                    this.goToLocation('tx', '0x'+ request);
            }
            else if(/[0-9]{1,8}/.test(request)) {
                this.goToLocation('block', parseInt(request));
            }
        },
        toggleResponsive: function()
        {
            this.$parent.toggleResponsive();
        }
    }
}