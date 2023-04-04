<template>
  <div class="gif-container" v-if="currentItem">
    <h1 class="title">{{ currentItem.title }}</h1>
    <router-link :to="getAuthorLink()" class="author-link">Author link</router-link>
    <v-img
        :width="300"
        cover
        :src="currentItem.images?.original?.webp"
    ></v-img>
    <v-btn class="share-btn" variant="outlined" @click="shareImg()">
      Share
    </v-btn>

    <div class="slider">
      <v-sheet
          class="mx-auto"
          elevation="8"
          max-width="1040"
      >
        <v-slide-group
            class="pa-4"
            :dark="true"
        >
          <v-slide-group-item
              v-for="(gifItem, index) in randomGifs"
              :key="index"
          >
            <v-card
                class="ma-4"
                height="200"
                width="300"
            >
              <div class="d-flex fill-height align-center justify-center">
                <v-img
                    :width="300"
                    cover
                    :src="gifItem.images?.original?.webp"
                ></v-img>
              </div>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>
    </div>
  </div>

</template>

<script lang="ts">
import GiphyService, { IGif } from "@/app/services/giphy.service.js";
import { randomizer } from "@/core/utils";
import { defineComponent } from "vue";

export default  defineComponent({
  name: "Gif",
  data() {
    return {
      currentItem: {} as IGif,
      randomGifs: [] as Array<IGif>,
    }
  },
  async mounted() {
    this.currentItem = GiphyService.selectGif;
    this.randomGifs = await this.getRandomGifs();
  },
  methods: {
    getAuthorLink(): string {
      return `/author/${this.currentItem.user ? this.currentItem.user.username : 'blank'}`
    },
    async getRandomGifs(): Promise<Array<IGif>> {
      const randomOffset = randomizer();
      let gifsList: Array<IGif> = [];
      try {
        const res = await GiphyService.getTrendingGifts(randomOffset);
        gifsList = [...res.data];
      } catch (e) {
       console.log(e)
      }

      return gifsList;
    },
    async shareImg() {
      if ( !navigator ) return;

      const response = await fetch(this.currentItem.images?.original?.webp);
      const blob = await response.blob();
      const filesArray = [
        new File(
            [blob],
            `${this.currentItem.title}.webp`,
            {
              type: "image/webp",
              lastModified: new Date().getTime()
            }
        )
      ];
      const shareData = {
        files: filesArray,
      };
      await navigator.share(shareData);
    }
  }
})
</script>

<style>
  .gif-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    margin: 20px 0;
  }
  .share-btn {
    margin-top: 20px;
  }
  .slider {
    margin: 50px 0 0 0;
  }
</style>
