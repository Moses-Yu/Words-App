<template>
  <div>
    <div class="figure">
      <img src="../assets/figure.png" />
    </div>
    <div class="login_box">
      <div class="login_input">
        <div>
          <input type="text" v-model="userName" placeholder="id"/>
        </div>
        <div>
          <input type="password" v-model="password" placeholder="password"/>
        </div>
      </div>
      <div class="login_btn">
        <button type="button" @click="login">SIGN-UP</button>
      </div>

      <div class="login_else_btn">
        
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SignUpPage",
  data() {
    return {
      userName: "",
      password: "",
    };
  },
  methods: {
    login() {
      axios
        .post("/server/signUp", {
          userName: this.userName,
          password: this.password,
        })
        .then((response) => {
          if (response.data.isSuccess) {
            this.$router.push({
              name: "firstPage",
              params: { userName: this.userName, loggedIn: true },
            });
            this.$emit("loginSuccess", this.userName);
          } else {
            alert(response.data.message);
          }
          //   this.$router.go(-1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.figure > img {
  position: absolute;
  left: 50%;
  top: 27%;
  transform: translate(-50%, -50%);
  width: 500px;
}
.login_box {
  position: absolute;
  width: 300px;
  height: 400px;
  left: 50%;
  top: 72%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.login_input > div > input {
  border: 1px solid #535353;
  border-radius: 25px;
  height: 50px;
  width: 260px;
  margin-bottom: 15px;
  font-size: 20px;
  padding-left: 20px;
  background-color: #c8c8c8;
}

.login_btn > button {
  margin-top: 20px;
  background-color: #e7e7e7;
  border: 1px black solid;
  height: 100px;
  width: 100px;
  border-radius: 50px;
  font-size: 20px;
}

.login_btn > button:hover {
  background-color: rgb(185, 185, 185);
  cursor: pointer;
}

.login_else_btn {
  padding-top: 20px;
}

.login_else_btn > div {
  margin-bottom: 7px;
  font-size: 14px;
}
</style>
