<template>
    <div class="user-distribution">
        <main-title title="用户分布"/>
        <distribution-chart/>
    </div>
</template>

<script>
    import MainTitle from '@/components/MainTitle'
    import DistributionChart from '@/components/DistributionChart'

    export default {
        name: "UserDistribution",
        components: {
            MainTitle,
            DistributionChart
        }
    }
</script>

<style>

</style>