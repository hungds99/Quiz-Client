import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Box, IconButton } from "@material-ui/core";

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <Box position="absolute" left={-10} top="50%">
      <IconButton color="primary" onClick={onClick}>
        <ArrowBackIcon />
      </IconButton>
    </Box>
  );
};

export default PrevArrow;
