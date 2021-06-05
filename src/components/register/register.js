import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormHelperText,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useHistory } from "react-router-dom";
import * as yup from "yup";
import { RoutePath } from "../../configs";
import { NotiTypeEnum } from "../../constants";
import { UIActions } from "../../redux/actions/uiActions";
import UserServices from "../../services/userServices";
import { Page } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  wrapper: {
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is a required field")
    .trim()
    .max(12, "Username must be less than 12 digits")
    .matches(/^[a-zA-Z0-9]+$/g, "Username is not valid in [a-z A-Z 0-9]"),
  email: yup.string().required("Email is a required field"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(6, "Password must be exactly 6 digits"),
});

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState({
    error: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (registerParams) => {
    setLoading(true);
    let { data } = await UserServices.register(registerParams);
    if (data.code === 200) {
      history.push(RoutePath.login);
      dispatch(
        UIActions.showNotification(NotiTypeEnum.info, "Register successfully")
      );
    } else {
      setRegisterError({
        error: true,
        message: data.message,
      });
      dispatch(
        UIActions.showNotification(
          NotiTypeEnum.error,
          "Errors, please try again."
        )
      );
    }
    setLoading(false);
  };

  return (
    <Page className={classes.root}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={3}>
              <Typography color="textPrimary" variant="h2">
                Create new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your email to create new account
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              name="username"
              variant="outlined"
              {...register("username")}
              error={errors && errors.username ? true : false}
              helperText={errors && errors.username && errors.username.message}
            />
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              type="email"
              variant="outlined"
              {...register("email")}
              error={errors && errors.email ? true : false}
              helperText={errors && errors.email && errors.email.message}
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
              {...register("password")}
              error={errors && errors.password ? true : false}
              helperText={errors && errors.password && errors.password.message}
            />
            <Box display="flex" justifyContent="center">
              <FormHelperText error={registerError.error}>
                {registerError.message}
              </FormHelperText>
            </Box>
            <Box my={2} className={classes.wrapper}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={loading}
              >
                Sign up
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </Box>
            <Typography color="textSecondary" variant="body1">
              Have an account?{" "}
              <Link component={RouterLink} to={RoutePath.login} variant="h6">
                Sign in
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </Page>
  );
};

export default Register;
