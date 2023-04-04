<template>
    <div class="author-container">
      <router-link :to="backToGif()">
        <v-btn variant="outlined">
          Back to gif
        </v-btn>
      </router-link>
      <div v-if="author">
        <v-img
            :src="author.banner_image ||author.avatar_url"
            class="author-image text-right pa-2"
            @click="toggle"
        ></v-img>
        <div class="author-name">{{ author.display_name }}</div>
        <a :href="author.profile_url" target="_blank">Gifhy profile</a>
      </div>

      <div class="blank-author" v-else>
        Author is empty
      </div>
    </div>
</template>

<script lang="ts">
import GiphyService from "@/app/services/giphy.service.js";

export default {
  name: "AuthorGif",
  data(){
    return {
      author: Object,
    }
  },
  mounted() {
    this.author = GiphyService.selectGif.user;
  },
  methods: {
    backToGif(): string {
      const gifItemId = GiphyService.selectGif.id;
      return `/gif/${gifItemId}`;
    }
  }
}
</script>

<style scoped>
  .author-container {
    margin-top: 50px;
  }
  .author-image {
    max-height: 400px;
  }
</style>
