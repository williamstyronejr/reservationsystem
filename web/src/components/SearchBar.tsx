import * as React from "react";

const SearchBar = () => {
  const [text, setText] = React.useState("");

  return (
    <input
      type="text"
      value={text}
      onChange={(evt) => setText(evt.target.value)}
    />
  );
};

export default SearchBar;
