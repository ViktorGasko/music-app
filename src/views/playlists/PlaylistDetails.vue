<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
    </div>
    <div class="song-list">
      <div v-if="!playlist.songs.length">
        No songs have been added to this playlist yet.
      </div>
      <Song
        v-for="song in playlist.songs"
        :key="song.filePath"
        :song="song"
        :ownership="ownership"
        @deleteSong="deleteSong"
      ></Song>
      <add-song v-if="ownership" :playlist="playlist" />
    </div>
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument.js";
import getUser from "@/composables/getUser.js";
import useDocument from "@/composables/useDocument.js";
import useStorage from "@/composables/useStorage.js";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import AddSong from "../../components/AddSong.vue";
import Song from "../../components/Song.vue";

export default {
  components: {
    AddSong,
    Song,
  },
  props: ["id"],
  setup(props) {
    const { error, document: playlist } = getDocument("playlists", props.id);
    const { user } = getUser();
    const { deleteDoc } = useDocument("playlists", props.id);
    const { updateDoc } = useDocument("playlists", props.id);
    const { deleteFile } = useStorage();
    const router = useRouter();

    const ownership = computed(() => {
      return (
        playlist.value && user.value && playlist.value.userId === user.value.uid
      );
    });
    const handleDelete = async () => {
      await playlist.value.songs.forEach((song) => deleteFile(song.filePath));
      await deleteFile(playlist.value.filePath);
      await deleteDoc();
      router.push({ name: "Home" });
    };
    const deleteSong = async (songId) => {
      await updateDoc({
        songs: playlist.value.songs.filter((song) => {
          return song.filePath !== songId;
        }),
      });
      await deleteFile(songId);
    };

    return { error, playlist, ownership, handleDelete, deleteSong };
  },
};
</script>

<style scoped>
.playlist-details {
  display: flex;
  width: 100%;
}
.playlist-info {
  display: inline-block;
  width: 40%;
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.cover {
  display: block;
  position: relative;
  width: 50%;
  min-width: 250px;
  border-radius: 20px;
}
.cover img {
  border-radius: 20px;
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: fill;
  top: 0;
  left: 0;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
h2,
.username,
.description {
  display: block;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.song-list {
  display: inline-block;
  width: 60%;
}
@media (max-width: 900px) {
  .playlist-details {
    flex-direction: column;
  }
  .song-list,
  .playlist-info {
    width: 100%;
  }
  .playlist-info {
    padding-bottom: 10px;
    border-bottom: 2px solid #ccc;
  }
}
</style>