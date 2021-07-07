## PHP基础

PHP 脚本可放置于文档中的任何位置

PHP 脚本以 `<?php 开头，以 ?> 结尾` ：


```js
<?php
// 此处是 PHP 代码
$color="red";
echo "My car is " . $color . "<br>";
?>
```

### PHP 支持三种注释：
```php
<!DOCTYPE html>
<html>
<body>

<?php
// 这是单行注释

# 这也是单行注释

/*
这是多行注释块
它横跨了
多行
*/
?>

</body>
</html>
```

### PHP 大小写敏感

- 所有用户定义的函数、类和关键词（例如 if、else、echo 等等）都对大小写不敏感
- 所有变量都对大小写敏感

### PHP变量

- 变量以 $ 符号开头，其后是变量的名称
- 变量名称必须以字母或下划线开头
- 变量名称不能以数字开头
- 变量名称只能包含字母数字字符和下划线（A-z、0-9 以及 _）
- 变量名称对大小写敏感（$y 与 $Y 是两个不同的变量）

### 变量作用域

- local（局部），如：函数内部声明的变量拥有 LOCAL 作用域，只能在函数内部进行访问
- global（全局）,如：函数之外声明的变量拥有 Global 作用域，只能在函数以外进行访问
- static（静态）

### 关键词

#### `global` 关键词用于在函数内访问全局变量。
```php
<?php
$x=5; // 全局作用域
$y=10;

function myTest() {
  // 局部作用域访问外部全局作用域变量
  global $x,$y;
  $y=$x+$y;
  // 等价于  $GLOBALS['y']=$GLOBALS['x']+$GLOBALS['y'];
} 

myTest();

echo $y; // 输出 15
?>
```
####  static 关键词
当函数完成/执行后，会删除所有变量。不过，有时我需要不删除某个局部变量，首次声明变量时使用 static 关键词。

然后，每当函数被调用时，这个变量所存储的信息都是函数最后一次被调用时所包含的信息

### 输出echo 和 print

- echo - 能够输出一个以上的字符串
- print - 只能输出一个字符串，并始终返回 1

### 字符串函数  
- `strlen()` 函数返回字符串的长度，以字符计
- `str_word_count()` 函数对字符串中的单词进行计数
- `strrev()` 函数反转字符串
- `strpos()` 函数用于检索字符串内指定的字符或文本,如果找到匹配，则会返回首个匹配的字符位置。如果未找到匹配，则将返回 FALSE
- `str_replace()` 函数用一些字符串替换字符串中的另一些字符

```php
<?php
echo strlen("Hello world!"); //12
echo str_word_count("Hello world!"); // 输出 2
echo strrev("Hello world!"); // 输出 !dlrow olleH
echo strpos("Hello world!","world"); //6,字符串中首字符的位置是 0
echo str_replace("world", "Kitty", "Hello world!"); // 输出 Hello Kitty!
?>
```

### 常量

- define(常量名称, 常量值,false)，可选的第三个参数规定常量名是否对大小写不敏感。默认是 false
- 常量是全局的

```php
<?php
// 定义对大小写不敏感的常量
define("GREETING", "Welcome to W3School.com.cn!", true);
echo GREETING;
echo "<br>";
// 会输出常量的值
echo greeting;
function myTest() {
    echo GREETING;
}
 
myTest();
?>  

```

### 循环for，foreach
```php
for (init counter; test counter; increment counter) {
  code to be executed;
}
foreach ($array as $value) {
  code to be executed;
}
//示例
<?php 
for ($x=0; $x<=10; $x++) {
  echo "数字是：$x <br>";
} 
?>
<?php 
$colors = array("red","green","blue","yellow"); 

foreach ($colors as $value) {
  echo "$value <br>";
}
?>
```

### 数组

- `索引数组` - 带有数字索引的数组
- `关联数组` - 带有指定键的数组
- `多维数组` - 包含一个或多个数组的数组

```php
<!-- 索引数组 -->
<?php
$cars=array("porsche","BMW","Volvo"); 
//索引是自动分配的（索引从 0 开始）
echo "I like " . $cars[0] . ", " . $cars[1] . " and " . $cars[2] . ".";  // I like porsche, BMW and Volvo.
//count() 函数用于返回数组的长度（元素数）
echo count($cars); // 3

$arrlength=count($cars);

for($x=0;$x<$arrlength;$x++) {
  echo $cars[$x];
  echo "<br>";
}
?>
// 关联数组
<?php
$age=array("Bill"=>"63","Steve"=>"56","Elon"=>"47");
echo "Elon is " . $age['Elon'] . " years old.";  //Elon is 47 years old.

foreach($age as $x=>$x_value) {
   echo "Key=" . $x . ", Value=" . $x_value;
   echo "<br>";
}
// Key=Bill, Value=63
// Key=Steve, Value=56
// Key=Elon, Value=47

?>
```

