import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { PATH } from "@/navigation/routes";
import CountryPicker from "@/components/CountryPicker";
import { axiosService } from "@/services/axiosService";
import { ENDPOINTS } from "@/constants/endpoints";
import { ERROR, SUCCESS } from "@/constants/status";
import FormTextField from "@/components/FormTextField";
import { DEFAULTS } from "@/constants/defaults";
import { validations } from "@/constants/validations";

export default function Profile({ user }: any) {
  const router = useRouter();

  const translate = useTranslations();
  const currentUser =
    user !== undefined ? user : useSelector((state: any) => state.currentUser);

  const {
    response: executeRegisterResponse,
    loading: executeRegisterLoading,
    execute: executeRegister,
  } = axiosService({
    url: ENDPOINTS.POST_CHANGEPASS,
    method: "POST",
  });

  useEffect(() => {
    if (!executeRegisterLoading && executeRegisterResponse) {
      const { data, status, errorCode } = executeRegisterResponse;
      if (status === SUCCESS) {
        toast.success(translate("message.SUCCESS_CHANGE_PASSWORD"));
        router.push(PATH.LOGIN);
      }
      if (status === ERROR) {
        toast.error(
          translate(`message.${errorCode ? errorCode : "GENERIC_ERROR"}`)
        );
      }
    }
  }, [executeRegisterLoading, executeRegisterResponse]);

  const { control } = useForm({
    defaultValues: DEFAULTS.PROFILE,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let form = {
      username: currentUser.USERNAME,
      oldPassword: data.get("oldpass"),
      newPassword: data.get("newpass"),
    };
    console.log(JSON.stringify(form))
    executeRegister(form);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Box sx={{ mt: 1 }}>
          <Grid container spacing={2} justifyContent={"center"}>
            <Grid item>
              <Typography component="h1" variant="h5">
                <b>
                {translate("screens.profile.name")}: {currentUser.LAST_NAME}, {currentUser.FIRST_NAME}
                </b>
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="h1" variant="h5">
              {translate("screens.profile.email")}: {currentUser.EMAIL}
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="h1" variant="h5">
              {translate("screens.profile.username")}: {currentUser.USERNAME}
              </Typography>
            </Grid>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormTextField
                    required
                    control={control}
                    fullWidth
                    id="oldpass"
                    label={translate("screens.profile.oldPass")}
                    name="oldpass"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    required
                    control={control}
                    fullWidth
                    id="newpass"
                    label={translate("screens.profile.newPass")}
                    name="newpass"
                    rules={validations.email}
                    autoComplete="off"
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                {translate("screens.profile.changePass")}
              </Button>
            </Box>
            <Button
              onClick={(e) => {
                router.push(PATH.LOGIN);
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {translate("screens.profile.logOut")}
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
