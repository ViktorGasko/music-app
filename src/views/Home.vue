<template>
  <div class="home">
    <list-view :playlists="documents" />
  </div>
</template>

<script>
// @ is an alias to /src
import getCollection from "../composables/getCollection.js";
import ListView from "../components/ListView.vue";

export default {
  components: { ListView },
  name: "Home",
  setup() {
    const { error, documents } = getCollection("playlists");

    return { error, documents };
  },
};
</script>
