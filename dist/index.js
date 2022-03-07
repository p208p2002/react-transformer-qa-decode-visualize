"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HlLayer = HlLayer;
exports.HlList = HlList;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function softmax(arr) {
  return arr.map(function (value, index) {
    return Math.exp(value) / arr.map(function (y
    /*value*/
    ) {
      return Math.exp(y);
    }).reduce(function (a, b) {
      return a + b;
    });
  });
}

function HlLayerChild(_ref) {
  var hl_context = _ref.hl_context,
      color = _ref.color,
      opacity_level = _ref.opacity_level;
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      pointerEvents: 'none'
    },
    className: "align-to-parent hl-hover op-".concat(opacity_level, " hl-").concat(color),
    dangerouslySetInnerHTML: {
      __html: hl_context
    }
  });
}

function HlLayer(_ref2) {
  var data = _ref2.data,
      color = _ref2.color;
  var _data$context = data.context,
      context = _data$context === void 0 ? "" : _data$context,
      _data$result = data.result,
      result = _data$result === void 0 ? [] : _data$result;
  var layers = result.map(function (r, index) {
    var start = r.global_context_start;
    var end = r.global_context_end;
    var hl_span = "<hl style=\"background-color:".concat(color, "\" data-tip=\"").concat(r.answer_span, "\">").concat(context.slice(start, end), "</hl>");
    var hl_context = context.slice(0, start) + hl_span + context.slice(end, context.length);
    var opacity_level = 10 - index;

    if (opacity_level < 1) {
      opacity_level = 1;
    }

    return /*#__PURE__*/_react.default.createElement(HlLayerChild, {
      key: index,
      hl_context: hl_context,
      color: color,
      opacity_level: opacity_level
    });
  });
  return layers;
}

function HlList(_ref3) {
  var data = _ref3.data,
      color = _ref3.color;
  var _data$result2 = data.result,
      result = _data$result2 === void 0 ? [] : _data$result2;
  var probs = softmax(result.map(function (d) {
    return d.start_logit;
  }));
  return /*#__PURE__*/_react.default.createElement("ul", {
    className: "hl-list"
  }, probs.map(function (prob, index) {
    var opacity_level = 10 - index;

    if (opacity_level < 1) {
      opacity_level = 1;
    }

    return /*#__PURE__*/_react.default.createElement("li", {
      key: index,
      className: "position-relative"
    }, /*#__PURE__*/_react.default.createElement("b", {
      style: {
        paddingLeft: 3,
        width: 22,
        display: 'inline-block'
      }
    }, index + 1, "."), " ", (prob * 100).toFixed(2), "% ", data.result[index].answer_span, /*#__PURE__*/_react.default.createElement("span", {
      className: "op-".concat(opacity_level, " bg-block"),
      style: {
        backgroundColor: color
      }
    }));
  }));
}