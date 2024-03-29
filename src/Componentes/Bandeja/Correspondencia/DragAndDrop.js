import {useState} from "react";
import styled from "styled-components";
import {FileListToBase64List} from "../../../ContraloriaPQRS/utils/files";
import {addLabelToFile} from "../../../Utils/download/rotulo";

function DragAndDrop(props) {
  const [imagePrevious, setImagePrevious] = useState(null);

  const changeImage = async (e) => {
    const reader = new FileReader();
    let file = null;
    let files = [];
    const base64 = await FileListToBase64List(e.target.files);

    for (let i = 0; i < e.target.files.length; i++) {
      let base64WithLabel = await addLabelToFile(
        base64[i].split(",")[1],
        "TOP_RIGHT",
        "11/Nov/2023",
        "Consorcio",
        "Correspondencia",
        "Asunto",
        "Km 16",
        "CORRESPONDENCIA",
        "20002356",
        "123",
        "Interno"
      );
      console.log(base64WithLabel);
      file = e.target.files[i];
      files.push({name: file.name, base64: base64[i], id: i + 1});
    }
    props.handleDirectChange("Files", files);
  };
  return (
    <div>
      <StyleDragArea>
        <div className="image-upload-wrap">
          <input
            className="file-upload-input"
            type="file"
            accept={["image/*", "application/pdf"]}
            multiple
            onChange={(e) => {
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
    width: 48%;
    height: 36%;
    outline: none;
    opacity: 0;
    cursor: pointer;
  }

  .image-upload-wrap {
    display: flex;
    justify-content: center;
    height: 60px;
    width: 100%;
    top: 50%;
    bottom: 50%%;
    background: #f9f9fb;
    border: 1px dashed #d2d7e5;
    border-radius: 16px;
  }
  .text-information {
    text-align: center;
    width: 95%;
  }

  img {
    border: none;
    margin-top: 30px;
    height: 300px;
    width: 200px;
  }
`;
