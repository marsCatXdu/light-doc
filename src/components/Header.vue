<template>
    <el-header class="negativeMarginHeader">
        <div class="title">LightDoc</div>
    </el-header>
</template>

<script>
export default {
    name: 'Header',
    props: {
    }
}
</script>

<style scoped>
.negativeMarginHeader {
    padding: 0px 30px 0 40px;
    height: 40px;
    background-color: #409EFF;
    display: flex;
    flex-direction: row;
}

.logo {
    vertical-align: center;
    margin-top: 14px;
    width: 106px;
    height: 22px;
    float: left;
}

.title {
    vertical-align: center;
    float: left;
    color: white;
    font-weight: bold;
    margin: -10px 0px 2px 0px;
}

</style>
