import React, { useState, useEffect } from "react";
import "./App.scss";

import Modal from "../Modal/Modal";
import photoResultService from "../../services/photo-result/photo-result.service";

const App = () => {
  const initPhotosFromLocalStorage = () => {
    let ret = {};
    let fromLc = window.localStorage.getItem("photos");
    if (!!fromLc) {
      try {
        ret = JSON.parse(fromLc);
      } catch (error) {
        // console.error("Local storage data is corrupted", error);
        window.localStorage.removeItem("photos");
      }
    }
    return ret;
  };

  const [photos, setPhotos] = useState([]);
  const [isVisible, setModalVisiblity] = useState(false);
  const [selectedPhoto, selectPhoto] = useState(null);
  const [localStoragePhotos, updateLocalStoragePhotos] = useState(
    initPhotosFromLocalStorage
  );

  useEffect(() => {
    photoResultService.get().then(response => {
      // combine localstorage photos with response
      let updatedResponse = response.map(photo =>
        !!localStoragePhotos[photo.id] ? localStoragePhotos[photo.id] : photo
      );

      setPhotos(updatedResponse);
    });
    window.localStorage.setItem("photos", JSON.stringify(localStoragePhotos));
  }, [localStoragePhotos]);

  const openModalHandler = photo => {
    selectPhoto(photo);
    setModalVisiblity(true);
  };

  const closeModalHandler = result => {
    if (!!result) {
      // add photo data to localStorage
      let newLcState;
      if (!!localStoragePhotos) {
        newLcState = { ...localStoragePhotos, [result.id]: result };
      } else {
        newLcState = { [result.id]: result };
      }
      updateLocalStoragePhotos(newLcState);

      // update photos state
      let newState = photos.map(photo =>
        photo.id === result.id ? { ...result } : photo
      );
      setPhotos(newState);
    }
    setModalVisiblity(false);
  };

  return (
    <div className="app-container container">
      <div className="row flex-xl-nowrap">
        <div className="col-12">
          <div className="content">
            <div className="photo-list clearfix">
              {photos.map(item => (
                <span
                  className="photo"
                  onClick={() => openModalHandler(item)}
                  key={item.id}
                >
                  <img src={item.thumbnailUrl} alt={item.thumbnailUrl} />
                </span>
              ))}
            </div>
          </div>
          <Modal
            className="modal"
            show={isVisible}
            close={closeModalHandler}
            data={selectedPhoto}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
