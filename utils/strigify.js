export const stringify = (value, replacer, space) =>
  JSON.stringify(
    value,
    (key, value_) => {
      const updatedValue = typeof value_ === 'bigint' ? value_.toString() : value_;
      return typeof replacer === 'function' ? replacer(key, updatedValue) : updatedValue;
    },
    space
  );