### 数组排序

- sort() - 以升序对数组排序
- rsort() - 以降序对数组排序
- asort() - 根据值，以升序对关联数组进行排序
- ksort() - 根据键，以升序对关联数组进行排序
- arsort() - 根据值，以降序对关联数组进行排序
- krsort() - 根据键，以降序对关联数组进行排序

### 超全局变量

- `$GLOBALS` 引用全局作用域中可用的全部变量
- `$_SERVER` 保存关于报头、路径和脚本位置的信息
- `$_REQUEST`用于收集 HTML 表单提交的数据
- `$_POST`  广泛用于收集提交 method="post" 的 HTML 表单后的表单数据。$_POST 也常用于传递变量。
- `$_GET` 用于收集提交 HTML 表单 (method="get") 之后的表单数据,$_GET 也可以收集 URL 中的发送的数据
- `$_FILES` 上传的文件。第一个参数是表单的 input name，第二个下标可以是 "name", "type", "size", "tmp_name" 或 "error"。如 `$_FILES["file"]["tmp_name"] `存储在服务器的文件的临时副本的名称
- `$_ENV`
- `$_COOKIE` 用于取回 cookie 的值。
  - setcookie() 函数必须位于 <html> 标签之前，用于设置 cookie。
  - 当删除 cookie 时，您应当使过期日期变更为过去的时间点，如setcookie("user", "", time()-3600);
  - isset() 函数来确认是否已设置了 cookie，如isset($_COOKIE["user"])
- `$_SESSION`存储有关用户会话的信息。
  - 首先必须启动会话，session_start() 函数必须位于 <html> 标签之前
  - 存取session:$_SESSION['views']=1;
  - 终结session: unset($_SESSION['views']); 或者session_destroy();

### form表单

- `htmlspecialchars()` 函数能够避免XSS漏洞
- `trim()` 去除用户输入数据中不必要的字符（多余的空格、制表符、换行）
- `stripslashes() `删除用户输入数据中的反斜杠（\）
- `preg_match() ` 函数检索字符串的模式，如果模式存在则返回 true，否则返回 false

```php
<!DOCTYPE HTML> 
<html>
<head>
<style>
.error {color: #FF0000;}
</style>
</head>
<body> 

<?php
// 定义变量并设置为空值
$nameErr = $emailErr = $genderErr = $websiteErr = "";
$name = $email = $gender = $comment = $website = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   if (empty($_POST["name"])) {
     $nameErr = "姓名是必填的";
   } else {
     $name = test_input($_POST["name"]);
     // 检查姓名是否包含字母和空白字符
     if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
       $nameErr = "只允许字母和空格"; 
     }
   }
   
   if (empty($_POST["email"])) {
     $emailErr = "电邮是必填的";
   } else {
     $email = test_input($_POST["email"]);
     // 检查电子邮件地址语法是否有效
     if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/",$email)) {
       $emailErr = "无效的 email 格式"; 
     }
   }
     
   if (empty($_POST["website"])) {
     $website = "";
   } else {
     $website = test_input($_POST["website"]);
     // 检查 URL 地址语法是否有效（正则表达式也允许 URL 中的斜杠）
     if (!preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i",$website)) {
       $websiteErr = "无效的 URL"; 
     }
   }

   if (empty($_POST["comment"])) {
     $comment = "";
   } else {
     $comment = test_input($_POST["comment"]);
   }

   if (empty($_POST["gender"])) {
     $genderErr = "性别是必选的";
   } else {
     $gender = test_input($_POST["gender"]);
   }
}

function test_input($data) {
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}
?>

<h2>PHP 验证实例</h2>
<p><span class="error">* 必需的字段</span></p>
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>"> 
   姓名：<input type="text" name="name">
   <span class="error">* <?php echo $nameErr;?></span>
   <br><br>
   电邮：<input type="text" name="email">
   <span class="error">* <?php echo $emailErr;?></span>
   <br><br>
   网址：<input type="text" name="website">
   <span class="error"><?php echo $websiteErr;?></span>
   <br><br>
   评论：<textarea name="comment" rows="5" cols="40">
   <br><br>
   性别：
   <input type="radio" name="gender" value="female">女性
   <input type="radio" name="gender" value="male">男性
   <span class="error">* <?php echo $genderErr;?></span>
   <br><br>
   <input type="submit" name="submit" value="提交"> 
</form>
</body>
</html>
```

### 日期和时间

