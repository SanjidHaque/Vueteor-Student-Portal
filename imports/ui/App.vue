<template>
    <v-app id="app">
        <div class="container-fluid">
            <Header/>
            <router-view/>
        </div>
    </v-app>
</template>

<script>
    import Header from '../../client/components/Header';
    export default {
        name: 'App',
        components: {
            Header
        }
    }
</script>

<style>
    #app {
        padding: 0 15px;
    }
</style>

