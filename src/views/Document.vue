<template>
    <el-drawer
        v-model="drawer"
        size="75%"
        :with-header="false"
        :direction="direction"
        @closed="handleClose"
    >
        <VueShowdown
            class="markdown-body"
            :markdown='content'
        />
    </el-drawer>
</template>

<script>
import router from '../router/index'

import 'github-markdown-css'
import { ref } from 'vue'
import axios from 'axios'

export default {
    name: 'Document',
    props: {
        filename: String
    },
    beforeRouteEnter(to, from, next) {
        console.log(to);
        console.log(from);
        next(vm => {            // We can handle routing here. But nothing have to do now. currently all routing back simply use router.replace('/')
            if(from.name == undefined) {
                vm.fromRouteName = "Home";
            } else {
                vm.fromRouteName = "Home";
            }
            console.log(vm);
        })
    },
    setup() {
        const drawer = ref(false);
        const direction = ref('ltr');
        const handleClose = () => {
            console.log(router.getRoutes());
            router.replace('/');
        };
        return {
            drawer,
            direction,
            handleClose
        }
    },
    data() {
        return {
            pageState: 0,       // 0:loading, 1:loaded
            content: '',
            fromRouteName: ''
        }
    },
    created() {
        this.openDocument();
    },
    methods: {
        openDocument: function() {
            this.drawer = true;
            let data = { docTitle: this.filename };
            axios.post(window.apiEndpoint + '/api/getDocument', JSON.stringify(data)).then(res => {
                console.log(res.data);
               this.content = res.data.content;
            })
        }
    }
}
</script>

<style scoped>
/*markdown style: https://www.npmjs.com/package/github-markdown-css */
.markdown-body {
    overflow-y: auto;
    padding: 0 100px 0 100px;
    width: 100%;
    height: 100%;
    position: absolute;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 80px;
}
.drawerScroll {
    overflow-y: auto;
    padding: 0 100px 0 100px;
    width: 100%;
    height: 100%;
    position: absolute;
}
.drawerScroll::-webkit-scrollbar {
    height: 6px;
    width: 6px;
}
.drawerScroll::-webkit-scrollbar-thumb {
    background: rgb(223, 223, 223);
}
.el-drawer__body {
    padding: 0 10px 0 10px !important
}
</style>
