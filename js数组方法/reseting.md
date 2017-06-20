# 将多维数组拍平为一维数组的方法

### 方法一
先将数组转化为字符串，然后再通过map方法遍历并将字符转化为数字
```
var arr = [1,[[2,3],4],[5,6]];
	function fn(arr){
        var arr1 = (arr + '').split(',');//将数组转字符串后再以逗号分隔转为数组
        var arr2 = arr1.map(function(x){
            return Number(x);
        });
        return arr2;
    }
    console.log(fn(arr));

```

### 方法二
通过数组的递归遍历来实现
```
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
```    