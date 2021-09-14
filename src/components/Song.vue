<template>
  <div class="single-song">
    <div class="detail">
      <h3>{{ song.title }}</h3>
      <p>By {{ song.artist }}</p>
    </div>
    <div class="play">
      <button v-if="playing" @click="play">
        <i class="material-icons">pause</i>
      </button>
      <button v-if="!playing" @click="play">
        <i class="material-icons">play_arrow</i>
      </button>
      <div class="outer-bar" :id="song.filePath" @click="setTime($event)">
        <div
          class="inner-bar"
          :style="{
            width: calculatedWidth,
          }"
        ></div>
      </div>
    </div>
    <button
      v-if="ownership"
      @click="$emit('deleteSong', song.filePath)"
      class="delete-btn"
    >
      Delete
    </button>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onBeforeUnmount } from "vue";

export default {
  props: ["song", "ownership"],

  setup(props) {
    const playing = ref(false);
    const timer = ref(null);
    const audio = ref(new Audio(props.song.url));
    const calculatedWidth = ref("0px");

    const play = () => {
      if (!playing.value) {
        playing.value = true;
        audio.value.play();
        timer.value = setInterval(() => {
          calculateWidth();
        }, 1000);
      } else {
        playing.value = false;
        audio.value.pause();
        clearInterval(timer.value);
      }
    };
    const calculateWidth = () => {
      const totalWidth = document.getElementById(
        props.song.filePath
      ).offsetWidth;
      const calcWidth = Math.round(
        totalWidth * (audio.value.currentTime / audio.value.duration)
      );
      if (calcWidth === totalWidth) {
        playing.value = false;
        audio.value.pause();
        audio.value.currentTime = 0;
        clearInterval(timer.value);
        calculatedWidth.value = "0px";
      } else {
        calculatedWidth.value = calcWidth + "px";
      }
    };
    const setTime = (event) => {
      audio.value.currentTime =
        (event.offsetX /
          document.getElementById(props.song.filePath).offsetWidth) *
        audio.value.duration;
    };

    onBeforeUnmount(() => {
      playing.value = false;
      audio.value.pause();
      clearInterval(timer.value);
      timer.value = null;
    });

    return { playing, play, calculatedWidth, setTime };
  },
};
</script>

<style scoped>
.detail {
  width: 40%;
}
.detail h3,
.detail p {
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.single-song {
  width: 100%;
  padding: 10px 0;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
.play {
  display: inline-flex;
  margin-right: 15px;
  width: 45%;
}
.outer-bar {
  position: relative;
  top: 7px;
  width: 100%;
  background: #ccc;
  height: 10px;
  cursor: pointer;
}
.inner-bar {
  height: 100%;
  background: orange;
}
.play button {
  background: none;
  padding: 0 5px;
  margin: 0 5px;
}
.delete-btn {
  position: relative;
  top: -10px;
}
</style>