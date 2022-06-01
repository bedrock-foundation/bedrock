"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 9392:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@emotion/styled"
var styled_ = __webpack_require__(1480);
var styled_default = /*#__PURE__*/__webpack_require__.n(styled_);
// EXTERNAL MODULE: external "polished"
var external_polished_ = __webpack_require__(2042);
// EXTERNAL MODULE: external "next-seo"
var external_next_seo_ = __webpack_require__(6641);
// EXTERNAL MODULE: ./src/components/Navigation.tsx + 4 modules
var Navigation = __webpack_require__(7304);
// EXTERNAL MODULE: ./src/styles/Colors.ts
var Colors = __webpack_require__(384);
;// CONCATENATED MODULE: ./src/elements/Text.tsx




const TextStyles = (styled_default()).div`
  position: relative;
  padding: 0px;
  font-family: "Open Sans", sans-serif;
  font-family: ${(props)=>{
    switch(props.family){
        case TextFamilyEnum.OpenSans:
            return '"Open Sans", sans-serif';
        case TextFamilyEnum.Pacifico:
            return '"Pacifico", cursive';
        default:
            return '"Open Sans", sans-serif';
    }
}};
  margin: ${(props)=>props.margin
};
  color: ${(props)=>props.color
};
  width: ${(props)=>props.width
};
  text-align: ${(props)=>props.align
};
  white-space: ${(props)=>props.noWrap ? "nowrap" : null
};
  font-size: ${(props)=>{
    if (props.type.includes("10")) return "1.0rem";
    if (props.type.includes("12")) return "1.2rem";
    if (props.type.includes("14")) return "1.4rem";
    if (props.type.includes("16")) return "1.6rem";
    if (props.type.includes("18")) return "1.8rem";
    if (props.type.includes("24")) return "2.4rem";
    if (props.type.includes("30")) return "3.0rem";
    return "400";
}};
  line-height: ${(props)=>{
    if (props.type.includes("10")) return "1.6rem";
    if (props.type.includes("12")) return "1.6rem";
    if (props.type.includes("14")) {
        if (props.type.includes("Small")) {
            return "1.6rem";
        }
        return "2.4rem";
    }
    if (props.type.includes("16")) return "2.4rem";
    if (props.type.includes("18")) return "2.4rem";
    if (props.type.includes("24")) return "3.2rem";
    if (props.type.includes("30")) return "3.2rem";
    return "400";
}};
  font-weight: ${(props)=>{
    if (props.type.includes("Regular")) return "400";
    if (props.type.includes("Medium")) return "500";
    if (props.type.includes("Bold")) return "700";
    return "400";
}};

  &:hover {
    cursor: ${(props)=>props.onClick ? "pointer" : null
};
  }
`;
const Paragraph = TextStyles.withComponent("p");
const Label = TextStyles.withComponent("label");
const Span = TextStyles.withComponent("span");
var TextTypesEnum;
(function(TextTypesEnum) {
    TextTypesEnum["Regular10"] = "Regular10";
    TextTypesEnum["Medium10"] = "Medium10";
    TextTypesEnum["Bold10"] = "Bold10";
    TextTypesEnum["Regular12"] = "Regular12";
    TextTypesEnum["Medium12"] = "Medium12";
    TextTypesEnum["Bold12"] = "Bold12";
    TextTypesEnum["Regular14"] = "Regular14";
    TextTypesEnum["Regular14Small"] = "Regular14Small";
    TextTypesEnum["Medium14"] = "Medium14";
    TextTypesEnum["Medium14Small"] = "Medium14Small";
    TextTypesEnum["Bold14"] = "Bold14";
    TextTypesEnum["Bold14Small"] = "Bold14Small";
    TextTypesEnum["Regular16"] = "Regular16";
    TextTypesEnum["Medium16"] = "Medium16";
    TextTypesEnum["Bold16"] = "Bold16";
    TextTypesEnum["Regular18"] = "Regular18";
    TextTypesEnum["Medium18"] = "Medium18";
    TextTypesEnum["Bold18"] = "Bold18";
    TextTypesEnum["Regular24"] = "Regular24";
    TextTypesEnum["Medium24"] = "Medium24";
    TextTypesEnum["Bold24"] = "Bold24";
    TextTypesEnum["Bold30"] = "Bold30";
})(TextTypesEnum || (TextTypesEnum = {}));
var TextAsEnum;
(function(TextAsEnum) {
    TextAsEnum["Label"] = "Label";
    TextAsEnum["Paragraph"] = "Paragraph";
    TextAsEnum["Span"] = "Span";
})(TextAsEnum || (TextAsEnum = {}));
var TextFamilyEnum;
(function(TextFamilyEnum) {
    TextFamilyEnum["OpenSans"] = "Open Sans";
    TextFamilyEnum["Pacifico"] = "Pacifico";
})(TextFamilyEnum || (TextFamilyEnum = {}));
const Text = ({ children , type =TextTypesEnum.Regular16 , as =TextAsEnum.Paragraph , family =TextFamilyEnum.OpenSans , color =Colors/* default.Black */.Z.Black , width ="auto" , align ="left" , margin ="0" , onClick =null , noWrap =false , skWidth , id ,  })=>{
    const paragraph = /*#__PURE__*/ jsx_runtime_.jsx(Paragraph, {
        id: id,
        type: type,
        color: color,
        family: family,
        width: width,
        align: align,
        margin: margin,
        onClick: onClick && onClick,
        noWrap: noWrap,
        children: children
    });
    const label = /*#__PURE__*/ jsx_runtime_.jsx(Label, {
        id: id,
        type: type,
        color: color,
        family: family,
        width: width,
        align: align,
        margin: margin,
        onClick: onClick && onClick,
        noWrap: noWrap,
        children: children
    });
    const span = /*#__PURE__*/ jsx_runtime_.jsx(Span, {
        id: id,
        type: type,
        color: color,
        family: family,
        width: width,
        align: align,
        margin: margin,
        onClick: onClick && onClick,
        noWrap: noWrap,
        children: children
    });
    switch(as){
        case TextAsEnum.Paragraph:
            return paragraph;
        case TextAsEnum.Label:
            return label;
        case TextAsEnum.Span:
            return span;
        default:
            return paragraph;
    }
};
/* harmony default export */ const elements_Text = (Text);

