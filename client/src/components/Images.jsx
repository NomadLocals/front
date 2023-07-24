import React, { useState } from "react";
/* eslint no-unused-vars: "off" */
import Dropzone from "react-dropzone";
import { Container } from "reactstrap";
import { FcAddImage } from "react-icons/fc";
import { postImage, deleteImage } from "../Redux trad/actions.js";
import { useDispatch, useSelector } from "react-redux";

const Images = (props) => {
  const image = useSelector((state) => state.activityImage);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState("");

  const handleDrop = (files) => {
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tags", `codeinfuse, medium, gist`);
    formData.append("upload_preset", "Nomadlocals");
    formData.append("api_key", "413321231948876");
    formData.append("timestamp", (Date.now() / 1000) | 0);
    setLoading("true");
    dispatch(postImage(formData));
    setLoading("false");

    // .then((response) => {
    //     const data = response.data;
    //     console.log(data);
    //     const fileURL = data.secure_url;
    //     console.log(image);
    //     setImage(fileURL);

    //   })
    // .catch((error) => {
    //   console.error("Error uploading image: ", error);
    //   setLoading("false");
    // });
  };

  function handleDeleteImage() {
    dispatch(deleteImage());
  }

  function imagePreview() {
    if (loading === "true") {
      return <h3 style={{ textAlign: "center" }}>Cargando imágenes... </h3>;
    }
    if (loading === "false") {
      return (
        <div>
          {image ? (
            <div
              style={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                alt="imagen"
                style={{ width: "100%", height: "auto", maxWidth: "300px" }}
                src={image}
              />
              <button className="delete-button" onClick={handleDeleteImage}>
                Eliminar
              </button>
            </div>
          ) : (
            <h3 style={{ textAlign: "center" }}>
              No hay imágenes seleccionadas
            </h3>
          )}
        </div>
      );
    }
  }

  return (
    <div>
      <Container>
        <h1 className="text-center text-sm text-blue font-spartan">Sube la portada de tu evento aquí</h1>
        <Dropzone className="dropzone" onDrop={handleDrop} maxFiles={1}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <span className="icon-container">
                  <FcAddImage />
                </span>
                <p className="text-center text-sm text-black font-spartan">
                  Arrastra tu imagen aquí o haz clic para seleccionar
                </p>
              </div>
            </section>
          )}
        </Dropzone>
        {imagePreview()}
      </Container>
    </div>
  );
};

export default Images;
