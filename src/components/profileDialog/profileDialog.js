import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TypeActions } from "../../constants";
import AppHelper from "../../helpers";
import UserSelectors from "../../redux/selectors/userSelectors";
import UserServices from "../../services/userServices";
import TabPanel from "../tabPanel/tabPanel";
import ChangePassword from "./changePassword/changePassword";
import General from "./general/general";

const useStyles = makeStyles((theme) => ({
  userInfo: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: 20,
    cursor: "pointer",
  },
  avatar: {
    padding: 1,
    border: "2px dotted #bcb6cc",
    borderRadius: "50%",
  },
  avatarSize: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  tab: {
    "& .MuiTab-wrapper": {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
  },
}));

function ProfileDialog({ isOpenProfile, onCloseProfile }) {
  const classes = useStyles();
  const avatarRef = useRef();
  const dispatch = useDispatch();

  const credentials = useSelector(UserSelectors.selectCredentials);

  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangeAvatar = async (e) => {
    let formData = new FormData();
    formData.append("id", credentials.id);
    formData.append("avatar", e.target.files[0]);
    let { data } = await UserServices.uploadAvatar(formData);
    if (data.code === 200) {
      dispatch({ type: TypeActions.SET_CREDENTIALS, payload: data.result });
    }
  };

  return (
    <>
      <Dialog
        open={isOpenProfile}
        maxWidth="xs"
        fullWidth={true}
        onClose={() => onCloseProfile()}
      >
        <DialogTitle disableTypography>
          <Typography variant="h4">Profile</Typography>
        </DialogTitle>
        <DialogContent>
          <Box className={classes.userInfo}>
            <Tooltip title="Update Avatar" placement="right">
              <Box className={classes.avatar}>
                <Avatar
                  className={classes.avatarSize}
                  onClick={() => avatarRef.current.click()}
                  src={AppHelper.getImageLink(credentials.avatar)}
                >
                  H
                </Avatar>
              </Box>
            </Tooltip>
            <input
              ref={avatarRef}
              type="file"
              name="avatar"
              accept="image/*"
              hidden
              onChange={handleChangeAvatar}
            />
          </Box>
          <Paper square>
            <Tabs
              value={tabValue}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              onChange={handleChangeTab}
            >
              <Tab
                icon={<AccountBoxIcon />}
                label={"General"}
                className={classes.tab}
              />
              <Tab
                icon={<VpnKeyIcon />}
                label="Change Password"
                className={classes.tab}
              />
            </Tabs>
          </Paper>
          <TabPanel value={tabValue} index={0}>
            <General />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ChangePassword />
          </TabPanel>
        </DialogContent>
      </Dialog>
    </>
  );
}

ProfileDialog.propTypes = {};

export default ProfileDialog;
