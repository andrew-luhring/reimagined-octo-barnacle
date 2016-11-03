"use strict";
var jasmine = jasmine || {};
/*jshint -W079 */
var module = module || {
    exports : {}
};
function Matchers(obj) {
    this.jasmine = obj;
}

/**
 * toBeTypeOf matcher for jasmine;
 *
 * @example var o = {}; expect(o).toBeTypeOf('object');
 *
 * @param expected
 * @returns {boolean}
 */
Matchers.prototype.toBeTypeOf = function (expected) {
    this.message = function () {
        return '\n====>' + this.actual + '  is not a type of ' + expected + '\n';
    };

    if(expected === 'array'){
        return Array.isArray(this.actual);
    }

    return typeof this.actual === expected;
};

/**
 * toExist matcher for jasmine - returns true if not null, undefined or empty.
 * @example var o = {}; expect(o).toExist();
 *
 * @returns {boolean}
 */
Matchers.prototype.toExist = function () {
    this.message = function () {
        return '\n====> whatever this is: ' + this.actual + ' does not exist.' + '\n';
    };

    if (typeof this.actual === 'undefined') {
        return false;
    } else if (this.actual === null) {
        return false;
    } else {
        return this.actual !== '';
    }
};
/**
 * toRespondTo matcher for jasmine- returns true if object has method.
 * @example var o = { derp : function(){} } expect(o).toRespondTo('derp');
 *
 * @param expected
 * @returns {boolean}
 */
Matchers.prototype.toRespondTo = function (expected) {
    var type = (typeof this.actual === 'object');
    if (type !== true) {
        this.message = function (){
            return '\n====>' + this.actual + ' is not a method of ' + expected + '\n';
        };
    } else {
        this.message = function() {
            return '\n====>' + this.actual + ' is not a function';
        };
    }
    var assertion = (typeof this.actual[expected] === 'function');
    //var both = !!(type === true && assertion === true);
    return assertion;
};

Matchers.prototype.toBeInstanceOf = function (expectedInstance) {
    var actual = this.actual;
    var notText = this.isNot ? " not" : "";
    this.message = function () {
        return "\n====>Expected " + actual.constructor.name + notText + " is not instance of " + expectedInstance.name;
    };
    if(actual instanceof expectedInstance !== true){
        return actual.constructor === expectedInstance;
    } else {
        return actual instanceof expectedInstance;
    }

};
Matchers.prototype.toContainValue = function (expected) {
    var type = (typeof this.actual === 'object')
        , validResult;

    if (type === false) {
        this.message = (function (obj) {
            return "\n====>Expected an array or object, got " + typeof obj + " instead";
        })(this.actual);

        throw new Error(this.message());
    } else {
        // null is an object but it's the only object that is not an instanceOf Object.
        var nullCheck = this.actual;
        if (nullCheck instanceof Object === false) {
            this.message = (function (obj) {
                return "\n====>Expected an array or object, got null instead: " + obj;
            })(this.actual);
            throw new Error(this.message());
        }
    }

    validResult = _.contains(this.actual, expected);
    return validResult;
};
Matchers.prototype.toContainKey = function (expected) {
    var type = typeof this.actual === 'object'
        , isArray = this.actual instanceof Array
        , isNull = this.actual instanceof Object === false;


    if (type === false) {
        this.message = (function (obj) {
            return "\n====>Expected an object, got " + typeof obj + " instead";
        })(this.actual);
        throw new Error(this.message());
    } else if (isArray === true) {
        this.message = (function (obj) {
            return "\n====>Expected an object, got an array instead: " + obj;
        })(this.actual);
    } else if (isNull === true) {
        this.message = (function (obj) {
            return "\n====>Expected an object, got null instead: " + obj;
        })(this.actual);
    } else {
        for (var i in this.actual) {
            if (i === expected) {
                return true;
            }
        }
    }
};

/**
 * checks if collection contains a expected key or value.
 * @param expected
 * @returns {*}
 */
Matchers.prototype.toContain = function (expected) {
    var containValue = Matchers.prototype.toContainValue
        , containKey = Matchers.prototype.toContainKey
        , resultValue
        , resultKey;
    this.message = function () {
        if (this.actual instanceof Array) {
            return "\n====>Expected the array:\n" + this.actual + " \nto contain " + expected;
        } else if(typeof this.actual === 'object') {
            return "\n====>Expected the object with the keys:" +
                "\n\n" + _.keys(this.actual) + "\n\nto either contain the key: " +
                "\n" + expected + "" +
                "\n\nor one of the values:" +
                "\n\n" + _.values(this.actual) + " \n\nto be: " +
                "\n" + expected;
        } else if(typeof this.actual === 'string'){
            return '\n====>Expected the string: ' + this.actual + " \n to contain " + expected;
        }
    };


    if (this.actual instanceof Array) {
        return containValue.call(this, expected);
    } else if (typeof this.actual === 'object') {
        resultKey = containKey.call(this, expected);
        resultValue = containValue.call(this, expected);
    } else if (typeof this.actual === 'string'){
        var str = this.actual;
        return str.indexOf(expected) > -1;
    }


    return !!(resultValue === true || resultKey === true);
};

module.exports = Matchers;
