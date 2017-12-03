window.onload = function() {
	langSelectorInit();
	getLang();
	getNewQuote();
	
	var newQuoteBtn = document.getElementById("newQuoteBtn");
	newQuoteBtn.onclick = getNewQuote;
	
	var tweetBtn = document.getElementById("tweetBtn");
	tweetBtn.onclick = function() {
		alert("This quote may be longer than 140 characters! You may need to edit it before tweeting.");
	};
};


/* Data */
var lang;
var currentIndex;
var generatedQuotes = [];

var quotes = {
		en: [
      {text:"It usually ends in laughter and a delight in the futility of trying to understand what this atom in the universe is, this thing - atoms with curiosity - that looks at itself and wonders why it wonders.", author:"Richard Feynman"},
				{text: "Grown-ups never understand anything by themselves, and it is tiresome for children to be always and forever explaining things to them", author: "The Little Prince - Antoine de Saint-Exupéry"}, 
				{text: "What makes the desert beautiful is that somewhere it hides a well.", author: "Antoine de Saint-Exupéry"},
				{text: "I have a million ideas: they all point to certain death.", author: "Marvin, the Paranoid Android - D.Adams"}, 
				{text: "Fantasy is a place where it rains.", author: "Italo Calvino"}, 
				{text: "Sometimes one who thinks himself incomplete is merely young.", author: "Italo Calvino"},
				{text: "Time to read is always time stolen. Like time to write, for that matter, or time to love.", author: "Daniel Pennac"},			
				{text: "We human beings build houses because we're alive, but we write books because we're mortal. We live in groups because we're sociable, but we read because we know we're alone.", author: "Daniel Pennac"}		
			],
		it: [
      {text: "Solitamente si conclude in una risata, quando ci si arrende di fronte all'impossibilità di capire che cos'è mai questo atomo dell'universo, questa cosa - un atomo curioso - che guarda se stesso e si meraviglia della propria meraviglia. ", author: "Richard Feynman"},
				{text: "I grandi non capiscono mai niente da soli e i bambini si stancano a spiegargli tutto ogni volta.", author: "Il Piccolo Principe - Antoine de Saint-Exupéry"},
				{text: "Ciò che rende bello il deserto è che da qualche parte nasconde un pozzo.", author: "Antoine de Saint-Exupéry"},
				{text: "Ho milioni di idee: conducono tutte a morte certa.", author: "Marvin l'androide paranoico - D.Adams"},
				{text: "La fantasia è un posto dove ci piove dentro.", author: "Italo Calvino"},
				{text: "Alle volte uno si crede incompleto ed è soltanto giovane.", author: "Italo Calvino"},
				{text: "Il tempo per leggere è sempre tempo rubato. Come il tempo per scrivere, d'altronde, o il tempo per amare.", author: "Daniel Pennac"},
				{text: "L'uomo costruisce case perché è vivo, ma scrive libri perché si sa mortale. Vive in gruppo perché è gregario, ma legge perché si sa solo.", author: "Daniel Pennac"}
			]
	};

/* Functions Def */
function getLang() {
	lang = document.getElementById("currentLang").innerHTML.toLowerCase();
}

function updatePageLang() {
	var bilingualItemsList = document.getElementsByClassName("bilingualItem");
	for(var i = 0; i < bilingualItemsList.length; i++) {
		bilingualItemsList[i].classList.toggle("hidden");	/*N.B.: this will only work with two languages */
	}
	printQuote(quotes[lang][currentIndex].text, quotes[lang][currentIndex].author); /* when the user changes lang, this prints the same quote in the new language */
}

function getNewQuote() {
	var quotesArr = quotes[lang];
	
	do {
		currentIndex = Math.floor(Math.random() * quotesArr.length);	/* Stores already generated quotes to avoid repeating */
	} while (generatedQuotes.indexOf(currentIndex) > -1);
	generatedQuotes.push(currentIndex);
	if(generatedQuotes.length == quotesArr.length) {generatedQuotes = [];}	/* Start over when all quotes have been generated */
	
	var text = quotesArr[currentIndex].text;
	var author = quotesArr[currentIndex].author;
	generateTweetURL(text, author);
	printQuote(text, author);
}

function printQuote(text, author) {
	var textCont = document.getElementById("textCont");
	var authorCont = document.getElementById("authorCont");
	textCont.innerHTML = text;
	authorCont.innerHTML = author;
}

function generateTweetURL(text, author) {
	var url="https://twitter.com/intent/tweet?text=";
	url = url + text + " " + author;
	tweetBtn.setAttribute("href", url);
}


/* Custom Selector */
/* Just some playing around here */
function langSelectorInit() {
	var currentLang = document.getElementById("currentLang");
	var langSelector = document.getElementById("langSelector");
	var selectorBtn = document.getElementById("dropDownBtn");
	var dropDownUl = document.getElementById("dropDownList");
	var options = dropDownUl.getElementsByTagName("li");
	
	selectorBtn.onclick = showHideOptions;
	for(var i = 0; i < options.length; i++) {
		options[i].onclick = changeOpt;
	}
	
	function showHideOptions() {
		langSelector.classList.toggle("activeDropDown");
		dropDownUl.classList.toggle("hidden");
	}
  /* REMOVE
	function hideOptions() {
		langSelector.classList.remove("activeDropDown");
		dropDownUl.classList.add("hidden");
	} */
	function changeOpt(eventObj) {
		var newSel = eventObj.target;
		var currentSel = langSelector.getElementsByClassName("selected")[0];
		if(newSel.innerHTML !== currentSel.innerHTML) {
			currentSel.classList.remove("selected");
			newSel.classList.add("selected");
			currentLang.innerHTML = newSel.innerHTML;
			showHideOptions();
			getLang();
			updatePageLang();
		}
	}
}