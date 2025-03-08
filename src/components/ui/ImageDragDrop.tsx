import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CircleX } from "../../assets/icons";

interface ImageDragDropProps {
  dataUrl: string | null;
  onChange: (dataUrl: string) => void;
}

const ImageDragDrop: React.FC<ImageDragDropProps> = ({ dataUrl, onChange }) => {
  const [preview, setPreview] = useState<string | null>(dataUrl);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      // checking if its image
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64 = reader.result as string;
          setPreview(base64);
          onChange(base64);
        };

        reader.readAsDataURL(file);
      } else {
        alert("Please upload a valid image file");
      }
    },
    [onChange]
  );

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onChange('');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="h-full w-full border-2 border-dashed border-gray-400 rounded-md flex justify-center items-center bg-gray-50"
    >
      <input {...getInputProps()} />
      {preview ? (
        isDragActive ? (
          <div className="w-[100%s]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              height="50"
              width="50"
              fill="currentColor"
            >
              <path d="M1 14.5C1 12.1716 2.22429 10.1291 4.06426 8.9812C4.56469 5.044 7.92686 2 12 2C16.0731 2 19.4353 5.044 19.9357 8.9812C21.7757 10.1291 23 12.1716 23 14.5C23 17.9216 20.3562 20.7257 17 20.9811L7 21C3.64378 20.7257 1 17.9216 1 14.5ZM16.8483 18.9868C19.1817 18.8093 21 16.8561 21 14.5C21 12.927 20.1884 11.4962 18.8771 10.6781L18.0714 10.1754L17.9517 9.23338C17.5735 6.25803 15.0288 4 12 4C8.97116 4 6.42647 6.25803 6.0483 9.23338L5.92856 10.1754L5.12288 10.6781C3.81156 11.4962 3 12.927 3 14.5C3 16.8561 4.81833 18.8093 7.1517 18.9868L7.325 19H16.675L16.8483 18.9868ZM13 13V17H11V13H8L12 8L16 13H13Z"></path>
            </svg>
          </div>
        ) : (
          <div className="relative w-full h-full flex justify-center items-center">
            <img
              src={preview}
              alt="Preview"
              className="object-contain max-h-full max-w-full"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
            >
              <CircleX size={24} className="text-gray-500 hover:text-red-500 cursor-pointer" />
            </button>
          </div>
        )
      ) : (
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="text-gray-600 font-semibold">Drag and drop an image here</p>
          <p className="text-gray-500">or click to browse</p>
        </div>
      )}
    </div>
  );
};

export default ImageDragDrop;
