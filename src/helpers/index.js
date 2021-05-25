import { ImageLink } from "../configs";

function getImageLink(imageUrl) {
  if (imageUrl) {
    return imageUrl;
  }
  return ImageLink.defaultImage;
}

const AppHelper = {
  getImageLink,
};

export default AppHelper;
