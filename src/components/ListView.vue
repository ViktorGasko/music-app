<template>
  <div v-for="playlist in playlists" :key="playlist.id">
    <router-link :to="{ name: 'PlaylistDetails', params: { id: playlist.id } }">
      <div class="single">
        <div class="thumbnail">
          <img :src="playlist.coverUrl" />
        </div>
        <div class="info">
          <h3 class="list-title">{{ playlist.title }}</h3>
          <p class="created-by">Created by {{ playlist.userName }}</p>
        </div>
        <div class="song-number">
          <p>{{ playlist.songs.length }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["playlists"],
};
</script>

<style scoped>
.single {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: white;
  margin: 16px 0;
  transition: all ease 0.2s;
}
.single:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}
.thumbnail {
  width: 100px;
  min-width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 10px;
}
img {
  width: 100%;
  height: 100%;
  display: block;
}
.info {
  margin: 0 25px;
  width: 65%;
}
.list-title,
.created-by {
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
}
.song-number {
  margin-left: auto;
}
@media (max-width: 450px) {
  .single {
    padding: 10px 5px;
  }
  .info {
    margin: 0 15px;
  }
  .thumbnail {
    width: 70px;
    min-width: 70px;
    height: 70px;
    overflow: hidden;
    border-radius: 10px;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>