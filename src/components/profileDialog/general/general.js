import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { NotiTypeEnum, TypeActions } from "../../../constants";
import { UIActions } from "../../../redux/actions/uiActions";
import UserSelectors from "../../../redux/selectors/userSelectors";
import UserServices from "../../../services/userServices";

const useStyles = makeStyles(() => ({
  profileActions: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

const userInfoSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is a required field")
    .trim()
    .max(12, "Username must be less than 12 digits")
    .matches(/^[a-zA-Z0-9]+$/g, "Username is not valid in [a-z A-Z 0-9]"),
  email: yup.string().required("Email is a required field"),
});

function General() {
  const classes = useStyles();
  const credentials = useSelector(UserSelectors.selectCredentials);
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userInfoSchema),
  });

  useEffect(() => {
    register("username");
    register("email");
  }, [register]);

  useEffect(() => {
    if (credentials) {
      setUserInfo((prev) => ({
        ...prev,
        username: credentials.username,
        email: credentials.email,
      }));
      setValue("username", credentials.username, { shouldValidate: true });
      setValue("email", credentials.email, { shouldValidate: true });
    }
  }, [credentials, setValue]);

  const onSubmit = async (userData) => {
    let { data } = await UserServices.update(credentials.id, userData);
    if (data.code === 200 && data.result) {
      dispatch(
        UIActions.showNotification(
          NotiTypeEnum.success,
          "Update user successfully"
        )
      );
      dispatch({
        type: TypeActions.SET_CREDENTIALS,
        payload: data.result,
      });
    } else {
      dispatch(
        UIActions.showNotification(NotiTypeEnum.error, "Updated user failure")
      );
    }
  };

  const handleChangeInput = (e) => {
    setValue(e.target.name, e.target.value, { shouldValidate: true });
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          name="username"
          value={userInfo.username}
          onChange={handleChangeInput}
          error={errors && errors.username ? true : false}
          helperText={errors && errors.username && errors.username.message}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          name="email"
          value={userInfo.email}
          onChange={handleChangeInput}
          error={errors && errors.email ? true : false}
          helperText={errors && errors.email && errors.email.message}
        />
        <Box className={classes.profileActions}>
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="primary"
            disableElevation
          >
            Save Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
}

General.propTypes = {};

export default General;
