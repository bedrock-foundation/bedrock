"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 5620:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "In": () => (/* binding */ GA_MEASUREMENT_ID)
/* harmony export */ });
/* unused harmony exports NODE_ENV, DEBUG_ENABLED, WEB_UI_URL, PAY_PORTAL_URL, API_URL */
const NODE_ENV = (/* unused pure expression or super */ null && ("production" || 0));
const DEBUG_ENABLED = process.env.DEBUG_ENABLED || 1;
const WEB_UI_URL = process.env.WEB_UI_URL || "http://localhost:3000";
const PAY_PORTAL_URL = process.env.PAY_PORTAL_URL || "http://localhost:3004";
const API_URL = process.env.API_URL || "https://magically-production.ngrok.io";
const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID || "G-43HKQKDVV2";


/***/ }),

/***/ 3861:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "@emotion/styled"
var styled_ = __webpack_require__(1480);
var styled_default = /*#__PURE__*/__webpack_require__.n(styled_);
;// CONCATENATED MODULE: external "next/router"
const router_namespaceObject = require("next/router");
// EXTERNAL MODULE: ./src/env.ts
var env = __webpack_require__(5620);
;// CONCATENATED MODULE: ./src/pages/_app.tsx






const Container = (styled_default()).div`
  position: absolute;
  height: 100%;
  width: 100%;
`;
const PayPortalContainer = (styled_default()).div``;
const App = ({ Component  })=>{
    const router = (0,router_namespaceObject.useRouter)();
    const handleRouteChange = (url)=>{
        window.gtag("config", env/* GA_MEASUREMENT_ID */.In, {
            page_path: url
        });
    };
    external_react_default().useEffect(()=>{
        router.events.on("routeChangeComplete", handleRouteChange);
        return ()=>{
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [
        router.events
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Container, {
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(PayPortalContainer, {
                id: "SOLANA_PAY"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Component, {})
        ]
    });
};
/* harmony default export */ const _app = (App);


/***/ }),

/***/ 1480:
/***/ ((module) => {

module.exports = require("@emotion/styled");

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
var __webpack_exports__ = (__webpack_exec__(3861));
module.exports = __webpack_exports__;

})();