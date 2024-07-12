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
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import { PATH } from "../../navigation/routes";
import FormTextField from "@/components/FormTextField";
import { DEFAULTS } from "@/constants/defaults";
import { axiosService } from "@/services/axiosService";
import { ERROR, SUCCESS } from "@/constants/status";
import { ENDPOINTS } from "@/constants/endpoints";
import { getUsernameRules } from "@/utils/helper";
import CountryPicker from "@/components/CountryPicker";
import { validations } from "@/constants/validations";

export default function Registration() {
  const translate = useTranslations();
  const router = useRouter();
  const [country, setCountry] =
    router.locale == "en"
      ? React.useState("AE")
      : router.locale == "hi"
      ? React.useState("IN")
      : router.locale == "es"
      ? React.useState("ES")
      : React.useState("AE");

  const {
    response: executeRegisterResponse,
    loading: executeRegisterLoading,
    execute: executeRegister,
  } = axiosService({
    url: ENDPOINTS.POST_REGISTRATION,
    method: "POST",
  });

  useEffect(() => {
    if (!executeRegisterLoading && executeRegisterResponse) {
      const { data, status, errorCode } = executeRegisterResponse;
      if (status === SUCCESS) {
        toast.success(translate("message.SUCCESS_REGISTERED"));
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
    defaultValues: DEFAULTS.REGISTRATION,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let form = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    };

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
        <Typography component="h1" variant="h5">
          {translate("screens.registration.title")}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormTextField
                autoComplete="given-name"
                control={control}
                name="firstName"
                required
                fullWidth
                id="firstName"
                label={translate("screens.registration.firstName")}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                required
                control={control}
                fullWidth
                id="lastName"
                label={translate("screens.registration.lastName")}
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <CountryPicker country={country} setCountry={setCountry} />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                required
                control={control}
                fullWidth
                id="username"
                label={translate("screens.registration.username")}
                name="username"
                autoComplete="off"
                rules={getUsernameRules(country)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                required
                control={control}
                fullWidth
                id="email"
                label={translate("screens.registration.email")}
                name="email"
                rules={validations.email}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                required
                control={control}
                fullWidth
                name="password"
                label={translate("screens.registration.password")}
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {translate("screens.registration.signUp")}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={PATH.LOGIN} variant="body2">
                {translate("screens.registration.loginBack")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
