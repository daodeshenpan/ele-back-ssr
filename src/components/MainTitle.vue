<template>
    <h3>{{title}}</h3>
</template>

<script>
    export default {
        props: ['title'],
        name: "HeaderTitle"
    }
</script>

<style>
    h3 {
        font-size: 30px;
        font-weight: 400;
        text-align: center;
        margin: 25px 0;
        color: #333333;
    }
</style>