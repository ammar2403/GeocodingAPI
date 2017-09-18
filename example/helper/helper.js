var helper = function() {
  this.checkString = checkString;
  this.checkInt = checkInt;
};

function checkString(param1, param2) {
  if (param1 === param2)
    return true;
  else
    return false;
}

function checkInt(param1, param2) {
  if (param1 == param2)
    return true;
  else
    return false;
}

module.exports = new helper();
