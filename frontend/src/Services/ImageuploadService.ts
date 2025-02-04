import axios from "axios";

const imageUploadEndpoint = "http://localhost:5255/api/ImageUpload";

const ImageUploadService = (() => {
    const uploadImage = async (image: File) => {
        const formData = new FormData();
        formData.append("file", image);

        try {
            const response = await axios.post(imageUploadEndpoint, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200 && response.data.filePath) {
                return response.data.filePath; 
            } else {
                throw new Error("Failed to upload the image.");
            }
        } catch (error) {
            console.error("Image upload failed:");
            throw error;
        }
    };

    return { uploadImage };
})();

export default ImageUploadService;
