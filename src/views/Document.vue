<template>
    <el-drawer
        v-model="drawer"
        size="75%"
        :with-header="false"
        :direction="direction"
        @closed="handleClose"
    >
        <div class="drawerScroll" v-html="content"></div>
    </el-drawer>
</template>

<script>
import router from '../router/index'

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
            axios.post('http://10.7.13.192:3000/api/getDocument', JSON.stringify(data)).then(res => {
                console.log(res.data);
                this.makeMdHtml(res.data.content).then(res => {
                    this.content = res;
                })
            })
        },
        makeMdHtml: function(mdStr) {
            return new Promise((resolve, reject) => {
                try {
                    let converter = new window.showdown.Converter();
                    // 在这里的 style 中，即使加上 scoped 仍然会导致样式的全局污染问题。。。用正则给每个标签加上 class 罢
                    let htmlStr = converter.makeHtml(mdStr) + `<div style="height: 50px"></div><style>.codePre{margin: 0 15px 0 10px; background: #EFEFEF; padding: 15px 15px 15px 15px; border-radius: 8px;} .header1{font-size: 28px} </style>`;
                    htmlStr = htmlStr.replace(/<pre>/g, "<pre class='codePre'>");
                    htmlStr = htmlStr.replace(/<h1\s*\S*">/g, "<h1 class='header1'>");
                    return resolve(htmlStr);
                } catch (e) {
                    return reject(e);
                }
            });
        }
    }
}
</script>

<style scoped>

</style>
