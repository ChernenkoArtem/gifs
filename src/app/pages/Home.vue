<template>
  <div class="home">
    <div class="content">
      <GifsGrid :gifs-list="gifsList"/>
    </div>
  </div>
</template>

<script lang="ts">
import GiphyService, { IGif } from '@/app/services/giphy.service'
import GifsGrid from "@/app/components/GifsGrid.vue";
import EventEmitter from "@/core/event-emitter";
import { randomizer } from "@/core/utils";

export default {
  components: {GifsGrid},
  data() {
    return {
      gifsList: [] as Array<IGif>,
    }
  },
  mounted() {
    const randomOffset = randomizer();
    GiphyService.getTrendingGifts(randomOffset).then(({data}) => (this.gifsList = data)).catch((e)=> console.log(e));

    EventEmitter.subscribe('searchValue', this.searchGifs)
  },
  methods: {
    async searchGifs(value: string) {
      try {
        const { data } = await GiphyService.getSearchGifs(value);
        if ( data.length >= 1 ) {
          this.gifsList = data;
        } else {
          const { data } = await GiphyService.getRandomGift('404',1);
          this.gifsList = [data];
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  unmounted() {
    EventEmitter.unsubscribe('searchValue', this.searchGifs);
  }
}
</script>

<style>
  .content {
    margin: 10px 0;
  }
</style>
