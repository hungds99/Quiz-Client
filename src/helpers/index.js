import { AppConfig, ImageLink } from "../configs";

function getImageLink(imageUrl) {
  if (imageUrl) {
    return `${AppConfig.SERVER_URL}${imageUrl}`;
  }
  return ImageLink.defaultImage;
}

const AppHelper = {
  getImageLink,
};

export default AppHelper;
