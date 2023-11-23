import React from "react";
import "./modal.css";

function modal({ closeModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              closeModal(false);
            }}
          >
            {" "}
            X{" "}
          </button>
        </div>
        <div className="title">
          <h1 className="text_style"> Вы уверены что хотите продолжить? </h1>
        </div>
        <div className="body">
          <p className="text_style"> Проверьте файлы перед отправкой! </p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              closeModal(false);
            }}
            id="cancelBtn"
          >
            Отмена
          </button>
          <button>Сохранить</button>
        </div>
      </div>
    </div>
  );
}

export default modal;
