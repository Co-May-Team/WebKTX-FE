export default function capitalizeWords(sentence) {
  let words = sentence.split(' ');
  let capitalizedWords = words.map(word => {
    let capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    return capitalized;
  });
  return capitalizedWords.join(' ');
}