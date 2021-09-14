<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title" />
    <textarea
      required
      placeholder="Playlist description..."
      v-model="description"
    ></textarea>
    <label>Upload playlist cover image</label>
    <input type="file" @change="handleChange" />
    <div class="error">{{ fileError }}</div>
    <div class="error"></div>
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Creating...</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useStorage from "@/composables/useStorage.js";
import useCollection from "@/composables/useCollection.js";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { filePath, url, uploadFile } = useStorage();
    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileTypes = ["image/png", "image/jpeg"];
    const fileError = ref(null);
    const { error, addDoc, editDoc } = useCollection("playlists");
    const { user } = getUser();
    const isPending = ref(false);
    const router = useRouter();

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: "",
          filePath: "",
          songs: [],
          createdAt: timestamp(),
        });
        await uploadFile(file.value, res.id);
        await editDoc(res.id, filePath, url);
        isPending.value = false;
        if (!error.value) {
          router.push({ name: "PlaylistDetails", params: { id: res.id } });
        }
      }
    };
    const handleChange = (event) => {
      const selected = event.target.files[0];
      if (selected && fileTypes.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select image file (.png or .jpg)";
      }
    };

    return {
      title,
      description,
      handleChange,
      handleSubmit,
      fileError,
      isPending,
    };
  },
};
</script>

<style>
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
textarea {
  resize: none;
}
</style>