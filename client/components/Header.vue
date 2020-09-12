<template>
    <div>
        <div class="row" style="text-align: center; padding-top: 10px;">
            <div class="col-xl-12">
                <h1>Vueteor Student Portal</h1>
            </div>
        </div>

        <div id="nav">
            <router-link to="/">Students</router-link>
            |
            <router-link to="/subjects">Subjects</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Header'
    }
</script>

<style scoped lang="scss">
    #nav {
        padding: 20px;
        text-align: center;
        font-size: 20px;

        a {
            cursor: pointer;
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>

