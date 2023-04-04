<template>
  <header class="header">
    <div class="logo" @click="goHome()">
      <img src="@/assets/vue.svg"/>
    </div>
    <div class="search">
      <div class="search__wrapper">
        <v-text-field v-model="searchValue"></v-text-field>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
  import EventEmitter from "@/core/event-emitter";
  import { debounce } from "@/core/utils";
  import { router } from "@/app/routes/routes";
  import { defineComponent } from "vue";

  const emitValue: Function = debounce(EventEmitter.emit.bind(EventEmitter), 1000);

  export default defineComponent({
    data(){
      return {
        searchValue: '',
      }
    },
    watch: {
      searchValue(value: string) {
        if (value) {
          emitValue('searchValue', value);
        }
      }
    },
    methods: {
      goHome() {
        router.push('/');
      }
    }

  })
</script>

<style>
  .header {
    height: 60px;
    display: flex;
    align-items: center;
  }

  .logo, .logo > img  {
    height: 40px;
    cursor: pointer;
  }

  .search {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
  }
  .search__wrapper {
    width: 60%;
  }

  .v-input__details, .v-messages {
    min-height: 0;
    padding-top: 0;
  }

</style>
