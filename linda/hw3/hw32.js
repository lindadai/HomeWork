function contains(aname, namelist) {
    for(var i = 0; i < namelist.length; i++) {
        if(namelist[i] === aname) return true;
    }
    return false;
};


function getnames() {
	var namelist = [];
	for(var i = 0; i < data.length; i++){
		if(!contains(data[i].unitName,namelist)){
			namelist.push(data[i].unitName);
		}
	}
	return namelist;
};


function gettimestamp() {
	var timeStampsList = [];
	var minTime = data[0].beginTimestamp;
	var maxTime = data[0].endTimestamp;
	for(var i = 1; i < data.length; i++){
		
		if (data[i].beginTimestamp < minTime){
			minTime = data[i].beginTimestamp;
		}
		
		if (data[i].endTimestamp > maxTime){
			maxTime = data[i].endTimestamp;
		}
	}

	var startTime = new Date(minTime);
	var endTime = new Date(maxTime);
		
	var startMonth = startTime.getMonth() + 1;
	var startYear = startTime.getFullYear();
	var endMonth = endTime.getMonth() + 1;
	var endYear = endTime.getFullYear();
	
	for(var i = startMonth; i <= 12; i++){
		timeStampsList.push(i + ' ' + startYear);
	}
	for(i = startYear + 1; i < endYear; i++){
		for(var j = 1; j <= 12; j++){
			timeStampsList.push(j + ' ' + i);
		}
	}
	for(i = 1; i <= endMonth; i++){
		timeStampsList.push(i + ' ' + endYear);
	}
	return timeStampsList;
};	

function createTableDet(namelist, timeStampsList) {
	
	var row = namelist.length + 1;
	var column = timeStampsList.length + 1;
	//document.write(<p> "nnnnnnnnn =" row, column </p>);
	document.write("<table border='1' id='table'>");
	var id = 0;
	for(var i = 0; i < row; i++){
    	document.write("<tr>");
    	if(i === 0){
    		for(var j = 0; j < column; j++){
    			if(j === 0){
    				document.write("<td>" +" " +"</td>");
    			}else{
    				document.write("<td>" + timeStampsList[j-1] + "</td>");
    			}
    		}
    	}else{
    		for(j = 0; j < column; j++){
    			if(j === 0){
    				document.write("<td>" + namelist[i-1] + "</td>");
    			}else{
    				document.write("<td id='" + id + "'>" + "</td>");
    				id++;
    			}
    		}
    	}
    	document.write("</tr>");
    }
    document.write("</table>");
    document.write("</br>");
};


function fillincontents(namelist, timeStampsList){ 
	
	for(var k = 0; k < data.length; k++){

		var row;
		for(var i = 0; i < namelist.length; i++){
			if(data[k].unitName.localeCompare(namelist[i]) === 0){
				row = i;
				break;
			}
		}

		var timestart = ((new Date(data[k].beginTimestamp)).getMonth() + 1) + ' ' + (new Date(data[k].beginTimestamp)).getFullYear();
	    var timeend = ((new Date(data[k].endTimestamp)).getMonth() + 1) + ' ' +  (new Date(data[k].endTimestamp)).getFullYear();
	    var startColumn = 0;
	    var endColumn = 0;
		for(var j = 0; j < timeStampsList.length; j++){
			if(timestart.localeCompare(timeStampsList[j]) === 0){
				startColumn = j;
			}
			if(timeend.localeCompare(timeStampsList[j]) === 0){
				endColumn = j;
			}
		}
		
		var pos = row*timeStampsList.length + startColumn;
		for(var i = pos; i <= row*timeStampsList.length + endColumn; i++){
			document.getElementById(i).innerHTML =  data[k].rent;	
		}
	}
};

function  getMaxValue(namelist, timeStampsList){
	//document.getElementById(20).style.backgroundColor = "yellow";
	var colRent = [];
	for(var i = 0; i < timeStampsList.length; i++){
		var curColrent = 0;
		for(var j = 0; j < namelist.length; j++){
			if(document.getElementById(i+j*timeStampsList.length).innerHTML.length === 0){
				curColrent += 0;
			}else{
				curColrent += parseInt(document.getElementById(i+j*timeStampsList.length).innerHTML);
			}
		}
		colRent.push(curColrent);
	}
	var maxValue= Math.max.apply(null, colRent);
	
	var maxcolumn = [];
	for(i = 0; i < colRent.length; i++){
		if(colRent[i] === maxValue){
			maxcolumn.push(i);
		}
	}
	
	for(var i = 0; i < maxcolumn.length; i++){
		for(var j = 0; j < namelist.length; j++){
			document.getElementById(maxcolumn[i]+j*timeStampsList.length).style.backgroundColor = "red";
		}
	}
};


function createTable() {

	var namelist = getnames();
    var timeStampsList = gettimestamp();
    createTableDet(namelist,timeStampsList);
    fillincontents(namelist, timeStampsList);
    getMaxValue(namelist, timeStampsList);

}