import Axios from "axios";

const Upload = async (imageFile) => {
  const url = `https://api.cloudinary.com/v1_1/ddv2y93jq/image/upload`;

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "sni4p6lt"); // You'll need to set an unsigned upload preset in Cloudinary

  try {
    console.log("Hello");
    const response = await Axios.post(url, formData);
    return response.data.secure_url;
  } catch (error) {
    console.log("data error", error);
  }
};

export default Upload;
