import {
  extendTheme, 
  ThemeConfig, 
} from '@chakra-ui/react';

import Color from './color';

const theme = {
  fonts: {
    heading: "'Barlow', sans-serif",
    avatar: "'Barlow', sans-serif",
    body: "'Lato', sans-serif",
    branding: "'Cabin', sans-serif",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "light" ? "#f9fafb" : '#212121',
        color: props.colorMode === "light" ? Color.polar[0] : Color.snow[1],
      },
      '.landing-nav': {
        bg: 'transparent',
      },
      nav: {
        bg: props.colorMode === "light" ? "#fff" : '#3a3a3a',
      },
      '.landing-link': {
        fontSize: "14px !important",
        color: props.colorMode === "light" ? "rgba(0, 0, 0, 0.2) !important" : "rgba(255, 255, 255, 0.85) !important",
        ':hover': {
          color: props.colorMode === "light" ? "rgba(0, 0, 0, 1) !important" : "rgba(255, 255, 255, 1) !important",
          textDecoration: 'none !important',
        }
      },
      '.branding': {
        color: Color.aurora[3],
        fontFamily: "'Cabin', sans-serif !important",

      },
      '.dashboard-nav': {
        borderRight: `1px solid ${props.colorMode === "light" ? '#e5e7eb' : 'rgba(0, 0, 0, 0.5)'}`
      },
      '.bottom-border': {
        borderBottom: `1px solid ${props.colorMode === "light" ? '#e5e7eb' : 'rgba(0, 0, 0, 0.5)'}`,
      },
      '.general-border': {
        border: `1px solid ${props.colorMode === "light" ? '#e5e7eb' : 'rgba(0, 0, 0, 0.5)'}`,
      },
      '.divider-line': {
        background: `${props.colorMode === "light" ? '#e5e7eb' : 'rgba(0, 0, 0, 0.5)'} !important`,
      },
      '.card-border': {
        border: `1px solid ${props.colorMode === "light" ? '#e5e7eb' : 'rgba(0, 0, 0, 0.5)'}`,
        borderRadius: '12px',
        bg: '#fff',
      },
      ".nav-active": {
        color:  props.colorMode === "light" ? `#439746 !important` : `white !important`,
        borderLeft: `2px solid !important`,
        borderRadius: '0 !important',
        width: '50px !important',
        height: '50px !important',
      },
      ".nav-option": {
        color:  props.colorMode === "light" ? `rgba(0, 0, 0, 0.25) !important` : `rgba(255, 255, 255, 0.25) !important`,
        paddingLeft: '2px !important',
        width: '50px !important',
        height: '50px !important',
      },
      ".user-menu": {
        color:  props.colorMode === "light" ? `rgba(0, 0, 0, 0.45) !important` : `rgba(255, 255, 255, 0.45) !important`,
        ':hover': {
          color:  props.colorMode === "light" ? `rgba(0, 0, 0, 0.8) !important` : `rgba(255, 255, 255, 0.8) !important`,
        }
      }
    })
  },
  components: {
    Divider: {
      baseStyle: ({colorMode}) => ({
        borderColor: colorMode === 'light' ? '#afafaf' : '#0f0f0f'
      })
    },
    Input: {
      baseStyle: ({colorMode}) => {
        return {field: {
          bg: colorMode === "light" ? "#fff" : "#2f2f2f",
          borderColor: colorMode === "light" ? "#e0e0e0" : "#0f0f0f",
          borderWidth: 1,
          ':focus': {
            bg: colorMode === "light" ? "#fff" : "#2f2f2f",
            borderColor: colorMode === "light" ? "#a0a0a0" : "#0f0f0f",
            }
        }}
      },
      variants: {},
    }
  }
};


const config:ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export default extendTheme({config, ...theme});

