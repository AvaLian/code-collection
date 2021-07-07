
- SQL 语句对大小写不敏感。SELECT 等效于 select。
- 通配符
  - `%` :替代一个或多个字符
  - `_` :仅替代一个字符
  - `[charlist]` :字符列中的任何单一字符
  - `[^charlist]或者[!charlist]` :不在字符列中的任何单一字符

## sql基础

### select查询
```js
select * from 表名称 //选择所有

SELECT 列名称 FROM 表名称   //选择列

SELECT LastName,FirstName FROM Persons  //选择多列

SELECT DISTINCT 列名称 FROM 表名称  //DISTINCT 用于返回唯一不同的值, 列名称中如果有重复值，则只返回一次

```

### 条件查询 `where`

```
SELECT 列名称 FROM 表名称 WHERE 列 运算符(可选值为： = ,<>,>,<,>=,<=,BETWEEN,LIKE) 值
```

##### 引号的使用

    SQL 使用单引号来环绕文本值（大部分数据库系统也接受双引号）。如果是数值，请不要使用引号
    
    SELECT * FROM Persons WHERE FirstName='Bush'
    SELECT * FROM Persons WHERE Year>1965

### AND 和 OR 运算符用于基于一个以上的条件对记录进行过滤。
```js
SELECT * FROM Persons WHERE FirstName='Thomas' AND LastName='Carter'

SELECT * FROM Persons WHERE firstname='Thomas' OR lastname='Carter'

SELECT * FROM Persons WHERE (FirstName='Thomas' OR FirstName='William')
AND LastName='Carter'
```
### ORDER BY 语句用于对结果集进行排序,默认升序。
```js
SELECT Company, OrderNumber FROM Orders ORDER BY Company

SELECT Company, OrderNumber FROM Orders ORDER BY Company, OrderNumber

SELECT Company, OrderNumber FROM Orders ORDER BY Company DESC

SELECT Company, OrderNumber FROM Orders ORDER BY Company DESC, OrderNumber ASC
```

### INSERT INTO 插入语句
```js
INSERT INTO 表名称 VALUES (值1, 值2,....)

INSERT INTO table_name (列1, 列2,...) VALUES (值1, 值2,....)

```
### update修改
```js
UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值

UPDATE Person SET FirstName = 'Fred' WHERE LastName = 'Wilson'  //修改某行单列 

UPDATE Person SET Address = 'Zhongshan 23', City = 'Nanjing' 
WHERE LastName = 'Wilson' //修改某行多列 
```
###  DELETE删除行
```js
DELETE FROM 表名称 WHERE 列名称 = 值
//不删除表的情况下删除所有的行
DELETE FROM table_name
// 或者
DELETE * FROM table_name
```
---
## sql高级

### TOP规定要返回的记录的数目
```js
SELECT TOP number|percent column_name(s)
FROM table_name
//等价于MySQL 
SELECT column_name(s)
FROM table_name
LIMIT number
//等价于Oracle 
SELECT column_name(s)
FROM table_name
WHERE ROWNUM <= number

//示例
SELECT TOP 2 * FROM Persons
SELECT TOP 50 PERCENT * FROM Persons
```
### LIKE: 在 WHERE 子句中搜索列中的指定模式
```js
SELECT column_name(s)
FROM table_name
WHERE column_name LIKE pattern

//示例
SELECT * FROM Persons
WHERE City LIKE 'N%'  //选取居住在以 "N" 开始的城市里的人

SELECT * FROM Persons
WHERE City LIKE '%g' //选取居住在以 "g" 结尾的城市里的人

SELECT * FROM Persons
WHERE City LIKE '%lon%' //选取居住在包含 "lon" 的城市里的人

SELECT * FROM Persons
WHERE City NOT LIKE '%lon%' //选取居住在不包含 "lon" 的城市里的人

SELECT * FROM Persons
WHERE FirstName LIKE '_eorge' //选取名字的第一个字符之后是 "eorge" 的人

SELECT * FROM Persons
WHERE LastName LIKE 'C_r_er' //选取的这条记录的姓氏以 "C" 开头，然后是一个任意字符，然后是 "r"，然后是任意字符，然后是 "er"

SELECT * FROM Persons
WHERE City LIKE '[ALN]%' //选取居住的城市以 "A" 或 "L" 或 "N" 开头的人

SELECT * FROM Persons
WHERE City LIKE '[!ALN]%' //选取居住的城市不以 "A" 或 "L" 或 "N" 开头的人
```

### IN 操作符允许我们在 WHERE 子句中规定多个值。
```js
SELECT column_name(s)
FROM table_name
WHERE column_name IN (value1,value2,...)

//示例
SELECT * FROM Persons
WHERE LastName IN ('Adams','Carter') //选取LastName为 Adams 和 Carter 的人
```

### 操作符 BETWEEN ... AND 会选取介于两个值之间的数据范围。这些值可以是数值、文本或者日期。

