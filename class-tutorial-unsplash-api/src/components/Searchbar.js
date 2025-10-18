import { useState } from "react";

const SearchBar = (prop) => {
  const { onSubmit } = prop;
  
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    onSubmit(value);    // pass search term up to parent
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  }

  return (
    <div className="mb-4">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search for images..."
          className="w-full p-2 border border-gray-300 rounded"
        />
      </form>
    </div>
  );
};

export default SearchBar;
