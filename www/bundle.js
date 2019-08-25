/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./ts/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ts/core/checker.ts":
/*!****************************!*\
  !*** ./ts/core/checker.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var martrixUtil_1 = __webpack_require__(/*! ./martrixUtil */ "./ts/core/martrixUtil.ts");
function checkArray(array) {
    var len = array.length;
    var marks = new Array(len);
    marks.fill(true);
    for (var i = 0; i < len - 1; i++) {
        if (!marks[i]) {
            continue;
        }
        var v = array[i];
        if (!v) {
            marks[i] = false;
            continue;
        }
        for (var j = i + 1; j < len; j++) {
            if (v === array[j]) {
                marks[i] = marks[j] = false;
            }
        }
    }
    return marks;
}

var Checker = function () {
    function Checker(martrix) {
        _classCallCheck(this, Checker);

        this._success = false;
        this._martrix = martrix;
        this._allMarks = martrixUtil_1.default.martrix.createMatrix(true);
    }

    _createClass(Checker, [{
        key: "check",
        value: function check() {
            this.checkRows();
            this.checkCols();
            this.checkBoxes();
            this._success = this._allMarks.every(function (row) {
                return row.every(function (item) {
                    return item;
                });
            });
            return this._success;
        }
    }, {
        key: "checkRows",
        value: function checkRows() {
            for (var row = 0; row < 9; row++) {
                var r = this._martrix[row];
                var marks = checkArray(r);
                for (var col = 0; col < marks.length; col++) {
                    if (!marks[col]) {
                        this._allMarks[row][col] = false;
                    }
                }
            }
        }
    }, {
        key: "checkCols",
        value: function checkCols() {
            for (var col = 0; col < 9; col++) {
                var c = [];
                for (var row = 0; row < 9; row++) {
                    c[row] = this._martrix[row][col];
                }
                var marks = checkArray(c);
                for (var _row = 0; _row < marks.length; _row++) {
                    if (!marks[_row]) {
                        this._allMarks[_row][col] = false;
                    }
                }
            }
        }
    }, {
        key: "checkBoxes",
        value: function checkBoxes() {
            for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
                var boxes = martrixUtil_1.default.box.getBoxCells(this._martrix, { box: boxIndex, cell: 0 });
                var marks = checkArray(boxes);
                for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
                    if (!marks[cellIndex]) {
                        var _martrixUtil_1$defaul = martrixUtil_1.default.box.getGridIndex(boxIndex, cellIndex),
                            row = _martrixUtil_1$defaul.row,
                            col = _martrixUtil_1$defaul.col;

                        this._allMarks[row][col] = false;
                    }
                }
            }
        }
    }, {
        key: "martrix",
        get: function get() {
            return this._martrix;
        }
    }, {
        key: "allMarks",
        get: function get() {
            return this._allMarks;
        }
    }]);

    return Checker;
}();

exports.default = Checker;

/***/ }),

/***/ "./ts/core/generator.ts":
/*!******************************!*\
  !*** ./ts/core/generator.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var martrixUtil_1 = __webpack_require__(/*! ./martrixUtil */ "./ts/core/martrixUtil.ts");

var Generator = function () {
    function Generator() {
        _classCallCheck(this, Generator);
    }

    _createClass(Generator, [{
        key: "generate",
        value: function generate() {
            while (!this.generator()) {}
        }
    }, {
        key: "generator",
        value: function generator() {
            this.martrix = martrixUtil_1.default.martrix.createMatrix();
            this.orders = martrixUtil_1.default.martrix.createMatrix().map(function (row) {
                return row.map(function (v, i) {
                    return i;
                });
            }).map(function (row) {
                return martrixUtil_1.default.martrix.shuffle(row);
            });
            for (var n = 1; n < 10; n++) {
                //填入1-9数独答案
                if (!this.fillNumber(n)) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: "fillNumber",
        value: function fillNumber(n) {
            return this.fillRow(n, 0);
        }
    }, {
        key: "fillRow",
        value: function fillRow(n, row) {
            if (row > 8) {
                return true;
            }
            var r = this.martrix[row];
            var orders = this.orders[row];
            for (var i = 0; i < 9; i++) {
                var col = orders[i];
                if (r[col]) {
                    continue;
                }
                if (!martrixUtil_1.default.martrix.canFill(this.martrix, n, row, col)) {
                    continue;
                }
                r[col] = n;
                if (!this.fillRow(n, row + 1)) {
                    r[col] = 0;
                    continue;
                }
                return true;
            }
            return false;
        }
    }]);

    return Generator;
}();

exports.default = Generator;

/***/ }),

