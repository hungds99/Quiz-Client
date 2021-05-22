import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { NotiTypeEnum } from "../../../constants";
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

const passwordSchema = yup.object().shape({
  password: yup.string().required("Password is a required field"),
  newPassword: yup
    .string()
    .required("New password is a required field")
    .min(6, "New password must be exactly 6 digits"),
  confirmPassword: yup
    .string()
    .required("Confirm password is a required field")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

function ChangePassword() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const credentials = useSelector(UserSelectors.selectCredentials);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(passwordSchema) });

  const onSubmit = async (passwordData) => {
    let { data } = await UserServices.changePassword(
      credentials.id,
      passwordData
    );
    if (data.code === 200 && data.result) {
      dispatch(
        UIActions.showNotification(
          NotiTypeEnum.success,
          "Password has been changed"
        )
      );
      reset();
    } else {
      dispatch(
        UIActions.showNotification(
          NotiTypeEnum.error,
          "Password is not correct"
        )
      );
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Old password"
          type="password"
          fullWidth
          margin="normal"
          name="password"
          {...register("password")}
          error={errors && errors.password ? true : false}
          helperText={errors && errors.password && errors.password.message}
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          name="newPassword"
          {...register("newPassword")}
          error={errors && errors.newPassword ? true : false}
          helperText={
            errors && errors.newPassword && errors.newPassword.message
          }
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          name="confirmPassword"
          {...register("confirmPassword")}
          error={errors && errors.confirmPassword ? true : false}
          helperText={
            errors && errors.confirmPassword && errors.confirmPassword.message
          }
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

ChangePassword.propTypes = {};

export default ChangePassword;