```js
SELECT column_name(s)
FROM table_name
WHERE column_name
BETWEEN value1 AND value2

// 示例
SELECT * FROM Persons
WHERE LastName
BETWEEN 'Adams' AND 'Carter' //以字母顺序显示介于 "Adams"（包括）和 "Carter"（不包括）之间的人

SELECT * FROM Persons
WHERE LastName
NOT BETWEEN 'Adams' AND 'Carter' //显示范围之外的人
```

### Alias:为列名称和表名称指定别名
```js
SELECT column_name(s)
FROM table_name
AS alias_name  //表的 SQL Alias 语法

SELECT column_name AS alias_name
FROM table_name //列的 SQL Alias 语法

//示例
SELECT po.OrderID, p.LastName, p.FirstName
FROM Persons AS p, Product_Orders AS po
WHERE p.LastName='Adams' AND p.FirstName='John'

SELECT LastName AS Family, FirstName AS Name
FROM Persons
```
### join 用于根据两个或多个表中的列之间的关系，从这些表中查询数据。

- JOIN或者INNER JOIN : 如果表中有至少一个匹配，则返回行
- LEFT JOIN: 即使右表中没有匹配，也从左表返回所有的行
   ```js
  // LEFT JOIN 关键字会从左表 (table_name1) 那里返回所有的行，即使在右表 (table_name2) 中没有匹配的行。
    SELECT column_name(s)
    FROM table_name1
    LEFT JOIN table_name2 
    ON table_name1.column_name=table_name2.column_name
  ```  
- RIGHT JOIN: 即使左表中没有匹配，也从右表返回所有的行
  ```js
  // RIGHT JOIN 关键字会右表 (table_name2) 那里返回所有的行，即使在左表 (table_name1) 中没有匹配的行。
    SELECT column_name(s)
    FROM table_name1
    RIGHT JOIN table_name2 
    ON table_name1.column_name=table_name2.column_name
  ```  
- FULL JOIN: 只要其中一个表中存在匹配，就返回行


```js
SELECT Persons.LastName, Persons.FirstName, Orders.OrderNo
FROM Persons, Orders
WHERE Persons.Id_P = Orders.Id_P 
//等价于
SELECT Persons.LastName, Persons.FirstName, Orders.OrderNo
FROM Persons
INNER JOIN Orders
ON Persons.Id_P = Orders.Id_P
ORDER BY Persons.LastName
```

### UNION 用于合并两个或多个 SELECT 语句的结果集

请注意，UNION 内部的 SELECT 语句必须拥有相同数量的列。列也必须拥有相似的数据类型。同时，每条 SELECT 语句中的列的顺序必须相同。

```js
SELECT column_name(s) FROM table_name1
UNION
SELECT column_name(s) FROM table_name2
//注释：默认地，UNION 操作符选取不同的值。如果允许重复的值，请使用 UNION ALL。
SELECT column_name(s) FROM table_name1
UNION ALL
SELECT column_name(s) FROM table_name2
```
### SELECT INTO从一个表中选取数据，然后把数据插入另一个表中

SELECT INTO 语句常用于创建表的备份复件或者用于对记录进行存档

```js
//把所有的列插入新表
SELECT *
INTO new_table_name [IN externaldatabase] 
FROM old_tablename
//只把希望的列插入新表
SELECT column_name(s)
INTO new_table_name [IN externaldatabase] 
FROM old_tablename

//DEMO
SELECT *
INTO Persons_backup
FROM Persons  //制作 "Persons" 表的备份复件

SELECT LastName,FirstName
INTO Persons_backup
FROM Persons //拷贝某些域

SELECT LastName,Firstname
INTO Persons_backup
FROM Persons
WHERE City='Beijing'  //子通过从 "Persons" 表中提取居住在 "Beijing" 的人的信息，创建了一个带有两个列的名为 "Persons_backup" 的表

SELECT Persons.LastName,Orders.OrderNo
INTO Persons_Order_Backup
FROM Persons
INNER JOIN Orders
ON Persons.Id_P=Orders.Id_P //会创建一个名为 "Persons_Order_Backup" 的新表，其中包含了从 Persons 和 Orders 两个表中取得的信
```

### 新建数据库

    CREATE DATABASE database_name

### 新建表
| 数据类型                                               | 描述                                                                                   |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| integer(size) ,int(size), smallint(size),tinyint(size) | 仅容纳整数。在括号内规定数字的最大位数                                                 |
| decimal(size,d),numeric(size,d)                        | 容纳带有小数的数字。"size" 规定数字的最大位数。"d" 规定小数点右侧的最大位数。          |
| char(size)                                             | 容纳固定长度的字符串（可容纳字母、数字以及特殊字符）。在括号中规定字符串的长度。       |
| varchar(size)                                          | 容纳可变长度的字符串（可容纳字母、数字以及特殊的字符）。在括号中规定字符串的最大长度。 |
| date(yyyymmdd)                                         | 容纳日期。                                                                             |

