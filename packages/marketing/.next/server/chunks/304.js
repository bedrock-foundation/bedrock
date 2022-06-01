"use strict";
exports.id = 304;
exports.ids = [304];
exports.modules = {

/***/ 7304:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_Navigation)
});

// UNUSED EXPORTS: getServerSideProps

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@emotion/styled"
var styled_ = __webpack_require__(1480);
var styled_default = /*#__PURE__*/__webpack_require__.n(styled_);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./src/styles/Colors.ts
var Colors = __webpack_require__(384);
;// CONCATENATED MODULE: ./public/bedrock-logo.png
/* harmony default export */ const bedrock_logo = ({"src":"/_next/static/media/bedrock-logo.9bb8c73b.png","height":1024,"width":1024,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAZlBMVEXe3t7X19fV1dbU1NTLzMzFxcXDxMSysrKurq+tra2qqquYmJiSkpOQkJCBgYFtbW1XV1c9Pj4jJCUfICEeHyAdHyAdHiAaHB0WGBkTFBYQEhQOEBIFCAsEBwoDBgkAAwYAAAMAAABOEGVrAAAARUlEQVR42iXKVxKAIBAE0TFhzgq6guvc/5JSRf/2g8q5P8G/EMYuenA29crjA0cUbbkQHHKTNdziqrp+okuYolCx1t0afstbBaPK2b41AAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./public/bedrock-logo-wide.png
/* harmony default export */ const bedrock_logo_wide = ({"src":"/_next/static/media/bedrock-logo-wide.1c68f47b.png","height":123,"width":1583,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAIElEQVR4nGP89+9fOwMDwxMg/g3E34CYE4i5gBhEfwYAqPMHZ3xoaTgAAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./public/twitter-white.png
/* harmony default export */ const twitter_white = ({"src":"/_next/static/media/twitter-white.584fcdb4.png","height":242,"width":276,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAAkUlEQVR42k3NMWpCQRAG4I0kZwikyHlCIKdIrpBC8AB6FUs7SwUbj2BhLVaKFvp253u6sIJfM8Mw808qfB+7eE1NMEaPWQ6/CVMsc/jswju6/g594b9ejNpFtUVpC6ccPurCH3LfIFrdHK7x1v5a12GLv9Q+GKbq3MWg8IPzU8o8PeTwhRUCu2Cy2F9f0l1hcAN61LKFeHTYrAAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./public/github.png
/* harmony default export */ const github = ({"src":"/_next/static/media/github.f3deb19a.png","height":745,"width":770,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuBnYAAAAAbElEQVR42h3IMQ7BYAAG0G9oDBIWAydoD2G2icToOqbG7h42N9DNINE4QI9gMXj1R972Ihqdb9FpJGq9wbsY9Oq46cXSSjx1MWrFn9ZYwklURRyVuOsdTFS2Ph6xcXU2szAW64i9i6m5l538AExAXM1ozmLtAAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./src/components/Navigation.tsx










const Breakpoint = "1080px";
const Container = (styled_default()).div`
  position: absolute;
  width: fill-available;
  padding: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;

  @media screen and (max-width: ${Breakpoint}) {
    padding: 24px;
  }
`;
const HoverLink = styled_default()((link_default()))`
  &:hover {
    cursor: pointer;
  }
`;
const GitHubLink = (styled_default()).a`
  &:hover {
    cursor: pointer;
  }
`;
const ImageContainer = (styled_default()).div`
  position: relative;
  width: ${(props)=>props.width
};
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
const BedrockLogo = styled_default()(ImageContainer)`
  border: 1px solid ${Colors/* default.Purple */.Z.Purple};
  border-radius: 8px;
`;
const BedrockLogoWide = styled_default()(ImageContainer)`
  width: 250px;
  margin-left: 16px;

  @media screen and (max-width: ${Breakpoint}) {
    display: none;
  }
`;
const ImageContainerGitHub = styled_default()(ImageContainer)`
  top: -2px;
  margin-right: 24px;

  @media screen and (max-width: ${Breakpoint}) {
   top: 0px;
  }
`;
const Row = (styled_default()).div`
  display: flex;
  flex-direction: row;
  justify-items: ${(props)=>props.align
};
  }
`;
const Navigation = ()=>{
    /** Render */ return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Container, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(HoverLink, {
                href: "/",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Row, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(BedrockLogo, {
                            width: "60px",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                src: bedrock_logo,
                                objectFit: "contain"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(BedrockLogoWide, {
                            width: "250px",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                src: bedrock_logo_wide,
                                objectFit: "contain"
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Row, {
                align: "flex-end",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(ImageContainerGitHub, {
                        width: "30px",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(GitHubLink, {
                            href: "https://github.com/bedrock-foundation/bedrock",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                src: github,
                                objectFit: "contain"
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(ImageContainer, {
                        width: "30px",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            href: "https://twitter.com/on_bedrock",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                src: twitter_white,
                                objectFit: "contain"
                            })
                        })
                    })
                ]
            })
        ]
    });
};
const getServerSideProps = async ()=>{
    return {
        props: {
            props: {}
        }
    };
};
/* harmony default export */ const components_Navigation = (Navigation);


/***/ }),

/***/ 384:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var polished__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2042);
/* harmony import */ var polished__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(polished__WEBPACK_IMPORTED_MODULE_0__);

const Black = "#000000";
const White = "#FFFFFF";
const Colors = {
    // Special
    Blue: "#0a121a",
    AlmostDarkBlue: "#070c12",
    DarkBlue: "#04080b",
    Green: "#37B28D",
    Purple: "#26267f",
    // Generic
    Black,
    Black03: polished__WEBPACK_IMPORTED_MODULE_0__.rgba(Black, 0.03),
    Black05: polished__WEBPACK_IMPORTED_MODULE_0__.rgba(Black, 0.05),
    Black10: polished__WEBPACK_IMPORTED_MODULE_0__.rgba(Black, 0.10),
    Black20: polished__WEBPACK_IMPORTED_MODULE_0__.rgba(Black, 0.20),
    Black33: polished__WEBPACK_IMPORTED_MODULE_0__.rgba(Black, 0.33),
    Black50: polished__WEBPACK_IMPORTED_MODULE_0__.rgba(Black, 0.50),
    Black66: polished__WEBPACK_IMPORTED_MODULE_0__.rgba(Black, 0.66),
    Black75: polished__WEBPACK_IMPORTED_MODULE_0__.rgba(Black, 0.75),
    Black90: polished__WEBPACK_IMPORTED_MODULE_0__.rgba(Black, 0.90),
    Black95: polished__WEBPACK_IMPORTED_MODULE_0__.rgba(Black, 0.95),
    White,
    White05: polished__WEBPACK_IMPORTED_MODULE_0__.rgba(White, 0.05),
    White10: polished__WEBPACK_IMPORTED_MODULE_0__.rgba(White, 0.10),
    White20: polished__WEBPACK_IMPORTED_MODULE_0__.rgba(White, 0.20),
    White50: polished__WEBPACK_IMPORTED_MODULE_0__.rgba(White, 0.50),
    Red50: "#FEF2F2",
    Red100: "#FEE2E2",
    Red200: "#FECACA",
    Red300: "#FCA5A5",
    Red400: "#F87171",
    Red500: "#EF4444",
    Red600: "#DC2626",
    Red700: "#B91C1C",
    Red800: "#991B1B",
    Red900: "#7F1D1D",
    Green50: "#ECFDF5",
    Green100: "#D1FAE5",
    Green200: "#A7F3D0",
    Green300: "#6EE7B7",
    Green400: "#34D399",
    Green500: "#10B981",
    Green600: "#059699",
    Green700: "#047857",
    Green800: "#065F46",
    Green900: "#064E3B",
    Yellow50: "#FFFBEB",
    Yellow100: "#FEF3C7",
    Yellow200: "#FDE68A",
    Yellow300: "#FCD34D",
    Yellow400: "#FBBF24",
    Yellow500: "#F59E0B",
    Yellow600: "#D97706",
    Yellow700: "#B45309",
    Yellow800: "#92400E",
    Yellow900: "#78350F",
    Grey50: "#F9FAFB",
    Grey100: "#F3F4F6",
    Grey200: "#E5E7EB",
    Grey300: "#D1D5DB",
    Grey400: "#A1A3B5",
    Grey500: "#444968",
    Grey600: "#4B5563",
    Grey700: "#363B57",
    Grey800: "#111827",
    Grey900: "#2D3148"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Colors);


/***/ })

};
;