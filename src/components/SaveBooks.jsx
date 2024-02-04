import React, { useState } from "react";
import DetailBook from "../pages/DetailBook";

function SaveBooks({ booksSaved, onRemoveBook }) {
  const [isOpen, setIsOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState([]);

  return (
    <div className="container px-5 py-24 mx-auto bg-gray-900">
      <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
        <h2 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
          Libros guardados
        </h2>
        <div className="h-1 w-20 bg-indigo-500 rounded"></div>
      </div>
      <div className="flex flex-wrap -m-4">
        {booksSaved.map((item) => (
          <div key={item.book.ISBN} className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <img
              className="object-cover object-center w-full h-150 block cursor-pointer"
              src={item.book.cover}
              alt={item.book.title}
              onClick={() => {
                setIsOpen(true);
                setBookDetails(item);
              }}
            />
            <div className="mt-4">
              <h3 className="text-white text-sm tracking-widest title-font mb-1">
                {item.book.genre}
              </h3>
              <h2 className="text-white text-md tracking-widest mb-1">
                {item.book.title}
              </h2>
              <button
                className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                onClick={() => onRemoveBook(item.book.ISBN)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {isOpen && (
          <DetailBook
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            Book={bookDetails}
          />
        )}
      </div>
    </div>
  );
}

export default SaveBooks;
