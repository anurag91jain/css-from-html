function unique(array) {
  var prev;
  return array.sort().filter((e) => e !== prev && (prev = e));
}
var start = window.performance.now();
var breakpoints = {
  xs: "@media (min-width: 0px)",
  sm: "@media (min-width: 576px)",
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 992px)",
  xl: "@media (min-width: 1200px)",
};
var CSSObj = {
  xs: [],
  sm: [],
  md: [],
  lg: [],
  xl: [],
  nomq: [],
};
var classList = [].concat(
  ...[...document.querySelectorAll("*")].map((elt) => [...elt.classList])
);
var uniqueClassList = unique(classList);
uniqueClassList.map((el) => {
  var cssString = el.split("c__");
  if (cssString.length) {
    var cssStringSplit = cssString[1].split("_");
    if (cssStringSplit.length === 3) {
      var obj = {
        element: el,
        type: cssStringSplit[1],
        value: cssStringSplit[2],
      };
      switch (cssStringSplit[0]) {
        case "xs":
          CSSObj["xs"].push(obj);
          break;
        case "sm":
          CSSObj["sm"].push(obj);
          break;
        case "md":
          CSSObj["md"].push(obj);
          break;
        case "lg":
          CSSObj["lg"].push(obj);
          break;
        case "xl":
          CSSObj["xl"].push(obj);
          break;
        default:
          break;
      }
    } else if (cssStringSplit.length === 2) {
      CSSObj["nomq"].push({
        element: el,
        type: cssStringSplit[0],
        value: cssStringSplit[1],
      });
    }
  }
});
var style = document.createElement("style");
var styleText = "";
Object.keys(CSSObj).forEach((CSSQueryString) => {
  if (CSSQueryString !== "nomq") {
    styleText += `${breakpoints[CSSQueryString]} {`;
  }
  CSSObj[CSSQueryString].forEach((el) => {
    styleText += `.${el.element} {${el.type}: ${el.value}px;}`;
  });
  if (CSSQueryString !== "nomq") {
    styleText += `}`;
  }
});
console.log(styleText);
style.innerHTML = styleText;
var ref = document.querySelector("head");
ref.parentNode.insertBefore(style, ref);
var end = window.performance.now();
console.log(`time taken = ${end - start}`);
