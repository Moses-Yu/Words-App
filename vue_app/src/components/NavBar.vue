<template>
  <input type="checkbox" id="nav_open" />
  <label for="nav_open">
    <img src="../assets/menu_icon.png" />
  </label>
  <div class="left_nav">
    <svg width="350" height="160">
      <ellipse cx="175" cy="85" rx="140" ry="60" />
    </svg>
    <div>Search</div>
    <div>My Page</div>
    <div>Quiz</div>
    <div>Login</div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  components: {},
};
</script>

<style scoped>
.left_nav {
  width: 350px;
  height: 100%;
  background: rgb(66, 66, 66);
  position: fixed;
  top: 0;
  left: -350px;
  z-index: 1;
  transition: all 0.35s;
}

input[id="nav_open"] {
  position: fixed;
  display: none;
}

input[id="nav_open"] + label {
  position: fixed;
  left: 0;
  transition: all 0.35s;
}

input[id="nav_open"] + label > img {
  position: relative;
  width: 40px;
  height: auto;
  top: 5px;
  left: 10px;
}

input[id="nav_open"]:checked + label + div {
  left: 0;
}

input[id="nav_open"]:checked + label {
  left: 350px;
}

.left_nav > div {
  color: #949494;
  background-color: rgb(44, 44, 44);
  margin: 10px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-radius: 100px;
  text-align: center;
  font-size: 48px;
  font-weight: 600;
}

.left_nav > svg > ellipse {
  position: fixed;
  fill: none;
  stroke: #e7e7e7;
  stroke-width: 2;
}
</style>
