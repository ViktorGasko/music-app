import { ref } from "vue";
import { projectFirestore } from "../firebase/config.js";

const useDocument = (collection, id) => {
  const error = ref(null);
  const isPending = ref(false);

  const deleteDoc = async () => {
    isPending.value = true;
    error.value = null;

    let docRef = projectFirestore.collection(collection).doc(id);

    try {
      const res = await docRef.delete();
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      isPending.value = "could not delete the document";
    }
  };

  const updateDoc = async (updates) => {
    isPending.value = true;
    error.value = null;
    let docRef = projectFirestore.collection(collection).doc(id);

    try {
      const res = await docRef.update(updates);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      isPending.value = "could not update the document";
    }
  };

  return { error, isPending, deleteDoc, updateDoc };
};

export default useDocument;
