<template>
  <div class="user-playlist">
    <h2>My Playlists</h2>
    <div v-if="playlists">
      <list-view :playlists="playlists" />
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn"
      >Create a new playlist</router-link
    >
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection.js";
import getUser from "@/composables/getUser.js";
import ListView from "@/components/ListView.vue";

export default {
  components: {
    ListView,
  },
  setup() {
    const { user } = getUser();
    const { documents: playlists } = getCollection("playlists", [
      "userId",
      "==",
      user.value.uid,
    ]);

    return { playlists };
  },
};
</script>

<style>
</style>