**sql约束**
UNIQUE 和 PRIMARY KEY 约束均为列或列集合提供了唯一性的保证。`每个表可以有多个 UNIQUE 约束，但是每个表只能有一个 PRIMARY KEY 约束`
| 约束           | 作用                                                                                         |
| -------------- | -------------------------------------------------------------------------------------------- |
| NOT NULL       | 强制列不接受 NULL 值                                                                         |
| UNIQUE         | 约束唯一标识数据库表中的每条记录                                                             |
| PRIMARY KEY    | 约束唯一标识数据库表中的每条记录                                                             |
| FOREIGN KEY    | 一个表中的 FOREIGN KEY 指向另一个表中的 PRIMARY KEY                                          |
| CHECK          | 限制列中的值的范围                                                                           |
| DEFAULT        | 向列中插入默认值                                                                             |
| AUTO INCREMENT | 在新记录插入表中时生成一个唯一的数字,默认地，AUTO_INCREMENT 的开始值是 1，每条新记录递增 1。 |


```js
CREATE TABLE 表名称
(
列名称1 数据类型,
列名称2 数据类型,
列名称3 数据类型,
....
)

//示例
CREATE TABLE Persons
(
Id_P int,
LastName varchar(255),
FirstName varchar(255),
Address varchar(255),
City varchar(255)
)
```

### CREATE INDEX在表中创建索引

在不读取整个表的情况下，索引使数据库应用程序可以更快地查找数据。
```js
CREATE INDEX index_name
ON table_name (column_name)

CREATE UNIQUE INDEX index_name
ON table_name (column_name) // CREATE UNIQUE INDEX在表上创建一个唯一的索引
```

### DROP删除索引、表和数据库
```js
DROP TABLE 表名称
DROP DATABASE 数据库名称
```

### ALTER TABLE在已有的表中添加、修改或删除列
```js
ALTER TABLE table_name
ADD column_name datatype //添加列

ALTER TABLE table_name 
DROP COLUMN column_name //删除表中的列

ALTER TABLE table_name
ALTER COLUMN column_name datatype //修改
```

---
## SQL 函数

```js
//AVG 函数返回数值列的平均值。NULL 值不包括在计算中。
SELECT AVG(column_name) FROM table_name

SELECT Customer FROM Orders
WHERE OrderPrice>(SELECT AVG(OrderPrice) FROM Orders)

//COUNT() 函数返回匹配指定条件的行数。
SELECT COUNT(column_name) FROM table_name  //COUNT(column_name) 函数返回指定列的值的数目（NULL 不计入）
SELECT COUNT(*) FROM table_name //COUNT(*) 函数返回表中的记录数
SELECT COUNT(DISTINCT column_name) FROM table_name //COUNT(DISTINCT column_name) 函数返回指定列的不同值的数目

//FIRST() 函数返回指定的字段中第一个记录的值。
SELECT FIRST(column_name) FROM table_name

//LAST() 函数返回指定的字段中最后一个记录的值。
SELECT LAST(column_name) FROM table_name

//MIN 和 MAX 也可用于文本列，以获得按字母顺序排列的最高或最低值。
//MAX 函数返回一列中的最大值。NULL 值不包括在计算中。
// MIN 函数返回一列中的最小值。NULL 值不包括在计算中。
SELECT MAX(column_name) FROM table_name
SELECT MIN(column_name) FROM table_name

// SUM 函数返回数值列的总数（总额）。
SELECT SUM(column_name) FROM table_name

//GROUP BY 语句用于结合合计函数，根据一个或多个列对结果集进行分组。
SELECT column_name, aggregate_function(column_name)
FROM table_name
WHERE column_name operator value
GROUP BY column_name

// HAVING :在 SQL 中增加 HAVING 子句原因是，WHERE 关键字无法与合计函数一起使用
SELECT column_name, aggregate_function(column_name)
FROM table_name
WHERE column_name operator value
GROUP BY column_name
HAVING aggregate_function(column_name) operator value

//UCASE 函数把字段的值转换为大写。
SELECT UCASE(column_name) FROM table_name

//LCASE 函数把字段的值转换为小写。
SELECT LCASE(column_name) FROM table_name

//MID 函数用于从文本字段中提取字符。column_name:必需。要提取字符的字段。;start:必需。规定开始位置（起始值是 1）。;length:可选。要返回的字符数。如果省略，则 MID() 函数返回剩余文本。
SELECT MID(column_name,start[,length]) FROM table_name

//LEN 函数返回文本字段中值的长度。
SELECT LEN(column_name) FROM table_name

//ROUND 函数用于把数值字段舍入为指定的小数位数。
SELECT ROUND(column_name,decimals) FROM table_name

//NOW 函数返回当前的日期和时间。
SELECT NOW() FROM table_name

//FORMAT 函数用于对字段的显示进行格式化。
SELECT FORMAT(column_name,format) FROM table_name
```
