var html = '\
	<html>\
		<head>\
			<title>My Scraper</title>\
		</head>\
		<body>\
			<h1>My Title</h1>\
			<p>My <b>paragraph<i>!!!</i></b></p>\
		</body>\
	</html>';


var SyRuP = {};


SyRuP.setName = function (myName) {
	this.name = myName;
};

SyRuP.findChildNodes = function (str, placeHolder, tagName) {

}

SyRuP.findTagName = function (str, placeHolder) {
	//console.log('made it');
	var tagName = '';
	while (str[placeHolder] !== '>' && placeHolder < str.length) {
		//console.log(str[placeHolder]);
		tagName += str[placeHolder];
		placeHolder++;
	}
	return tagName;
};

SyRuP.findText = function (str, placeHolder, tagName) {
	var text = '';
	var textToMatch = '</' + tagName + '>';
	var tracking = true;
	var foundEndTag = false;
	var textThatCouldMatch = '';


	for (var j=placeHolder; j<placeHolder+textToMatch.length; j++) {
		textThatCouldMatch += str[j];
	}
	//console.log(tagName,textToMatch.length,'|'+textToMatch+'|','|'+textThatCouldMatch+'|',placeHolder);

	if (textThatCouldMatch == textToMatch) {
		foundEndTag = true;
	} else {
		textThatCouldMatch = '';
	}

	while (foundEndTag == false && placeHolder < str.length) 
	{

		if (str[placeHolder] == '<') {
			tracking = false;
		} else if (str[placeHolder] == '>') {
			tracking = true;
		} else {
			if (tracking == true) {
				text += str[placeHolder];
			} else {
			}
		}



		for (j=placeHolder; j<placeHolder+textToMatch.length; j++) {
			textThatCouldMatch += str[j];
		}

		if (textThatCouldMatch == textToMatch) {
			foundEndTag = true;
		}

		textThatCouldMatch = '';
		placeHolder++;
	}

	return text;
}

SyRuP.createDomTree = function (domStr) 
{
	var dom = {};
	dom.document = {
		name : 'document',
		childNodes : [],
		parentNode : null
	};

	var currentNode = 'document';

	var tagName = '';
	var i = 0;

	while (i<domStr.length) {

		if (domStr[i] == '<' && domStr[i+1] != '/') {
			tagName = this.findTagName(domStr,i+1);
			
			
			//create child object
			dom[tagName] = {};
			dom[tagName].name = tagName;
			dom[tagName].text = this.findText(domStr,i,tagName);
			dom[tagName].parentNode = currentNode;
			dom[tagName].childNodes = [];

			//add this node as a child node of parent
			dom[currentNode].childNodes.push(tagName);
			currentNode = tagName;
		} else if (domStr[i] == '<' && domStr[i+1] == '/') {
			currentNode = dom[currentNode].parentNode;
		} else {
			//do nothing
		}

		i++;
	}

	return dom;
};


SyRuP.parse = function (domStr) {
	
	//is character a '<'?
		//if yes, 
			//then findTagName (til you find '>')
			//findText, aggregate text until you you find '</tagname>'
			//add tag name as a child node
			//return cursor to end of tag name
		//if no,
			//next character

	//build dom tree
		//find a '<', add child to parent's childnodes array
		//move current node to child
		//find a '</', move current node to parent

	var tag = '';

	var tagNames = [];
	var texts = [];
	var i=0;
	while (i < domStr.length) {
		//console.log(domStr[i]);
		if (domStr[i] == '<' && domStr[i+1] != '/') {
			text = this.findText(domStr,i,tag);
			texts.push(text);
			i++;
			tag = this.findTagName(domStr,i);
			tagNames.push(tag);
			i++;
		} else {
			i++;	
		}
		
	}

	console.log(tagNames);
	console.log(texts);
	//return tagNames;
	
	return 'success!';
	
}

var html_2 = '<html>hi</html>';

console.log(SyRuP.createDomTree(html));
var myDom = SyRuP.createDomTree(html);
console.log(myDom.h1.text);

