<template>
    <el-container>
        <el-main>
            <div style="margin-top: 10px">
                <el-row>
                    <el-col :span="18">
                        <el-input
                            v-model="keyword"
                            placeholder="输入关键字"
                            @input="searchDocument(keyword)"
                        />
                    </el-col>
                    <el-col :span="6">
                        <el-button style="margin-left: 10px" type="primary" @click="searchDocument(keyword)">搜索</el-button>
                    </el-col>
                </el-row>
            </div>
            <div style="margin-top: 50px" :v-if="pageState==1">
                <div class="documentArea" v-for="doc in documentList" :key="doc.title" @click="openDocument(doc.title)">
                    <h3>{{doc.title}}</h3>
                    <p>{{doc.summary}}</p>
                </div>
            </div>
            <router-view></router-view>
        </el-main>
        <el-aside>
            <div style="margin: 35px 0 0 0">当前共有文档 {{totalDocCount}} 篇</div>
        </el-aside>

    </el-container>
</template>

<script>
import router from '../router/index'
import axios from 'axios'

export default {
    name: 'MainPage',
    setup() {
    },
    data() {
        return {
            pageState: 0,       // 0:loading, 1:loaded
            documentList: [],
            totalDocCount: 0,
            keyword: '',
            showingDoc: {},
            myname: 'lijingwei'
        }
    },
    created() {
        axios.post('http://10.7.13.192:3000/api/getDocumentList').then(res => {
            console.log(res.data);
            this.documentList = res.data;
            this.totalDocCount = this.documentList.length;
            this.pageState = 1;
        })
    },
    methods: {
        openDocument: function(title) {
            router.push({ name: 'document', params: { filename: title } })
        },
        searchDocument: function(keyword) {
            this.pageState = 0;
            let data = { keyword: keyword };
            axios.post('http://10.7.13.192:3000/api/searchDocument', JSON.stringify(data)).then(res => {
                console.log(res.data);
                this.documentList = res.data;
                this.pageState = 1;
            })
        }
    }
}
</script>

<style>
.documentArea {
    margin: 0px 10px 25px 0px;
    padding: 0px 15px 5px 25px;
    border-radius: 5px;
    color: #303133;
    border-style: solid;
    border-width: 1px;
    border-color: #EBEEF5;
    background: #fdfdfd;
    transition: box-shadow 0.1s;
}
.documentArea:hover {
    margin: 0px 10px 25px 0px;
    padding: 0px 15px 5px 25px;
    border-radius: 5px;
    background: #fdfdfd;
    box-shadow:  2px 2px 4px #c2c2c2,
                -2px -2px 4px #f0eeee;
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
