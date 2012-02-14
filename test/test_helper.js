var countProperties = function (option) {
  var count  = 0,
      object = option.in;

  for (property in object) { count++; };

  return count
};