- `date(format,timestamp)` 把时间戳格式化为更易读的日期和时间
  - `d` - 表示月里的某天（01-31）
  - `m` - 表示月（01-12）
  - `Y` - 表示年（四位数）
  - `1` - 表示周里的某天
  - `h` - 带有首位零的 12 小时小时格式
  - `i` - 带有首位零的分钟
  - `s` - 带有首位零的秒（00 -59）
  - `a` - 小写的午前和午后（am 或 pm）
- `mktime()` 函数返回日期的 Unix 时间戳。Unix 时间戳包含 Unix 纪元（1970 年 1 月 1 日 00:00:00 GMT）与指定时间之间的秒数。
- `strtotime()`把人类可读的字符串转换为 Unix 时间

```php
<?php
echo "今天是 " . date("Y/m/d") . "<br>"; // 今天是 2021/05/26
echo "今天是 " . date("Y.m.d") . "<br>"; //今天是 2021.05.26
echo "今天是 " . date("Y-m-d") . "<br>"; //今天是 2021-05-26  
echo "今天是 " . date("l");  //今天是 Wednesday

版权所有 2008-<?php echo date("Y")?>;  //版权所有 2008-2021
echo "当前时间是 " . date("h:i:sa");   // 当前时间是 08:51:54am

date_default_timezone_set("Asia/Shanghai");
echo "当前时间是 " . date("h:i:sa");  //当前时间是 08:59:20am

$d=mktime(9, 12, 31, 6, 10, 2015);
echo "创建日期是 " . date("Y-m-d h:i:sa", $d); //创建日期是 2015-06-10 09:12:31am

$d=strtotime("10:38pm April 15 2015");
echo "创建日期 " . date("Y-m-d h:i:sa", $d); //创建日期 2015-04-15 10:38:00pm

$d=strtotime("tomorrow");
echo date("Y-m-d h:i:sa", $d) . "<br>"; //2021-05-27 12:00:00am

$d=strtotime("next Saturday");
echo date("Y-m-d h:i:sa", $d) . "<br>"; //2021-05-29 12:00:00am

$d=strtotime("+3 Months");
echo date("Y-m-d h:i:sa", $d) . "<br>"; //2021-08-26 09:00:22am

// 输出下周六的日期
$startdate=strtotime("Saturday");
$enddate=strtotime("+6 weeks",$startdate);
while ($startdate <  $enddate) {
   echo date("M d", $startdate),"<br>";
   $startdate = strtotime("+1 week", $startdate);
}
// May 29
// Jun 05
// Jun 12
// Jun 19
// Jun 26
// Jul 03

$d1=strtotime("December 31");
$d2=ceil(($d1-time())/60/60/24);
echo "距离十二月三十一日还有：" . $d2 ." 天。"; 
// 距离十二月三十一日还有：219 天。

?>
```

### 引用组件
- `require` 会生成致命错误（E_COMPILE_ERROR）并停止脚本。使用场景:当文件被应用程序请求时。
- `include` 只生成警告（E_WARNING），并且脚本会继续。使用场景:当文件不是必需的，且应用程序在文件未找到时应该继续运行时

### 文件操作
- `readfile()` 读取文件，并把它写入输出缓冲
- `fopen()` 更好的打开文件的方式。第一个参数包含被打开的文件名，第二个参数规定打开文件的模式
- `fread()`读取打开的文件。第一个参数包含待读取文件的文件名，第二个参数规定待读取的最大字节数
- `fclose()`关闭打开的文件
- `fgets()`于从文件读取单行
- `feof()`检查是否已到达 "end-of-file" (EOF)。对于遍历未知长度的数据很有用。
- `fgetc() `从文件中读取单个字符
- `fwrite()`写入文件。第一个参数包含要写入的文件的文件名，第二个参数是被写的字符串

```php
// 文件上传
<?php
if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/pjpeg"))
&& ($_FILES["file"]["size"] < 20000))
  {
  if ($_FILES["file"]["error"] > 0)
    {
    echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
    }
  else
    {
    echo "Upload: " . $_FILES["file"]["name"] . "<br />";
    echo "Type: " . $_FILES["file"]["type"] . "<br />";
    echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
    echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";

    if (file_exists("upload/" . $_FILES["file"]["name"]))
      {
      echo $_FILES["file"]["name"] . " already exists. ";
      }
    else
      {
      move_uploaded_file($_FILES["file"]["tmp_name"],
      "upload/" . $_FILES["file"]["name"]);
      echo "Stored in: " . "upload/" . $_FILES["file"]["name"];
      }
    }
  }
else
  {
  echo "Invalid file";
  }
?>
```
###  发送邮件

      mail(to,subject,message,headers,parameters)
### 错误处理
  - ` die() `基本的错误处理
  - `error_function(error_level,error_message,error_file,error_line,error_context)`自定义错误处理器

