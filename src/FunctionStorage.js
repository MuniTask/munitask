export function titleCase(str) {
  if (/\s/.test(str)) {
    // It has any kind of whitespac{

  
    str = str.toLowerCase();
    str = str.split(' ');
    for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' '); } else if (/\s/.test(str)){
      return (str.charAt(1).toUpperCase() + str.slice(1))
    }
  };
