import React, { useState, useEffect } from "react";
import data from "../data/books.json";
import {
  normalizeString,
  alertSuccess,
  alertError,
} from "./constants/functions";
import SaveBooks from "./SaveBooks";
import DetailBook from "../pages/DetailBook";

function Store({ searchTerm }) {
  const [library, setLibrary] = useState(data.library);
  const [booksSaved, setBooksSaved] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState({});


  const saveBook = (bookId) => {
    setBooksSaved((prevBookSaved) => {
      const isBookAlreadySaved = prevBookSaved.some(
        (item) => item.book.ISBN === bookId
      );

      if (!isBookAlreadySaved) {
        const bookToSave = library.find((item) => item.book.ISBN === bookId);

        if (bookToSave) {
          alertSuccess("guardado");
          const updateList = [...prevBookSaved, bookToSave];
          setBooksSaved(updateList);
          localStorage.setItem("BooksSaved", JSON.stringify(updateList));
          return updateList;
        }
      } else {
        alertError();
      }

      return prevBookSaved;
    });
  };

  useEffect(() => {
    // Lógica para actualizar el estado library, por ejemplo, cuando searchTerm cambia
    setLibrary(data.library);

    const storedBooks = localStorage.getItem("BooksSaved");
    if (storedBooks) {
      setBooksSaved(JSON.parse(storedBooks));
    }
  }, [searchTerm]);

  const removeBook = (bookId) => {
    alertSuccess("eliminado");
    setBooksSaved((preBookSaved) =>
      preBookSaved.filter((item) => item.book.ISBN !== bookId)
    );
    debugger;
    const local = JSON.parse(localStorage.getItem("BooksSaved")) || [];
    let index = local.findIndex((item) => item.book.ISBN === bookId);
    if (index !== -1) {
      local.splice(index, 1);
    }
    localStorage.setItem("BooksSaved", JSON.stringify(local));
  };

  const normalizedSearchTerm = normalizeString(searchTerm.trim().toLowerCase());

  const filteredLibrary = library.filter(
    (item) =>
      normalizeString(item.book.genre).includes(normalizedSearchTerm) ||
      normalizeString(item.book.title).includes(normalizedSearchTerm)
  );

  return (
    <>
      <section className="text-gray-600 bg-gray-900">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h2 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
              Lista de libros
            </h2>
            <div className="h-1 w-24 bg-indigo-500 rounded"></div>
          </div>
          {filteredLibrary.length > 0 ? (
            <div className="flex flex-wrap -m-4">
              {filteredLibrary?.map((item) => (
                <div
                  key={item.book.ISBN}
                  className="lg:w-1/4 md:w-1/2 p-4 w-full h-auto"
                >
                  <img
                    className="object-cover object-fit w-full h-auto block cursor-pointer"
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
                      onClick={() => saveBook(item.book.ISBN)}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-white h-screen">
              No se encontraron resultados
            </div>
          )}
        </div>
      </section>
      {booksSaved.length > 0 ? (
        <div>
          <section className="bg-gray-900">
            <SaveBooks booksSaved={booksSaved} onRemoveBook={removeBook} />
          </section>
        </div>
      ) : (
        <></>
      )}
      {isOpen && <DetailBook isOpen={isOpen} setIsOpen={setIsOpen} Book={bookDetails} />}
    </>
  );
}
export default Store;
