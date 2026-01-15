'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useViewport = exports.Viewport = void 0;
var react_1 = require("react");
exports.Viewport = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};
var useViewport = function () {
    var _a = react_1.default.useState(exports.Viewport.sm), width = _a[0], setWidth = _a[1];
    react_1.default.useEffect(function () {
        if (typeof window === 'undefined')
            return;
        setWidth(window.innerWidth);
        var handleWindowResize = function () { return setWidth(window.innerWidth); };
        window.addEventListener('resize', handleWindowResize);
        return function () { return window.removeEventListener('resize', handleWindowResize); };
    }, []);
    // Return the width so we can use it in our components
    return width;
};
exports.useViewport = useViewport;
