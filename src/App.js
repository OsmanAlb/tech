import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./Create";
import { IoIosCamera } from "react-icons/io";
import Navbar from "./NavBar";
import Home from "./Home";
import BlogDetails from "./BlogDetails";
import Modal from "./components/modal";
// import { useState } from "react";

const App = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  return (
    <section className="section">
      <Router>
        <div className="App">
        {openModal && <Modal closeModal = {setOpenModal}/>}
          <Navbar />
          <div className="content">
            <div>
              <div exact path="/">
                <Home />
              </div>
              <div path="/create">
                <Create />
              </div>
              <div path="/blogs/:id">
                <BlogDetails />
              </div>
            </div>
          </div>
        </div>
      </Router>
      <label className="label">
        <div className="icon">
          <IoIosCamera />
        </div>

        <span>Добавить фото</span>
        <input
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
      </label>

      <div className="images">
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div key={image} className="image">
                <img src={image} height="104" alt="upload" />
                <button onClick={() => deleteHandler(image)}>&times;</button>
                <p>{index + 1}</p>
              </div>
            );
          })}
      </div>
      <input type="file" multiple />

      {selectedImages.length > 0 &&
        (selectedImages.length > 10 ? (
          <p className="error">
            You can't upload more than 10 images! <br />
            <span>
              please delete <b> {selectedImages.length - 10} </b> of them{" "}
            </span>
          </p>
        ) : (
          <button
            className="upload-btn"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Загрузить {selectedImages.length} фото
            {selectedImages.length === 1 ? "" : "к"}
          </button>
        ))}
      <div className="btn">
        <button
          className="btn_to"
          onClick={() => {
            console.log(selectedImages);
            setOpenModal(true);
          }}
        >
          Продолжить
        </button>
        <button
          className="btn_out"
          onClick={() => {
            console.log(selectedImages);
            setOpenModal(true);
          }}
        >
          Вернуться
        </button>
      </div>
    </section>
  );
};

export default App;
