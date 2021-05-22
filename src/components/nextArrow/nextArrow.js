import { Box, IconButton } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <Box position="absolute" right={-10} top="50%">
      <IconButton color="primary" onClick={onClick}>
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
};

export default NextArrow;
