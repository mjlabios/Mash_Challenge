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
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { PATH } from "@/navigation/routes";
import CountryPicker from "@/components/CountryPicker";
import { setUser } from "@/redux/actions/actions";
import { axiosService } from "@/services/axiosService";
import { ENDPOINTS } from "@/constants/endpoints";
import { ERROR, SUCCESS } from "@/constants/status";
import { encryptString } from "@/utils/encryption";
import FormTextField from "@/components/FormTextField";
import { DEFAULTS } from "@/constants/defaults";
import { validations } from "@/constants/validations";
import { getUsernameRules } from "@/utils/helper";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.linkedin.com/in/mjlabios/">
        Mark Labios
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login(props: any) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [country, setCountry] = router.locale == "en" ? React.useState("AE"): router.locale == "hi" ? React.useState("IN"): router.locale == "es" ? React.useState("ES"): React.useState("AE")
  const translate = useTranslations();

  const {
    execute: executeAuth,
    response: executeAuthResponse,
    loading: executeAuthLoading,
  } = axiosService({
    url: ENDPOINTS.POST_LOGIN,
    method: "POST",
  });

  const { control, watch } = useForm({
    defaultValues: DEFAULTS.LOGIN,
  });

  useEffect(() => {
    if (!executeAuthLoading && executeAuthResponse) {
      const { data, status, errorCode } = executeAuthResponse;
   
      if (status === SUCCESS) {
        toast.success(translate("message.SUCCESS_LOGGEDIN"));
        dispatch(setUser(data));
        router.push(PATH.PROFILE);
      }
      if (status === ERROR) {
        toast.error(
          translate(`message.${errorCode ? errorCode : "GENERIC_ERROR"}`)
        );
      }
    }
  }, [executeAuthLoading, executeAuthResponse]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let form = {
      username: data.get("username"),
      password: data.get("password"),
    };
    let encryptedAuth = {
      Authorization: `Bearer ${encryptString(JSON.stringify(form))}`,
    };
    executeAuth({}, encryptedAuth);
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
          MASHREQ CHALLENGE
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <CountryPicker country={country} setCountry={setCountry} />
          <FormTextField
            margin="normal"
            required
            fullWidth
            control={control}
            id="username"
            label={translate("screens.login.username")}
            name="username"
            autoComplete="email"
            autoFocus
            rules={
              watch("username").includes("@")
                ? validations.email
                : getUsernameRules(country)
            }
          />
          <FormTextField
            margin="normal"
            required
            fullWidth
            control={control}
            name="password"
            label={translate("screens.login.password")}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {translate("screens.login.signIn")}
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={PATH.REGISTRATION} variant="body2">
                {translate("screens.login.signUp")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
