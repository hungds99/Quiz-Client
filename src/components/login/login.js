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
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useHistory } from "react-router-dom";
import * as yup from "yup";
import { RoutePath } from "../../configs";
import { NotiTypeEnum, TypeActions } from "../../constants";
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

const loginSchema = yup.object().shape({
  email: yup.string().required("Email is a required field"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(6, "Password must be exactly 6 digits"),
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const [loginError, setLoginError] = useState({
    error: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (loginParams) => {
    setLoading(true);
    let { data } = await UserServices.login(loginParams);
    if (data.code === 200) {
      localStorage.setItem("token", data.result.token);
      const decodedToken = jwtDecode(data.result.token);
      // Lấy thông tin user từ token lưu vào store
      dispatch({
        type: TypeActions.SET_CREDENTIALS,
        payload: decodedToken.user,
      });

      history.push(RoutePath.home);
      dispatch(
        UIActions.showNotification(NotiTypeEnum.info, "Welcome to Quiz Online")
      );
    } else {
      setLoginError({
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
                {t("Sign in system")}
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                {t("Welcome to React")}
              </Typography>
            </Box>

            <TextField
              fullWidth
              label={t("Email address")}
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
              label={t("Password")}
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
              {...register("password")}
              error={errors && errors.password ? true : false}
              helperText={errors && errors.password && errors.password.message}
            />
            <Box display="flex" justifyContent="center">
              <FormHelperText error={loginError.error}>
                {loginError.message}
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
                {t("Sign in")}
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </Box>
            <Typography color="textSecondary" variant="body1">
              {t("Do not have an account?")}
              <Link component={RouterLink} to={RoutePath.register} variant="h6">
                {t("Sign up")}
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </Page>
  );
};

export default Login;
