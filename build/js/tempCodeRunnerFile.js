function datesFromContent(content) {
  console.log(content.match(^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$));
}
datesFromContent("“I’m gonna have a dentist appointment on the 03/05/2021, I moved it from 05/05/2021”");
