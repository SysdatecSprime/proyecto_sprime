import { useRef, useState } from "react";
import styled from "styled-components";
import * as AiIcons from "react-icons/ai";
import { FileListToBase64List, validateFiles } from "../utils/files";

export default function DragDropFile({
  multiple = false,
  label = "Arrastra",
  fileType,
  setFiles,
}) {
  const [dragActive, setDragActive] = useState(false);
  const [currentFiles, setCurrentFiles] = useState([]);

  const inputRef = useRef(null);

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (validateFiles(e.dataTransfer.files, fileType)) {
      setFiles(async currentFiles => {
        const files = [...e.dataTransfer.files];
        const base64 = await FileListToBase64List(e.dataTransfer.files);
        const base64withName = base64.map((base64, index) => {
          const { name } = files[index];
          return {
            nombre: name,
            contenido: base64.split("base64,")[1],
          };
        });
        const resolvedCurrentFiles = await currentFiles;
        const newFiles = [...resolvedCurrentFiles, ...base64withName];
        return newFiles;
      });
      setCurrentFiles(currentFiles => [
        ...currentFiles,
        ...e.dataTransfer.files,
      ]);
    } else {
      alert("Formato de archivo no válido");
    }
  };

  const handleChange = e => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setFiles(async currentFiles => {
        const base64 = await FileListToBase64List(e.target.files);
        const base64withName = base64.map((base64, index) => ({
          nombre: e.target.files[index].name,
          contenido: base64.split("base64,")[1],
        }));
        const resolvedCurrentFiles = await currentFiles;
        const newFiles = [...resolvedCurrentFiles, ...base64withName];
        return newFiles;
      });
      setCurrentFiles(currentFiles => [...currentFiles, ...e.target.files]);
    }
  };

  const onButtonClick = () => {
    if (currentFiles.length > 0) return;
    inputRef.current.click();
  };

  return (
    <DragDrop
      files={currentFiles}
      onDragEnter={handleDrag}
      onDrop={handleDrop}
      onDragOver={e => {
        e.preventDefault();
      }}
      onClick={onButtonClick}>
      <input
        type="file"
        multiple={multiple}
        onChange={handleChange}
        ref={inputRef}
        accept={fileType}
      />

      <p>{label} ó</p>
      <span className="upload-button">Sube el archivo</span>

      {currentFiles.length > 0 && (
        <>
          <div className="file-list">
            {Array.from(currentFiles).map(file => (
              <p key={file.name}>
                <AiIcons.AiOutlineFileDone className="icon-archivo" />
                {file.name}
              </p>
            ))}
          </div>
          <Flex>
            <button
              className="change-file"
              onClick={() => {
                setCurrentFiles([]);
                setFiles([]);
              }}>
              <span>Cambiar archivos</span>
            </button>
            <button
              className="change-file"
              onClick={() => {
                inputRef.current.click();
              }}>
              <span>Añadir archivos</span>
            </button>
          </Flex>
        </>
      )}
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}></div>
      )}
    </DragDrop>
  );
}

const DragDrop = styled.button`
  border: none;
  position: relative;
  background: transparent;
  cursor: ;
  width: 100%;
  height: 43%;
  border: 1px dashed #0b5ed7fe;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  input[type="file"] {
    display: none;
  }

  p {
    margin: 0;
    font-size: 1.2rem;
  }

  .upload-button {
    margin-top: 10px;
    font-size: 1.2rem;
    cursor: default;
    &:hover {
      text-decoration: underline;
    }
  }

  label.drag-active {
    background-color: #ccc;
    border-radius: 15px;
  }

  #drag-file-element {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: #ccc;
    border-radius: 15px;
  }

  .file-list {
    position: absolute;
    width: 100%;
    padding: 20px 0;
    height: 80%;
    top: 0;
    background: #fff;
    overflow: hidden;
    border-radius: 15px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
      height: 100%;
    }
    &::-webkit-scrollbar-thumb {
      background: #e7e7e7;
      border-radius: 10px;
      height: 3px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #d7d7d7;
    }

    p {
      text-align: left;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: block;
      width: 90%;
      margin: 0;
      font-size: 1rem;
    }
  }

  .change-file {
    background: #4141ff;

    border: none;
    padding: 10px 20px;
    font-size: 0.8rem;
    &:nth-child(1) {
      border-bottom-left-radius: 15px;
    }
    &:nth-child(2) {
      border-bottom-right-radius: 15px;
    }
    width: 100%;

    cursor: pointer;

    span {
      color: #fff;
      display: block;
      text-align: center;
      font-size: 0.8rem;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  position: absolute;
  gap: 3px;
  bottom: 0;
`;
