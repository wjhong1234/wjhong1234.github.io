
// returns line statistics
function lineStats(text) {
    let lines = text.split('\n');
    let nonEmpty = lines.length;
    let maxLength = 0;

    // for each line, check the line
    for (let line of lines) {

        // if length of line greater than max length, make that max length.
        if (line.length > maxLength) {
            maxLength = line.length;
        }

        // if line is just whitespace, remove one from nonEmpty count.
        if (line.trim() == "") {
            nonEmpty--;
        }
    }

    // return all three line properties from text.
    return {nLines: lines.length, nNonEmptyLines: nonEmpty, maxLineLength: maxLength};
}

// a between function for integers
function between(x, min, max) {
    return (x >= min && x <= max)
}

// determines if word is a palindrome
function palindrome(word) {
    for (i=0; i<word.length/2; i++) {
        if (word.charAt(i) != word.charAt(word.length - i - 1)) {
            return false;
        }
    } return true;
}

// returns the frequencies of the words/
function getFrequencies(frequency) {
    let pairs = [];

    // fills pairs with pairs of words and their frequencies
    for (i=0; i<frequency.w.length; i++) {
        pairs.push({word: frequency.w[i], count: frequency.f[i]});
    }

    // sort the pairs list greatest to smallest
    pairs.sort(function(a, b) {
        return b.count - a.count || a.word.localeCompare(b.word);
    });

    frequency = [];

    // creates the string from the pair and pushes to a new array
    for (let pair of pairs.slice(0, 10)) {
        frequency.push(pair.word + '(' + pair.count + ')')
    }

    // return the array
    return frequency;
}

// function for complex word magic
function deepWordStats(words) {
    let frequency = {w: [], f: []};
    let longest = []
    let palindromes = [];
    let averageLength = 0;

    for (let word of words) {

        // get the index of the word in the array
        let index = frequency.w.indexOf(word);

        // if in array, increment the count, else add to array
        if (index != -1) {
            frequency.f[index] += 1;
        } else {
            frequency.w.push(word);
            frequency.f.push(1);
        }

        // get all unique words
        if (!longest.includes(word)) {
            longest.push(word);
        }

        // checks if word is a palindrome and not already in list
        if (palindrome(word) && !palindromes.includes(word)) {
            palindromes.push(word);
        }

        // sum of length of all words
        averageLength += word.length;
    }

    // gets the top 10 longest words
    longest.sort(function(a, b) {
        return b.length - a.length || a.localeCompare(b);
    });

    // return everything
    return {averageWordLength: averageLength / words.length, palindromes: palindromes, 
            longestWords: longest.slice(0, 10), mostFrequentWords: getFrequencies(frequency)};
}

// returns word statistics
function wordStats(text) {
    let words = [];
    let word = "";

    // iterate through the text character by character reading their codes.
    for (i=0; i<text.length; i++) {

        // only count alphanumeric characters as part of words.
        if (between(text.charCodeAt(i), 48, 57) || between(text.charCodeAt(i), 97, 122)) {

            // add character to word
            word += text.charAt(i);

        } else if (word != "") {

            // if word isn't empty, add it to array of words.
            words.push(word);
            word = "";
        }
    }

    return words;
}

function getStats(text) {

    // make it lowercase cause they want that
    text = text.toLowerCase();

    // then do everything magically
    let words = wordStats(text);
    let lines = lineStats(text);
    let moreWords = deepWordStats(words);

    return {
        // number of characters in text ++gucci
        nChars: text.length, 

        // number of words in text ++gucci
        nWords: words.length,

        // number of lines in text  ++gucci
        nLines: lines.nLines,

        // number of nonempty lines in text ++gucci
        nNonEmptyLines: lines.nNonEmptyLines,

        // the average length of words in text ++gucci
        averageWordLength: moreWords.averageWordLength,

        // the largest line length in text ++gucci
        maxLineLength: lines.maxLineLength,

        // list of palindromes in text ++gucci
        palindromes: moreWords.palindromes,

        // list of the 10 longest words in text
        longestWords: moreWords.longestWords,

        // the 10 most frequent words in text
        mostFrequentWords: moreWords.mostFrequentWords
    };
}
