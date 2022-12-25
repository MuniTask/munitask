export function titleCase(str) {
  if (str.includes(' ')){

  
    str = str.toLowerCase();
    str = str.split(' ');
    for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' '); } else if (!str.includes(' ')){
      return (str[0].toUpperCase() + str.slice(1))
    }
  };
