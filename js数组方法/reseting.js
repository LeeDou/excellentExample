var arr = [1,[[2,3],4],[5,6]];
	function fn(arr){
        var arr1 = (arr + '').split(',');//将数组转字符串后再以逗号分隔转为数组
        var arr2 = arr1.map(function(x){
            return Number(x);
        });
        return arr2;
    }
    console.log(fn(arr));

 	// var arr = [1,[2,[[3,4],5],6]];
	var newArr = [];
    
	function fun(arr){
        for(var i=0;i<arr.length;i++){
            if(Array.isArray(arr[i])){
                fun(arr[i]);
            }else{
                newArr.push(arr[i]);
            }
        }
    }
	fun(arr);
	console.log(newArr);//[1, 2, 3, 4, 5, 6]