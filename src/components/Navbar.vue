<template>
  <div class="navbar">
    <nav>
      <div @click="toHome" class="home-link">
        <img src="@/assets/ninja.png" />
        <h1>Muso Ninjas</h1>
      </div>
      <div class="links">
        <div v-if="user" class="inside-links">
          <span>Hi there, {{ user.displayName }}</span>
          <router-link :to="{ name: 'CreatePlaylist' }" class="navbar-link"
            >Create Playlist</router-link
          >
          <router-link :to="{ name: 'UserPlaylists' }" class="navbar-link"
            >My Playlists</router-link
          >
          <button @click="handleLogout">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }"
            >Sign up</router-link
          >
          <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "../composables/useLogout.js";
import getUser from "../composables/getUser.js";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { logout } = useLogout();
    const { user } = getUser();
    const router = useRouter();

    const handleLogout = async () => {
      await logout();

      console.log("logged out");
      router.push({ name: "Login" });
    };
    const toHome = () => {
      router.push({
        name: "Home",
      });
    };
    return { handleLogout, user, toHome };
  },
};
</script>

<style scoped>
.home-link {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.links {
  display: flex;
  align-items: center;
}
.inside-links {
  display: flex;
  align-items: center;
}
button {
  position: relative;
  top: -10px;
}
h1 {
  display: inline;
}
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
img {
  max-height: 60px;
}
.navbar-link {
  font-weight: bold;
  padding-right: 20px;
  transition: all ease 0.2s;
}
.navbar-link:hover {
  font-size: 1.05rem;
  transition: all ease 0.2s;
}
span {
  font-size: 14px;
  display: inline-block;
  margin-right: 10px;
  padding-right: 10px;
  border-right: 1px solid #ccc;
}
@media (max-width: 700px) {
  span {
    display: none;
  }
  .navbar-link {
    padding-right: 5px;
  }
}
@media (max-width: 900px) {
  h1 {
    display: none;
  }
}
</style>