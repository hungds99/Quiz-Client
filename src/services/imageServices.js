import { AxiosMediaNetwork } from "../api";
import { APIRouter } from "../configs";

const ImageServices = {
  upload: async (imageParam) => {
    return await AxiosMediaNetwork.post(APIRouter.image.upload, imageParam);
  },
};
export default ImageServices;
