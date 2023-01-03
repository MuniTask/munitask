export function titleCase(str) {
  let word=str.trim()
  if (/\s/.test(word)) {
    word = word.toLowerCase();
    word = word.split(' ');
    for (var i = 0; i < word.length; i++) {
    word[i] = word[i].charAt(0).toUpperCase() + word[i].slice(1); 
    }
    return word.join(' '); } else if (!/\s/.test(word)){
      return word.charAt(0).toUpperCase() + word.slice(1)
    }
  };
