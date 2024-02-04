import { useState } from "react";
import Store from "./Store";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchTerm);
  };

  return (
    <>
      <div className="pt-2 mx-auto bg-gray-900 top-0 fixed w-full z-[100]">
        <form onSubmit={handleSubmit}>
          <div className="max-w-md mx-auto">
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                className=" h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search something.."
                autoComplete="off"
              />
            </div>
          </div>
        </form>
      </div>
      <section className="text-gray-600">
        <Store searchTerm={searchTerm.trim()} />
      </section>
    </>
  );
}

export default SearchBar;
