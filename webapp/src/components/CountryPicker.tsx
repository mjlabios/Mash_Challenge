import React from "react";
import { Select, MenuItem } from "@mui/material";
import { useRouter } from "next/router";

import { countries } from "../utils/countries";

interface CountrySelectType {
  country: any;
  setCountry: any;
}

const CountryPicker = (props: CountrySelectType) => {
  const { country, setCountry } = props;
  const router = useRouter();
  let usernameLength = 5

  return (
    <Select
      value={country}
      onChange={(e) => {
        let locale = "en";
        switch (e.target.value) {
          case "IN":
            locale = "hi";
            break;
          case "ES":
            locale = "es";
            break;
          case "AE":
          default:
            locale = "en";
            break;
        }
        router.push(router.pathname, router.asPath, { locale: locale });

        router.events.on("routeChangeComplete", () => {
          router.reload();
        });
        setCountry(e.target.value);
      }}
      style={{ width: "100%" }}
    >
      {countries.map((country: any) => (
        <MenuItem key={country.name} value={country.code}>
          <img src={country.image} style={{ width: 21, marginRight: 12 }} />
          {country.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CountryPicker;
