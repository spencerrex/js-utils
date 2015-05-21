function deleteItem(arr, srchVal) {
	
	var spotsToShift = 0;
	var rtnArr = [];
	for (var i=0; i< arr.length; i++) {
		if (arr[i] == srchVal) {
			spotsToShift++;
		} else {
			
			//using new array - only push onto new array when value is not value to delete
			rtnArr.push(arr[i]);

			
			if (spotsToShift > 0) {
				arr[i-spotsToShift] = arr[i];
				arr[i] = null;
			}
		}
	}

	//return arr;
	return rtnArr;
}

var myArr = [1,2,2,5,2,4,3,3];

//console.log(deleteItem(myArr, 2));


function binarySearch(arr, searchStr, lowerBound, upperBound) {

	if (lowerBound == null) lowerBound = 0;
	if (upperBound == null) upperBound = arr.length - 1;

	var current = Math.floor((lowerBound + upperBound) / 2);
	
	console.log("Lower:", lowerBound, "Upper:", upperBound, "Current:", current, "search str:", searchStr, "Current Element:", arr[current]);
	
	if (arr[current] == searchStr) {
		return current;
	} else if (upperBound - lowerBound <= 1) {
		//console.log("Match not found!", current);
		return -1;
	} else if (searchStr > arr[current]) {
		lowerBound = current+1;
	} else {
		upperBound = current-1;
	}

	binarySearch(arr, searchStr, lowerBound, upperBound);
}

var mySortedArr = [10,20,30,32,40,50,60,62,70,84,90,90,100];
//console.log(binarySearch(mySortedArr, 7));
var foundElement = binarySearch(mySortedArr, 100);

console.log(foundElement);