;// CONCATENATED MODULE: ./src/pages/index.tsx








const Breakpoint = "1080px";
const Container = (styled_default()).div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: fill-available;
  align-items: center;
  padding: 0 24px;
`;
const Page = (styled_default()).div`
  position: relative;
  max-width: ${Breakpoint};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;
const Code = (styled_default()).code`
  padding: 16px 24px;
  border-radius: 8px;
  background-color: ${Colors/* default.DarkBlue */.Z.DarkBlue};
  border: 1px solid ${Colors/* default.Purple */.Z.Purple};
  font-size: 16px;
  color: ${Colors/* default.White */.Z.White};
  font-family: monospace;
  display: inline;
  width: fit-content;
  margin-bottom: 24px;
`;
const Row = (styled_default()).div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: ${Breakpoint}) {
    flex-direction: column;
    width: 100%;
  }
`;
const Column = (styled_default()).div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${Breakpoint}) {
    flex-direction: column;
    width: 100%;
  }
`;
const Button = (styled_default()).div`
  width: ${(props)=>props?.width ?? "240px"
};
  max-width: ${(props)=>props?.width ?? "460px"
};
  height: 46px;
  background-color: ${(props)=>props.color
};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
  margin-right: 16px;
  margin-bottom: 16px;

  @media screen and (max-width: ${Breakpoint}) {
    width: 100%;
  }

  &:hover {
    cursor: ${(props)=>props.onClick ? "pointer" : null
};
    background-color: ${(props)=>props.onClick ? external_polished_.darken(0.05, props.color) : null
};
  }

  &:active {
    background-color: ${(props)=>props.onClick ? external_polished_.darken(0.1, props.color) : null
};
  }
`;
const IndexPage = ()=>{
    /** Render */ return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Container, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(external_next_seo_.NextSeo, {
                title: "Bedrock | The Solana Pay Toolkit",
                description: "Bedrock is an SDK for Solana Pay"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Navigation/* default */.Z, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(Page, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(Row, {
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Column, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(elements_Text, {
                                type: TextTypesEnum.Bold30,
                                color: Colors/* default.White */.Z.White,
                                margin: "0 0 16px",
                                children: "The open-source Solana Pay toolkit"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(elements_Text, {
                                type: TextTypesEnum.Medium18,
                                color: Colors/* default.White */.Z.White,
                                margin: "0 0 24px",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(elements_Text, {
                                        as: TextAsEnum.Span,
                                        color: Colors/* default.White */.Z.White,
                                        type: TextTypesEnum.Bold18,
                                        children: [
                                            "Bedrock",
                                            " "
                                        ]
                                    }),
                                    "is a composable set of open-source primitives for building",
                                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                    " ",
                                    "next-generation commerce experiences with Solana Pay."
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(Code, {
                                children: "$ npm install --save @bedrock-foundation/sdk"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Row, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(Button, {
                                        color: Colors/* default.Purple */.Z.Purple,
                                        onClick: ()=>{
                                            window.open("https://github.com/bedrock-foundation/bedrock");
                                        },
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(elements_Text, {
                                            type: TextTypesEnum.Medium16,
                                            color: Colors/* default.White */.Z.White,
                                            children: "View GitHub"
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(Button, {
                                        color: Colors/* default.Purple */.Z.Purple,
                                        onClick: ()=>{
                                            window.open("https://calendly.com/on_bedrock/15-minute-meeting");
                                        },
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(elements_Text, {
                                            type: TextTypesEnum.Medium16,
                                            color: Colors/* default.White */.Z.White,
                                            children: "Get in touch"
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                })
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
/* harmony default export */ const pages = (IndexPage);


/***/ }),

/***/ 1480:
/***/ ((module) => {

module.exports = require("@emotion/styled");

/***/ }),

/***/ 6641:
/***/ ((module) => {

module.exports = require("next-seo");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 4365:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 2042:
/***/ ((module) => {

module.exports = require("polished");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [505,61,304], () => (__webpack_exec__(9392)));
module.exports = __webpack_exports__;

})();