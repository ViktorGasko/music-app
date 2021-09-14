<template>
  <navbar />
  <div class="content"><router-view /></div>
</template>


<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>
<style>
.content {
  margin: 0;
  max-width: 1200px;
  padding: 0 20px;
}
@media (max-width: 450px) {
  .content {
    padding: 0 5px;
  }
}
</style>
