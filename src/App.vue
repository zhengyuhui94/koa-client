<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script lang="ts">
import {
    Component,
    Vue,
} from 'vue-property-decorator';

@Component
export default class App extends Vue {
    
}
</script>
<style lang="scss">
    @import '@/assets/scss/base.scss';
    @import '@/assets/scss/leftNav.scss';
    
    #app {
        min-width: 1200px;
        height: 100%;
    }
</style>