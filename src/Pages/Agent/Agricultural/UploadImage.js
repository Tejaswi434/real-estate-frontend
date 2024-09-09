import Axios from "axios";

const UploadImage = async (imageFile) => {
  const url = `https://api.cloudinary.com/v1_1/ddv2y93jq/image/upload`;

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "sni4p6lt"); // You'll need to set an unsigned upload preset in Cloudinary

  try {
    const response = await Axios.post(url, formData);

    try {
      console.log(response.data.secure_url);
      const v = response.data.secure_url;

      console.log(response.data.secure_url);
    } catch (error) {
      console.log("data error");
    }
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export default UploadImage;
