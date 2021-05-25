import { Box, Container, Typography } from "@material-ui/core";
import { ImageLink } from "../../configs";

const NotFound = () => (
  <>
    <Box
      bgcolor="background.default"
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
      paddingTop="25px"
      paddingBottom="30px"
    >
      <Container maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h1">
          404: The page you are looking for isn’t here
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          You either tried some shady route or you came here by mistake.
          Whichever it is, try using the navigation
        </Typography>
        <Box textAlign="center">
          <img
            alt="Under development"
            src={ImageLink.notFound}
            style={{
              marginTop: 50,
              display: "inline-block",
              maxWidth: "100%",
              width: 560,
            }}
          />
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;
