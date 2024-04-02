export const linking = {
    //as in android manifest
    prefixes: ['splendidplus://', 'deeplinking://', 'https://splendidplus.com'],
    config: {
      screens: {
        Facebook: {
          path: 'Facebook/:authresponse',
        },
        Youtube: {
          path: 'Youtube/:authresponse',
        },
      },
    },
  };