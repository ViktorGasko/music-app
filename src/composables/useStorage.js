import { projectStorage } from "../firebase/config.js";
import { ref } from "vue";
import getUser from "./getUser.js";

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);
  const uploadFile = async (file, playListId, name = "playListImage") => {
    filePath.value = `covers/${user.value.uid}/${playListId}/${name}`;
    const storageRef = projectStorage.ref(filePath.value);
    try {
      const res = await storageRef.put(file);
      url.value = await res.ref.getDownloadURL();
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };
  const deleteFile = async (path) => {
    const storageRef = projectStorage.ref(path);
    try {
      await storageRef.delete();
    } catch (err) {
      error.value = err.message;
    }
  };

  return { url, error, filePath, uploadFile, deleteFile };
};

export default useStorage;
