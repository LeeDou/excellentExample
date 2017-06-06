# Json与Jsonp

## Json

  json基于文本的数据交换方式，或者叫做数据描述模式。

  ### json的优点：

- 基于纯文本，跨平台传递极其简单；
- JavaScript原生支持，后台语言几乎全部支持；
- 轻量级数据格式，占用字符量少，适合互联网传递
- 可读性强，虽然比不上xml那么一目了然；
- 容易编写和解析

  ### json 的规则：

- json只有两种数据类型描述符，大括号{} 和方括号[] ，其余英文冒号： 是映射符，英文逗号，是分隔符，英文双引号“”是定义符。
- 大括号{} 用来描述一组“不同类型的无序键值对组合”，用方括号[]来描述一组“相同类型有序数据集合”。
- 上述两种集合中若有多个子项，则通过英文，号进行分隔
- 键值以英文：进行分隔，并且键名都加上英文引号“”
- json内部数据类型包括字符串、数字、布尔、日期、null，字符串必须用引号引起来，其余的都不用

  ### json实例：

   ```
// 描述一个人 
var person = {
    "Name": "Bob",
    "Age": 32,
    "Company": "IBM",
    "Engineer": true
}
 
// 获取这个人的信息 
var personAge = person.Age;
 
// 描述几个人 
var members = [
    {
        "Name": "Bob",
        "Age": 32,
        "Company": "IBM",
        "Engineer": true
    },
    {
        "Name": "John",
        "Age": 20,
        "Company": "Oracle",
        "Engineer": false
    },
    {
        "Name": "Henry",
        "Age": 45,
        "Company": "Microsoft",
        "Engineer": false
    }
]
 
// 读取其中John的公司名称 
var johnsCompany = members[1].Company;
 
// 描述一次会议 
var conference = {
    "Conference": "Future Marketing",
    "Date": "2012-6-1",
    "Address": "Beijing",
    "Members":
    [
        {
            "Name": "Bob",
            "Age": 32,
            "Company": "IBM",
            "Engineer": true
        },
        {
            "Name": "John",
            "Age": 20,
            "Company": "Oracle",
            "Engineer": false
        },
        {
            "Name": "Henry",
            "Age": 45,
            "Company": "Microsoft",
            "Engineer": false
        }
    ]
}
// 读取参会者Henry是否工程师 
var henryIsAnEngineer = conference.Members[2].Engineer;
   ```



## Jsonp

### jsopn 的产生：

- Ajax直接请求普通文件存在跨域无权限访问的问题，甭管你是静态页面、web服务、WCF，只要是跨域请求，一律不准
- web页面上调用js文件时不受跨域的影响（凡是拥有src这个属性的标签都拥有跨域的能力），比如<script>、<img>、<iframe>
- 入果想通过纯web端（Active控件、服务端代理、H5的websocket）跨域访问数据就只有一种可能，那就是在远程服务器设法把数据装进js格式的文件里，供客户端调用和进一步处理
- JSON格式的纯字符数据据格式可以简洁的描述复杂数据，json被js原生支持，所以客户端可以处理这种格式的数据
- web客户端通过与调用脚本一模一样的方式，来调用跨域服务器上动态生成的js格式文件，服务器之所以要动态生成json文件，目的就在于要把客户端需要的数据装进去
- 客户端对json文件调用成功后也就获得了自己所需要的数据
- 为了便于客户端使用数据，逐渐形成了一种非正式的传输协议jsonp，该协议的一个要点就是允许客户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住json数据，这样客户端就可以任意制定自己的函数来自动处理返回数据

 ###  jsonp客户端具体实现

1. 我们知道，哪怕跨域js文件中的代码，web页面也是可以无条件执行的。

    远程服务器remoteserver.com根目录下有个remote.js文件代码如下

   ` alert("我是远程文件")`

   本地服务器localserver.com 下有个jsonp.html页面代码如下：

   ```
   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   <html xmlns="http://www.w3.org/1999/xhtml">
   <head>
       <title></title>
       <script type="text/javascript" src="http://remoteserver.com/remote.js"></script>
   </head>
   <body>
    
   </body>
   </html>
   ```

   页面将会弹出一个提示窗体，显示跨域调用成功。

2. 现在我们在jsopn.html页面定义一个函数，然后在远程remote.js中传入数据进行调用。

   jsonp.html页面代码如下：

   ```
   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   <html xmlns="http://www.w3.org/1999/xhtml">
   <head>
       <title></title>
       <script type="text/javascript">
       var localHandler = function(data){
           alert('我是本地函数，可以被跨域的remote.js文件调用，远程js带来的数据是：' + data.result);
       };
       </script>
       <script type="text/javascript" src="http://remoteserver.com/remote.js"></script>
   </head>
   <body>
    
   </body>
   </html>
   ```

   remote.js文件代码如下：

   `           说说JSON和JSONP，也许你会豁然开朗_知识库_博客园                                                                                     `localHandler({"result":"我是远程js带来的数据"});

   运行之后查看结果，页面成功弹出提示窗口，显示本地函数被跨域的远程js调用成功，并且还接收到了远程js带来的数据。很欣喜，跨域远程获取数据的目的基本实现了，但是又一个问题出现了，我怎么让远程js知道它应该调用的本地函数叫什么名字呢？毕竟是jsonp的服务者都要面对很多服务对象，而这些服务对象各自的本地函数都不相同啊？

3. 只要服务端提供js脚本是动态生成的就行，这样调用者可以传递一个参数去告诉服务端“我想要一段调用**函数的js代码，请你返回给我”，于是服务器就可以按照客户端的需求生成js脚本并响应了。

   jsonp.html代码：

   ```
   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   <html xmlns="http://www.w3.org/1999/xhtml">
   <head>
       <title></title>
       <script type="text/javascript">
       // 得到航班信息查询结果后的回调函数
       var flightHandler = function(data){
           alert('你查询的航班结果是：票价 ' + data.price + ' 元，' + '余票 ' + data.tickets + ' 张。');
       };
       // 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）
       var url = "http://flightQuery.com/jsonp/flightResult.aspx?code=CA1998&callback=flightHandler";
       // 创建script标签，设置其属性
       var script = document.createElement('script');
       script.setAttribute('src', url);
       // 把script标签加入head，此时调用开始
       document.getElementsByTagName('head')[0].appendChild(script);
       </script>
   </head>
   <body>
   ```

   ​       这次的代码变化比较大，不再直接把远程js文件写死，而是编码实现动态查询，而这也正是jsonp客户端实现的核心部分，本例中的重点也就在于如何完成jsonp调用的全过程。

   　　我们看到调用的url中传递了一个code参数，告诉服务器我要查的是CA1998次航班的信息，而callback参数则告诉服务器，我的本地回调函数叫做flightHandler，所以请把查询结果传入这个函数中进行调用。

   　　OK，服务器很聪明，这个叫做flightResult.aspx的页面生成了一段这样的代码提供给jsonp.html（服务端的实现这里就不演示了，与你选用的语言无关，说到底就是拼接字符串）：

   ```
   flightHandler({
       "code": "CA1998",
       "price": 1780,
       "tickets": 5
   });
   ```

   ​        我们看到，传递给flightHandler函数的是一个json，它描述了航班的基本信息。运行一下页面，成功弹出提示窗口，jsonp的执行全过程顺利完成！

