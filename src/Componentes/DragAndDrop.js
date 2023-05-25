import { useState } from "react";
import styled from "styled-components";

function DragAndDrop(props) {
  const [imagePrevious, setImagePrevious] = useState(null);
  const changeImage = e => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = e => {
      e.preventDefault();
      setImagePrevious(e.target.result);
    };
  };
  return (
    <div>
      <StyleDragArea>
        <div className="image-upload-wrap">
          <input
            className="file-upload-input"
            type="file"
            accept="image/*"
            multiple
            onChange={e => {
              changeImage(e);
            }}
          />
          <div className="text-information py-3">
            <h6>Anexar Documento</h6>
          </div>
        </div>
      </StyleDragArea>
    </div>
  );
}
export default DragAndDrop;

const StyleDragArea = styled.div`
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .file-upload-content {
    display: none;
    text-align: center;
    height: 100%;
  }

  .file-upload-input {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 95%;
    height: 10%;
    outline: none;
    opacity: 0;
    cursor: pointer;
  }

  .image-upload-wrap {
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
    top: 50%;
    bottom: 50%%;
    background: #f9f9fb;
    border: 1px dashed #d2d7e5;
    border-radius: 16px;
  }
  .text-information {
    text-align: center;
  }

  img {
    border: none;
    margin-top: 30px;
    height: 300px;
    width: 200px;
  }
`;
