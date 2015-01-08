var cmpDate=function(dateA,dateB){
	if(dateA==dateB)
		return 0;
	for(var i=0;i<19;i++)
		if(dateA[i]==dateB[i])
			continue;
		else if(dateA[i]>dateB[i])
			return 1;
		else
			return 2;
}
