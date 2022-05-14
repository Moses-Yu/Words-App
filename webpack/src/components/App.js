import React from "react";
import search_icon from "../images/search_icon.png";

const App = () => {
  return (
    <div class="search_tab">
      <form>
        <input class="search_input" type="text"></input>
        <button class="search_submit" type="submit">
          <img src={search_icon}></img>
        </button>
      </form>
    </div>
  );
};

export default App;
