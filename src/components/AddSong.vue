<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Song</button>
    <form v-else @submit.prevent="handleSubmit">
      <h4>Add a New Song</h4>
      <input type="text" placeholder="Song title" required v-model="title" />
      <input type="text" placeholder="Artist" required v-model="artist" />
      <div class="file-input-div">
        <span>{{
          !file ? "Choose or drop .mp3 file" : "Choose different file"
        }}</span>
        <input type="file" @change="handleChange" required />
      </div>
      <button class="remove-file" v-if="file" @click.prevent="removeFile">
        &#215;
      </button>
      <div class="error">{{ fileError }}</div>
      <button v-if="!addingSong">Create</button>
      <button v-else disabled>Creating...</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useDocument from "@/composables/useDocument.js";
import useStorage from "@/composables/useStorage.js";
import { v4 as uuidv4 } from "uuid";

export default {
  props: ["playlist"],
  setup(props) {
    const file = ref(null);
    const fileError = ref(null);
    const title = ref("");
    const artist = ref("");
    const showForm = ref(false);
    const addingSong = ref(false);
    const { updateDoc } = useDocument("playlists", props.playlist.id);
    const { filePath, url, uploadFile } = useStorage();

    const handleChange = (event) => {
      file.value = null;
      const selected = event.target.files[0];
      if (selected && selected.type === "audio/mpeg") {
        file.value = selected;
        title.value = selected.name.substring(0, selected.name.indexOf("."));
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select mpeg file (.mp3)";
      }
    };
    const removeFile = () => {
      if (
        title.value ===
        file.value.name.substring(0, file.value.name.indexOf("."))
      ) {
        title.value = "";
      }
      file.value = null;
    };

    const handleSubmit = async () => {
      const id = uuidv4();
      addingSong.value = true;
      if (file.value) {
        await uploadFile(file.value, props.playlist.id, id);
        const newSong = {
          title: title.value,
          artist: artist.value,
          url: url.value,
          filePath: filePath.value,
        };
        await updateDoc({
          songs: [...props.playlist.songs, newSong],
        });
        title.value = "";
        artist.value = "";
        file.value = null;
        showForm.value = false;
      }
      addingSong.value = false;
    };

    return {
      title,
      artist,
      showForm,
      handleSubmit,
      handleChange,
      removeFile,
      fileError,
      file,
      addingSong,
    };
  },
};
</script>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
span {
  position: relative;
  font-size: 1rem;
  color: white;
  cursor: pointer;
}
.file-input-div {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 200px;
  background: orange;
  border-radius: 10px;
  cursor: pointer;
}
input[type="file"] {
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
  cursor: pointer;
}
.remove-file {
  margin: 0;
  display: inline-block;
  font-size: 1.2rem;
  font-weight: bold;
  background: none;
}
.remove-file:hover {
  color: black;
}
</style>