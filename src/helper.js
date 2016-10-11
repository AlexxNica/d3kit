//---------------------------------------------------
// From lodash
//---------------------------------------------------

/** Used to determine if values are of the language type Object */
const objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false,
};

export function isObject(value) {
  // check if the value is the ECMAScript language type of Object
  // http://es5.github.io/#x8
  // and avoid a V8 bug
  // http://code.google.com/p/v8/issues/detail?id=2291
  return !!(value && objectTypes[typeof value]);
}

export function isFunction(functionToCheck) {
  const getType = {};
  return !!functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

//---------------------------------------------------
// Modified from lodash
//---------------------------------------------------

/**
 * Returns a function, that, as long as it continues to be invoked,
 * will not be triggered.
 * The function will be called after it stops being called for
 * "wait" milliseconds.
 * The output function can be called with .now() to execute immediately
 * For example:
 * doSomething(params); // will debounce
 * doSomething.now(params); // will execute immediately
 *
 * @param  Function func      function to be debounced
 * @param  Number   wait      wait time until it will be executed
 * @param  Boolean  immediate If "immediate" is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * @return Function           debounced function
 */
export function debounce(func, wait, immediate) {
  let timeout;

  function outputFn(...args) {
    const context = this;
    function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);

    // return caller for chaining
    return context;
  }

  // so we know this function is debounced
  outputFn.isDebounced = true;
  // and provide a way to call the original function immediately
  outputFn.now = function (...args) {
    clearTimeout(timeout);
    return func.apply(this, args);
  };

  return outputFn;
}

//---------------------------------------------------
// From underscore.string
//---------------------------------------------------
/* jshint ignore:start */

const nativeTrim = String.prototype.trim;

function escapeRegExp(str) {
  if (str == null) return '';
  return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}

function defaultToWhiteSpace(characters) {
  if (characters == null) {
    return '\\s';
  } else if (characters.source) {
    return characters.source;
  }
  return `[${escapeRegExp(characters)}]`;
}

function trim(str, characters) {
  if (str == null) return '';
  if (!characters && nativeTrim) return nativeTrim.call(str);
  const chars = defaultToWhiteSpace(characters);
  const pattern = new RegExp(`\^${chars}+|${chars}+$`, 'g');
  return String(str).replace(pattern, '');
}

export function kebabCase(str) {
  return trim(str)
    .replace(/([A-Z])/g, '-$1')
    .replace(/[-_\s]+/g, '-')
    .toLowerCase();
}

//---------------------------------------------------
// From http://youmightnotneedjquery.com/
//---------------------------------------------------

export function deepExtend(out) {
  out = out || {};

  for (let i = 1; i < arguments.length; i++) {
    const obj = arguments[i];

    if (!obj)
      continue;

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (isObject(value) && !Array.isArray(value) && !isFunction(value)) {
          out[key] = deepExtend(out[key], value);
        }
        else
          out[key] = value;
      }
    }
  }

  return out;
}

export function extend(out) {
  out = out || {};

  for (let i = 1; i < arguments.length; i++) {
    if (!arguments[i])
      continue;

    for (const key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key))
        out[key] = arguments[i][key];
    }
  }

  return out;
}

//---------------------------------------------------
// From D3 v3
//---------------------------------------------------

// Method is assumed to be a standard D3 getter-setter:
// If passed with no arguments, gets the value.
// If passed with arguments, sets the value and returns the target.
function d3Rebind(target, source, method) {
  return function () {
    const value = method.apply(source, arguments);
    return value === source ? target : value;
  };
}

// Copies a variable number of methods from source to target.
export function rebind(target, source) {
  let i = 1, n = arguments.length, method;
  while (++i < n) target[method = arguments[i]] = d3Rebind(target, source, source[method]);
  return target;
}

export function functor(v) {
  return isFunction(v) ? v : () => v;
}
