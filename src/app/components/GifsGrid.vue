<template>
  <div class="gifs-container">
    <v-card class="mx-auto">
      <v-container class="pa-1">
        <v-item-group>
          <v-row>
            <v-col
                v-for="(item, index) in gifsList"
                :key="index"
                cols="12"
                md="3"
                @click="goToSelectGif(item)"
            >
              <v-item v-slot="{ isSelected, toggle }" >
                <v-img
                    :src="item.images?.original?.webp"
                    cover
                    class="text-right pa-2"
                >
                </v-img>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import { router } from "@/app/routes/routes";
import GiphyService, { IGif } from "@/app/services/giphy.service";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    gifsList: {
      type: Array<IGif>
    },
  },
  methods: {
    goToSelectGif(item: IGif): void {
      GiphyService.selectGif = item;
      router.push({ path: `gif/${item.id}` })
    }
  }

})
</script>

<style>
  .gifs-container {

  }
</style>
