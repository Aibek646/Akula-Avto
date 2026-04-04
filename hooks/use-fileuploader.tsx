"use client";

import { FileRejection, useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import axios, { AxiosProgressEvent } from "axios";

interface UseFileUploaderProps {
  uploadApiEndpoint: string;
  onFileUrlsReceived: (fileUrls: string[]) => void;
}

interface UseFileLoaderResult {
  getRootProps: ReturnType<typeof useDropzone>["getRootProps"];
  getInputProps: ReturnType<typeof useDropzone>["getInputProps"];
  isDragActive: ReturnType<typeof useDropzone>["isDragActive"];
  files: File[];
  uploading: boolean;
  uploadProgress: number;
  // removeFile: (fileToRemove: File) => void;
  fileRejections: ReturnType<typeof useDropzone>["fileRejections"];
}

const useFileUploader = ({
  uploadApiEndpoint,
  onFileUrlsReceived,
}: UseFileUploaderProps): UseFileLoaderResult => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const uploadFilesToApi = useCallback(async (filesToUpload: File[]) => {
    setUploading(true);
    setUploadProgress(0);
    try {
      const formData = new FormData();
      filesToUpload.forEach((file) => {
        formData.append("files", file);
      });
      const response = await axios.post(uploadApiEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });
      if (response.status !== 200) {
        toast("Upload failed", {
          description: "Please upload a valid image file",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        return;
      }
      const filesUrls = response.data?.files.map((file: any) => file.url);
      if (!filesUrls || !Array.isArray(filesUrls)) {
        toast("Upload failed", {
          description: "Please upload a valid image file",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        return;
      }
      console.log(filesUrls, "fileurls");
      onFileUrlsReceived(filesUrls);
      setFiles([]);
    } catch (error) {
      toast("Upload failed", {
        description: "Please upload a valid image file",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } finally {
      setUploading(false);
    }
  }, []);

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      if (rejectedFiles.length > 0) {
        toast("File type not supported", {
          description: "Please upload a valid image file",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        return;
      }
      await uploadFilesToApi(acceptedFiles);
    },
    [uploadFilesToApi],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
        "image/wepb": [".webp"],
      },
      maxFiles: 7,
      maxSize: 10 * 1024 * 1024,
    });
  return {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
    files,
    uploading,
    uploadProgress,
  };
};

export default useFileUploader;
