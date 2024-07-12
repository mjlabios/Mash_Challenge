export const validations: any = {
    username: {
      AE: {
        validate: {
          isValid: (value: string) =>
            value === "" ||
            /^[a-zA-Z0-9]{5,}$/.test(value) ||
            "validation.AEUsernameMessage",
        },
      },
      IN: {
        validate: {
          isValid: (value: string) =>
            value === "" ||
            /^[a-zA-Z]{6,}$/.test(value) ||
            "validation.INUsernameMessage",
        },
      },
      ES: {
        validate: {
          isValid: (value: string) =>
            value === "" ||
            /^[a-zA-Z0-9]{7,}$/.test(value) ||
            "validation.ESUsernameMessage",
        },
      },
      DEFAULT: {
        validate: {
          isValid: (value: string) =>
            value === "" ||
            /^[a-zA-Z0-9]{5,}$/.test(value) ||
            "validation.DefaultUsernameMessage",
        },
      },
    },
    email: {
      validate: {
        isValid: (value: string) =>
          value === "" ||
          /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(value) ||
          "validation.emailMessage",
      },
    },
  };