// Max Length
function maxLengthFunc(maxLength) {
  // Data - Set Max Length
  maxLength.forEach((max) => {
    if (max.parentNode.classList.value === "noteDates") {
      const lastData = max.textContent.split(",");
      if (lastData.length > 2) {
        max.textContent =
          "..., " +
          lastData
            .slice(lastData.length - 2)
            .join()
            .trim();
        max.parentNode.classList.add("more");
      }
      return;
    }
    // Other - Set Max Length
    if (max.offsetWidth >= 170) {
      const lastLength = max.textContent.split("");
      const length = lastLength.length;
      max.textContent = null;
      for (let i = 0; i < length; i++) {
        max.textContent += lastLength.shift();
        if (max.offsetWidth >= 160) {
          i = length;
          max.textContent += "...";
          max.parentNode.classList.add("more");
        }
      }
    }
  });
}