/***/ "./ts/core/martrixUtil.ts":
/*!********************************!*\
  !*** ./ts/core/martrixUtil.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var martrixTool = {
    createRow: function createRow() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var array = new Array(9);
        array.fill(v);
        return array;
    },
    createMatrix: function createMatrix() {
        var _this = this;

        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        return Array.from({ length: 9 }, function () {
            return _this.createRow(v);
        });
    },

    /*
     *Fisher-Yates洗牌算法
     */
    shuffle: function shuffle(arr) {
        var end = arr.length - 2;
        for (var i = 0; i < end; i++) {
            var tmp = Math.floor(Math.random() * (arr.length - i));
            var _ref = [arr[tmp], arr[i]];
            arr[i] = _ref[0];
            arr[tmp] = _ref[1];
        }
        return arr;
    },
    canFill: function canFill(martrix, n, row, col) {
        var r = new Set(martrix[row]);
        var c = new Set(this.createRow().map(function (v, i) {
            return martrix[i][col];
        }));
        var boxIndex = boxTool.getBoxIndex(row, col);
        var box = new Set(boxTool.getBoxCells(martrix, boxIndex));
        if (r.has(n) || c.has(n) || box.has(n)) {
            return false;
        }
        return true;
    }
};
var boxTool = {
    getBoxIndex: function getBoxIndex(row, col) {
        return {
            box: Math.floor(row / 3) * 3 + Math.floor(col / 3),
            cell: row % 3 * 3 + col % 3
        };
    },
    getGridIndex: function getGridIndex(box, cell) {
        return {
            row: Math.floor(box / 3) * 3 + Math.floor(cell / 3),
            col: box % 3 * 3 + cell % 3
        };
    },
    getBoxCells: function getBoxCells(martrix, boxIndex) {
        var box = boxIndex.box,
            cell = boxIndex.cell;

        var gridIndex = this.getGridIndex(box, cell);
        var startRow = Math.floor(gridIndex.row / 3) * 3;
        var startCol = Math.floor(gridIndex.col / 3) * 3;
        var result = [];
        // console.log(0,martrix,1,gridIndex,2,boxIndex,startRow,startCol)
        for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
            var row = startRow + Math.floor(cellIndex / 3);
            var col = startCol + cellIndex % 3;
            // console.log(5,row,6,col)
            result.push(martrix[row][col]);
        }
        // console.log(martrix,boxIndex,gridIndex,startRow,startCol,result)
        return result;
    }
};

var Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    _createClass(Util, null, [{
        key: "martrix",
        get: function get() {
            return martrixTool;
        }
    }, {
        key: "box",
        get: function get() {
            return boxTool;
        }
    }]);

    return Util;
}();

exports.default = Util;
;

/***/ }),

/***/ "./ts/core/sudoku.ts":
/*!***************************!*\
  !*** ./ts/core/sudoku.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var generator_1 = __webpack_require__(/*! ./generator */ "./ts/core/generator.ts");

var Sudoku = function () {
    function Sudoku() {
        _classCallCheck(this, Sudoku);

        var generator = new generator_1.default();
        generator.generate();
        this.solution = generator.martrix;
    }

    _createClass(Sudoku, [{
        key: "createWhite",
        value: function createWhite() {
            var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

            this.puzzle = this.solution.map(function (row) {
                return row.map(function (cell) {
                    return Math.random() * 9 < level ? 0 : cell;
                });
            });
        }
    }]);

    return Sudoku;
}();

exports.default = Sudoku;

/***/ }),

/***/ "./ts/index.ts":
/*!*********************!*\
  !*** ./ts/index.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var grid_1 = __webpack_require__(/*! ./ui/grid */ "./ts/ui/grid.ts");
var popupnumbers_1 = __webpack_require__(/*! ./ui/popupnumbers */ "./ts/ui/popupnumbers.ts");
var grid = new grid_1.default($('#container'));
grid.build();
grid.layout();
var popupNumbers = new popupnumbers_1.default($("#popupNumbers"));
grid.bindPopup(popupNumbers);
$("#check").on("click", function (e) {
    grid.check();
});
$("#reset").on("click", function (e) {
    grid.reset();
});
$("#clear").on("click", function (e) {
    grid.clear();
});
$("#rebuild").on("click", function (e) {
    grid.rebuild();
});

/***/ }),

/***/ "./ts/ui/grid.ts":
/*!***********************!*\
  !*** ./ts/ui/grid.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var sudoku_1 = __webpack_require__(/*! ../core/sudoku */ "./ts/core/sudoku.ts");
var checker_1 = __webpack_require__(/*! ../core/checker */ "./ts/core/checker.ts");

var Grid = function () {
    function Grid(container) {
        _classCallCheck(this, Grid);

        this._$container = container;
    }

    _createClass(Grid, [{
        key: "build",
        value: function build() {
            var sudoku = new sudoku_1.default();
            sudoku.createWhite();
            var martix = sudoku.puzzle;
            var rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom'];
            var colGroupClasses = ['col_g_left', 'col_g_center', 'col_g_right'];
            var cells = martix.map(function (rowValue) {
                return rowValue.map(function (cellValue, index) {
                    var tmp = document.createElement('span');
                    $(tmp).addClass(colGroupClasses[index % 3]).addClass(cellValue ? "tips" : "empty").text(cellValue);
                    return tmp;
                });
            });
            var divArray = cells.map(function (spanArray, index) {
                var tmp = document.createElement('div');
                $(tmp).addClass('row').addClass(rowGroupClasses[index % 3]).append(spanArray);
                return tmp;
            });
            this._$container.append(divArray);
        }
    }, {
        key: "layout",
        value: function layout() {
            var width = $("span:first", this._$container).width();
            $("span", this._$container).height(width).css({
                "line-height": width + "px",
                "font-size": width < 32 ? width / 2 + "px" : ""
            });
        }
    }, {
        key: "bindPopup",
        value: function bindPopup(popupNumbers) {
            this._$container.on("click", "span", function (e) {
                var cell = $(e.target);
                popupNumbers.popup(cell);
            });
        }
    }, {
        key: "check",
        value: function check() {
            var data = this._$container.children().map(function (index, div) {
                return $(div).children().map(function (index, span) {
                    return parseInt($(span).text()) || 0;
                });
            }).toArray().map(function ($data) {
                return $data.toArray();
            });
            var checker = new checker_1.default(data);
            if (checker.check()) {
                return true;
            }
            var marks = checker.allMarks;
            this._$container.children().each(function (row, div) {
                $(div).children().each(function (col, span) {
                    if (marks[row][col] || $(span).is(".tips")) {
                        $(span).removeClass("error");
                    } else {
                        $(span).addClass("error");
                    }
                });
            });
        }
    }, {
        key: "reset",
        value: function reset() {
            $("span:not(.tips)", this._$container).text("0").removeClass("mark1 mark2 error").addClass("empty");
        }
    }, {
        key: "clear",
        value: function clear() {
            $("span.error", this._$container).removeClass("error");
        }
    }, {
        key: "rebuild",
        value: function rebuild() {
            this._$container.empty();
            this.build();
            this.layout();
        }
    }]);

    return Grid;
}();

exports.default = Grid;

/***/ }),

/***/ "./ts/ui/popupnumbers.ts":
/*!*******************************!*\
  !*** ./ts/ui/popupnumbers.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var PopupNumbers = function () {
    function PopupNumbers($panel) {
        var _this = this;

        _classCallCheck(this, PopupNumbers);

        this._$panel = $panel.hide().removeClass("hidden");
        this._$panel.on("click", "span", function (e) {
            var $cell = _this._$targetCell;
            var $span = $(e.target);
            if ($span.hasClass("mark1")) {
                if ($cell.hasClass("mark1")) {
                    $cell.removeClass("mark1");
                } else {
                    $cell.removeClass("mark2").addClass("mark1");
                }
            } else if ($span.hasClass("mark2")) {
                if ($cell.hasClass("mark2")) {
                    $cell.removeClass("mark2");
                } else {
                    $cell.removeClass("mark1").addClass("mark2");
                }
            } else if ($span.hasClass("empty")) {
                $cell.text(0).addClass("empty");
            } else {
                $cell.text($span.text()).removeClass("empty");
            }
            _this.hide();
        });
    }

    _createClass(PopupNumbers, [{
        key: "popup",
        value: function popup($cell) {
            this._$targetCell = $cell;

            var _$cell$position = $cell.position(),
                left = _$cell$position.left,
                top = _$cell$position.top;

            this._$panel.css({
                left: left + "px",
                top: top + "px"
            }).show();
        }
    }, {
        key: "hide",
        value: function hide() {
            this._$panel.hide();
        }
    }]);

    return PopupNumbers;
}();

exports.default = PopupNumbers;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map