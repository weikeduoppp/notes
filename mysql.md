##  	mysql数据库基本介绍 

- 基本知识
- 数据库分类
- SQL简介
- MySQL访问



### 基本知识

数据库: database , 是一种存储数据的仓库

- 根据数据结构组织,存储和管理数据
- 长期, 高效的管理和存储数据
- 存, 读


###  数据库分类

现在常用数据库模型

- 关系型数据库: 基于关系模型的数据结构 (二维表) 通常存储在磁盘
- 非关系型数据库: 没有具体模型的数据结构 (键值对) 通常存储在内存

### 关系型数据库

- 关系模型
    - 关系数据结构 (存储)
    - 关系操作集合 (操作)
    - 关系完整性约束 (约束)
- 存储在磁盘 (永久性存储)
- 关系数据库 (DBS) 有四层结构
    - 数据管理系统 (DBMS): 管理系统运行 
    - 数据库 (DB) 
    - 数据表 (Table)
    - 数据字段 (Field) 列
- 关系数据库产品
    - 大型: Oracle , DB2    
    - 中型: MySQL, SqlServer
    - 小型: Sybase, Acess
    

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200424112808565.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

### SQL 介绍

针对关系型数据库特殊标准化的编程语言

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020042411285431.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


### MySql 安装 |  配置

安装:

https://downloads.mysql.com/archives/installer/

教程: 

https://zhuanlan.zhihu.com/p/37152572


```
# 公司
root/luojin
```

安装 Navicat Premium 12

https://www.cnblogs.com/wei9593/p/11907307.html

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020042416580717.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200424165806915.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020042416580797.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200426101417917.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)
```
# 密文登录  -h$HOST -P$PORT -u账户 -p
mysql -uroot -p
```


### MySQL 基本操作

- SQL基本语法
- SQL库操作
- SQL表操作
- SQL数据操作



#### SQL语法规则


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200426101417895.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

==SQL语句一定要有结束符==

eg: 

1. 结构创建

```
create 结构类型 结构名 结构描述;

// eg
create database basename;

create table tablename;
```
2. 显示结构

```
# 查看结构
show 结构类型(复数);
eg: show tabels;

# 显示结构创建详情
show create 结构类型 结构名;
eg: show create table tablename;
```

3. 数据操作 (数据表)

```
# 新增数据
insert into 表名 values;

# 查看
select form 表名;

# 更新
update 表名 set;

# 删除
delete form 表名;

```

### SQL库操作

#### 创建数据库


```
create database 数据库名 [数据库选项]
```

数据库选项: 
- 字符集 charset / character set
- 排序规则(校对集) collate



```mysql
#eg 
create database db_1;

create database db_2 charset utf8MB4;

s
```

#### 查看数据库

作用: 查看数据库是否存在. 数据库字符集相关信息

```mysql
show databases;

# 显示创建详情
show create database db_1;
```

#### 使用数据库

简化后续操作. (不必加上数据库名)

```mysql
use db_1
```

#### 修改数据库

- 字符集 charset / character set
- 排序规则(校对集) collate

```mysql
alter database 数据库名 库选项

# eg  如果字符集修改了. 那校对集也要同时修改
alter database db_1 charset gbk collate gbk_chinese_ci;
```

#### 删除数据库


```
drop database 库名
```


### SQL表操作

#### 创建表

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200426170544255.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

格式: 

```
create table [数据库名.]表名(
    字段名 字段类型,
    ...,
    字段名 字段类型
)表选项;
```


```mysql
# eg
create table db_1.t_1(
    name varchar(50),
    age int
);

create table db_1.t_2(
    name varchar(50),
    age int
)engine Innodb charset utf8MB4;

# 复制相关结构的表
create table t_3 like db_1.t_2
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200426181904357.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### 查看表

所有表: 
> show tables;

指定库的表: 
> show tables from 库名;

匹配关联表:  (_单个匹配, %模糊匹配)

以 (单字)like 结尾的表  eg: alike
> show tables like '_like';

以 (多个)like 结尾的表  eg: t_alike
> show tables like '%like';

查看详情:  三种写法
> desc 表名;
> describe 表名;
> show columns from 表名;

以什么结尾

> \g: 以\g结尾和分号;没区别

> \G: 以行显示

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200426181904156.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


#### 更改表

- 修改表名 rename table 旧表 to 新表
- 修改选项 alter table 表名 [表选项]

```
rename table t_3 to t_1;

```


### SQL(表)字段操作

#### 更改字段(增删改-前提表存在)

都需要跟上字段类型

> 新增字段

```mysql
alter table 表名 add 字段名 字段类型 [字段属性] [字段位置];

# eg
alter table t_1 add email vachar(255);
alter table questionnaire modify Timestamp bigint(20) unsigned not null unique comment '时间戳';
```

> 字段位置

- 分两种
    - 第一: first
    - 某字段之后: after 存在的字段名
- 适用于新增字段, 修改

```mysql
alter table 表名 字段操作 字段位置;

# eg
alter table t_1 add id int first;

alter table t_1 add create_time time(255) after age;
```

> 修改字段名, 类型.

```mysql
alter table 表名 change 旧字段 新字段 字段类型 [字段属性] [字段位置];
```

> 修改字段类型, 属性, 位置.

```mysql
alter table 表名 modify 字段名 字段类型 [属性] [位置];
```

> 删除字段

```mysql
alter table 表名 drop 字段;
```

### SQL 数据操作


#### 新增数据


全字段插入: insert into 表名 values ( 字段列表顺序对应的所有值 ) 

部分字段插入(灵活自己定顺序): insert into 表名 (部分字段) values (部分字段对应的值)


eg: 

```mysql
# 全字段
insert into t_1 values(2, 'yewq2', 18);

# 部分字段插入, 可自己调整顺序. 值需要对应
insert into t_1 (id, name, age) values(3, 'yewq3', 18);

insert into t_1 (`id`, `name`, `age`) values(4, 'yewq4', 18);
```


#### 查询数据

> select * | 字段列表 from 表名 [where查询条件];

查询条件: where [条件]

```mysql
select * from db_1.t_1;

select id,name from db_1.t_1;

# 带条件
select `id`,`name` from db_1.t_1 where id = '1';
select id,name from db_1.t_1 where name = 'yewq';
select id,name from db_1.t_1 where name like 'yewq_';
select id,name from db_1.t_1 where name like 'y%';
```

#### 更新数据

> update 表名 set 字段 - 新值 [, 字段 = 新值] [where条件];

```mysql
# 更新所有
update db_1.t_1 set age = 19;

# 带条件 常用
update t_1 set name = 'yewq_new' where id = 1;
```

#### 删除数据

> delete from 表名 [where条件];

```mysql
delete from db_1.t_1 where id = 4;
```


### 字符集, 校对集

#### 字符集
- 字符集概念

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020042817140240.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200428171402374.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200428171401923.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200428171401930.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020042817140255.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


- MySQL字符集关系

```mysql
# 查看MySQL支持的字符集
show charset;
```

- 解决乱码问题


```
# 设置客户端字符集
set name gbk;

# 查看字符集
show variables like 'character%';
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429120310490.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


- 字符集设置原理


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429120310452.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429120310500.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429120310474.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



#### 校对集

> 概念

数据比较的规则

- 大小写不敏感: _ci, case insensitive (不区分大小写)
- 大小写敏感: _cs,  case sensitive (区分大小写)
- 二进制比较: _bin (区分大小写)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429150455343.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)
```
show collation;
```

升序

```
select * from t_5 order by [字段名];
```


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429150455384.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


### 字段类型

四大类型:

- 整数类型
- 小数类型
- 字符串类型
- 时间日期类型


#### 整数类型 int

有效的整数数据;

- 迷你: tinyint, 1字节
- 短: smallint, 2字节
- 中: mediumint, 3~
- 标准: int, 4~
- 长: bigint, 8~

再看 是否有无符号: (正数 /负数);

- unsigned: 无符号
- 默认有符号.

```mysql
create table t_6(
    money smallint,
    age tinyint unsigned
);
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429154616423.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020042915460887.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


> 显示宽度  eg: int(L)

数值宽度(位数), 不影响数值大小.
- tinyint(4): 多了个符号  -128~127
- tinyint(3) unsigned: 0~255  


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429163434923.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

eg:

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429163434996.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



#### 小数类型(浮点数) float/double

- float: 单精度 4字节 精度范围(6~7)
- double: 双精度 8字节 精度范围(14~15)

浮点数超过精度范围四舍五入

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429172602454.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429172602339.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)   


#### 小数类型(定点型) decimal

> decimal 精确小数. 有效数位 => 65(max).

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429175344391.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

```mysql
create table t_12 (
    money decimal(12,2),
    bet decimal(10,2)
)
```

#### 字符串类型(定长型) char

char(L): 分配固定长度的存储空间;

L: 长度. max: 255;

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430111647435.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



eg: 手机号/身份证
```mysql
create table t_9 (
    phone char(11),
    id_number char(18)
);

insert into t_9 values('13202510502', '441622199510098218');
```



#### 字符串类型(变长型) varchar


vachar(L): 根据实际存储数据变化存储空间.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430142802267.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


eg: 不规则的数据: 用户名/密码/姓名  


```mysql
create table t_10 (
    `name` varchar(10),
    `password` varchar(12),
    `email` varchar(24)
);
insert into t_10 values('name', 'password', '1647090769@qq.com');
```


#### 字符串类型(文本字符串) text

文本字符串: 较长的文本

- text
- blob


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430142802294.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


eg: 文章类型 超255的

```mysql
# 标题, 作者, 内容
create table t_11 (
    title varchar(40),
    author varchar(15),
    content text
);

insert into t_11 values('标题', '作者', '内容....');
```

#### 字符串类型(枚举) enum()

映射存储方式; 单选模式; 优化(节省)存储空间; 规范数据模型;

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430151614830.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


eg: 

```mysql
create table t_12(
    type enum('少年', '青年', '中年', '老年')
);
insert into t_12 values('少年');

# error
insert into t_12 values('未成年');
```

查询 对应关系, enum实际存储的是数字

```mysql
# 可以使用字段+0来判断数据具体对应的关系
select type, type+0 from t_12;

insert into t_12 (`type`) values (1);
```


原理:

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430151614865.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



#### 字符串类型(集合) set()

多选(用逗号隔开); set ;优化(节省)存储空间; 规范数据模型;


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430194830418.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430194830467.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

eg: 

```
# 个人爱好
create table t_13 (
    hobby set('运动','看书','电视','游戏','户外')
);

insert into t_13 (hobby) values ('运动');
insert into t_13 (hobby) values ('运动,户外');
```



![在这里插入图片描述](https://img-blog.csdnimg.cn/2020043019544687.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/2020043019544692.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


### 日期类型

#### 年(year)
范围: 1901 ~ 2155;
效果一致:
- year
- year(4)


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506104655765.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506104655781.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



#### 时间戳(timestamp)

mysql8 取消了 timestamp 默认自动更新. 如果需要, 则添加 **on update current_timestamp**

YYYY-MM-DD HH:II:SS

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506115504403.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

```mysql
create table t_14 (
    shop int,
    change_time timestamp,
    update_time timestamp on update current_timestamp
);

insert into t_14 values (1, '1970-10-01 23:12:55', '1970-10-01 23:12:55');
insert into t_14 values (2, '19701001231255', '19701001231255');
```


#### 日期(date)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506121513127.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

```mysql

# 生日
create table t_15 (
    name varchar(12),
    birthday date
);
insert into t_15 values ('jack', '1995-10-09');
```



#### 日期时间(datetime)

范围比时间戳广. 实际使用大多用int unsigned存储时间戳. 使用时再格式处理. 


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506122113534.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

```mysql
# 出生时间. 死亡时间.
create table t_16 (
    name varchar(12),
    birth_time datetime,
    death_time datetime
);
insert into t_16 values ('jack', '1995-10-09 00:00:00', '9999-10-09 00:00:00');

```


#### 时间(time)

记录时间或时间段. (eg: 过期时间)


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506145502204.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506145502212.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



#### 总结

常用: tinyint, int, char, varchar, text;


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506145853216.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)




### (字段)属性

#### NULL

默认为NULL;

- NULL: 数据允许为空;
- NOT NULL: 数据不允许为空;



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506191025709.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


#### default 属性

```mysql
create table t_17 (
    money decimal(16,2) default 0.00 not null
);

# 默认
insert into t_17 values ();
insert into t_17 values (default);

insert into t_17 values (100);
```

#### primary key 主键

不为null;

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200507154108364.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)
```mysql
create table t_18 (
    id int unsigned primary key,
    name varchar(20) not null,
    money decimal(16,2) default 0.00 not null
);

# 复合主键
create table t_19 (
    id int unsigned,
    account int(10) unsigned,
    name varchar(20) not null,
    money decimal(16,2) default 0.00 not null,
    primary key(id,account)
);

insert into t_18 values (1,'tim', default);

# 复合
insert into t_19 values (1, 123, 'tim', default);
insert into t_19 values (2, 123, 'tim', default);
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200507154108369.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


####  主键管理

- 删除
- 修改(先删除后添加)
- 增加


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200507155152625.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


#### 自增长属性

auto_increment; 整数类型, 索引(逻辑主键).

- auto_increment_offset: 初始值 1
- auto_increment_increment: 步长

```mysql
create table t_20 (
    id int unsigned primary key auto_increment,
    student_num int(8) zerofill not null,
    student_name varchar(20) not null
);

# null/default 触发
insert into t_20 values(null, 1, 'eim');
insert into t_20 values(default, 2, 'ka');

# 主动控制
insert into t_20 values(10, 3, 'eim');
# auto_increment = 11
insert into t_20 values(null, 4, 'eim');
```


#### 自增长管理

修改自增长的值. 

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200507162506912.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


#### unique 唯一键

unique; 唯一性; 用于检索;

- 为空: 普通唯一键
- 不为空: 相对于主键

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200507171128126.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

```mysql
create table t_21 (
    username varchar(20) unique,
    password varchar(20) not null
);

insert into t_21 values (null, 'password');
insert into t_21 values ('name', 'password');
```

复合唯一键

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020050717112867.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020050717112863.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)




#### 唯一键管理

- 删除
- 增加


```mysql
# 删除
alter table 表名 drop index 唯一键名;

alter table t_21 drop index username;


# 新增
alter table 表名 add unique key [可指定键名] (字段列表);

alter table t_21 add unique key (password);
alter table t_22 add unique key `stu_course` (stu_name, course);
```


#### comment 注释

```mysql
create table t_23 (
    username varchar(20) unique,
    password varchar(20) not null comment '密码'
) charset utf8;
```


### 数据库记录长度

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200507183512367.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200507183512311.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


### 关系型数据库设计范式


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200508112457805.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

eg: 

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200508112457786.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200508112457796.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### 第一范式: 1NF

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200508120538248.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### 第二范式: 2NF

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200508150317622.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)





![在这里插入图片描述](https://img-blog.csdnimg.cn/20200508150317615.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)





![在这里插入图片描述](https://img-blog.csdnimg.cn/20200508150317541.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200508150530692.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)






![在这里插入图片描述](https://img-blog.csdnimg.cn/20200508150317513.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



#### 第三范式

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200508150317521.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



#### 逆规范化

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200508152145988.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/2020050815214651.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


#### 总结

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200508152811265.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



### 表关系

#### 一对一

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200508173555418.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

eg: 

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200508173555369.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

拆分: 

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200508173555335.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### 一对多



![在这里插入图片描述](https://img-blog.csdnimg.cn/2020050817564587.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


eg: 文章与评论  一文章多条评论

文章表: 

| id   | 标题  | 内容 |
| ---- | ----- | ---- |
| 1    | 文章1 | 内容 |
| 2    | 文章2 | 内容 |

评论表

| id   | 评论内容 | 文章id |
| ---- | -------- | ------ |
| 1    | 评论内容 | 1      |
| 2    | 评论内容 | 1      |
| 3    | 评论内容 | 2      |

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020050817564520.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### 多对多

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200508181151356.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



```mysql
# 老师表
create table t1 (
    id int primary key auto_increment,
    name varchar(12) not null
);
insert into t1 values (null, '张老师'),(null, '李老师'),(null, '王老师');

# 学生表
create table t2 (
    id int primary key auto_increment,
    name varchar(12) not null
);
insert into t2 values (null, '小明'),(null, '小工'),(null, '小皇');

# 中间表
create table t3 (
    id int primary key auto_increment,
    t_id int not null,
    s_id int not null
);
insert into t3 values (null,1,1),(null,1,2),(null,1,3),(null,2,3),(null,2,1),(null,3,1);
```





![在这里插入图片描述](https://img-blog.csdnimg.cn/20200508181151328.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



中间表

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200508181151394.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



#### 总结

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200508181151372.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

## 高级SQL操作

复杂的操作.

### 数据新增

#### 批量插入

```mysql
# 全字段插入
insert into 表 values (), (), ...();
```

```mysql
# 部分字段插入
insert into 表 (部分字段) values (), (), ...();
```



#### 蠕虫复制

数据迁移;

```mysql
insert into 表 ([字段列表]) select [字段列表] from 另一张表(eg: 测试数据库的数据)
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200509115551307.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

eg: 

```mysql
create table t_30 (
	id int primary key,
	name varchar(50),
	age int
); 

# 迁移
insert into t_30 (id,name,age) select * from t_1;

# 自我复制(测试用) 过滤掉主键
insert into t_30 (name,age) select name,age from t_30;

```





#### 主键冲突

```mysql
# 冲突忽略
insert ignore into 表 [(字段)] values (值列表);

# 冲突更新
insert into 表 values (值) on duplicate key update 字段 = 新值 [,字段 = 新值];

# 冲突替换
replace into 表 [(字段)] values (值);
```





![在这里插入图片描述](https://img-blog.csdnimg.cn/20200509150611464.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200509150611481.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200509150611465.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200509150611471.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

### 数据查询

#### 查询选项

简单数据筛选;

- all: 保留所有 默认all
- distinct: 去重



```mysql

# 去重 制作数据表常用
select distinct [字段](排除主键) from 表	
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200509170726387.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200509182251487.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



#### 字段别名

```mysql
select usernam as name, password as psd from 表;

# eg
select @@version as version from t_1;
```

#### 数据源

from 关键字后;

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200509182251473.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

eg:

```mysql
# 子查数据源
select * from (select * from t_1) as t;

# 字段选择 && 表别名  (处于字段过长时.)
select a.* from t_1 as a;
select b.*,a.birth_time,a.death_time from t_16 as a, t_1 as b;
```




![在这里插入图片描述](https://img-blog.csdnimg.cn/20200509182251442.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200509182513980.png)

#### where子句



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200511122615795.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

eg: 

```mysql
# and 并且
select distinct a.*,b.type from t_1 as a, t_12 as b where name = 'yewq2' and type='少年';

# or 或
select distinct a.*,b.type from t_1 as a, t_12 as b where name = 'yewq2' or type='少年';

# not 非
```



#### 运算符

1. 比较运算符
   - 大于 > , < , = , >= , <= , 不等 <>
   - between A and B :  在A~B之间 =>  区间[A,B]
   - in (数据1, 数据2...., 数据)  在列举的数据之中
   - like ‘pattern’: 匹配 
     - _ :  匹配一个任意字符
     - %:  匹配多个任意字符
2. 逻辑运算符
   - and
   - or
   - not : 非
3. null运算符
   - is null: 为空
   - is not null: 不为空

#### group by子句(分组统计)

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020051115205771.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

eg: 

```mysql
create table t22 (
	id int primary key auto_increment,
    name varchar(12) not null,
    gender enum('男', '女', '男女'),
    age tinyint unsigned,
    class_id int not null comment '班级id'
);

insert into t22 values (null, '张', '男', 18, 1), (null, '张', '男', 18, 2), (null, '张', '男', 18, 3),(null, '张', '男', 18, 4), (null, '李', '女', 18, 1),(null, '李', '女', 18, 2), (null, '李', '女', 18, 4),(null, '爱', '女', 18, 1), (null, '爱', '女', 18, 4),(null, '爱', '女', 18, 3);

# 分班级统计人数
select count(*),class_id from t22 group by class_id;

# 分班级统计人数 再分男女
select count(*),class_id, gender from t22 group by class_id, gender;

# where条件在前
select count(*) from t22 where name = '张' or name = '李' group by gender;
```





![在这里插入图片描述](https://img-blog.csdnimg.cn/2020051115205787.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/2020051115205740.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

结: 

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200511152056976.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)





#### 回溯统计

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200511162402671.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200511162349181.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

统计完一般要处理一下数据

#### 分组排序

默认升序;

- group by [字段名] asc: 升序
- group by [字段名] desc: 降序

having子句

针对分组统计后的筛选. 相当于where

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200511171359961.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200511171359982.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200511171359933.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



#### 排序 order by

- order by [字段] asc: 升序
- order by [字段] desc: 降序

注意: mysql7以后 要想子查询order by生效 .需要配合limit;

```mysql
(select * from t22 order by id desc limit 999)
```





![在这里插入图片描述](https://img-blog.csdnimg.cn/20200511172453712.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

```mysql
# 
select * from t22 order by id desc;

# 多字段排序是在第一字段排序之后, 不影响原来排序基调, 在进行小范围的排序.
select * from t22 order by gender asc, id desc;
```

#### 限制数(分页) limit

limit [起始位置,] [数量];  order by 若存在. 在其后. 

分页: limit n*( page-1), n

```mysql

# limit [数量];
select * from t22 order by gender asc, id desc limit 3;

# limit [起始位置,] [数量]; 分页: limit n*(page-1), n;
select * from t22 order by gender asc, id desc limit 3, 3; 
```

#### 总结

```mysql
# 完整语法顺序 where针对磁盘 group by之后针对内存
select [select选项] [字段名|别名|*] from [数据源|表别名] where子句 group by子句 having子句 order by子句 limit子句
```

### 数据更新

#### 限制更新

```mysql
update 表 set 字段 = 值 limit n;
```

### 数据删除(不可逆)

#### 限制删除

```mysql
delete from t22 where age = 18 limit 1;
```

#### 清空数据

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200511182511949.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

```mysql
truncate t22;
```

## MySQL 多表操作

### 联合查询

#### 查询

union; 默认去重;

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200514173606242.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200514173606349.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

```mysql

select * from t22
union
select * from t22;

# all
select * from t22 where gender = '女'
union all
select * from t22 where gender = '男';
```



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200514173606223.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### 排序



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200515111102128.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200515111102114.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



```mysql
# 针对 union 排序
select * from t22
union all
select * from t22
order by id desc;

# 单独对select的结果排序 1. () 包裹 2. 和limit 配合使用 
```

### 连接查询

join; 

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200515121403430.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### 交叉连接

没实际数据价值; 笛卡尔积;

```mysql
select * from t22 cross join t_1; #t22, t_1;
```

#### 内连接



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200515121403389.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

示例: 

```mysql
# 设计 学生表 和 专业表; 专业对学生, 1对多关系
create table t24 (
	id int primary key auto_increment,
    name varchar(12) not null,
    professional_id int comment '专业id'
);

insert into t24 values (null, 'jack', default),(null, 'nan', 2),(null, 'ana', 3),(null, 'back', 2),(null, 'huhu', 1),(null, 'zard', default);

create table t25 (
	id int primary key auto_increment,
    name varchar(12) not null
);
insert into t25 values (null, 'computer'),(null, 'art'),(null, 'building');

# 内连接 查询
select t24.*, t25.name as p_name from t24 inner join t25 on t24.professional_id = t25.id;
# 别名查询
select a.*, b.name as p_name from t24 as a inner join t25 as b on a.professional_id = b.id;
# as 可以省略 空格隔开
select a.*, b.name as p_name from t24 a inner join t25 b on a.professional_id = b.id;
```

#### 外连接

outer join; 需要全部保留主表. 从表没数据字段为null; 

- left join: 左主右从
- right join

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200515152615252.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)





![在这里插入图片描述](https://img-blog.csdnimg.cn/20200515152615273.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

```mysql
select a.*, b.name as p_name from t24 a left join t25 b on a.professional_id = b.id;
```



eg: 测试多对多表

```mysql
# 老师找学生  
select a.*,b.name from (select * from t3 where t_id = 1) as a left join t2 as b on a.s_id = b.id;

# 再拼上老师信息
select c.*,d.name as t_name from (select a.*,b.name from (select * from t3 where t_id = 1) as a left join t2 as b on a.s_id = b.id) as c left join t1 as d on c.t_id = d.id;

```





![在这里插入图片描述](https://img-blog.csdnimg.cn/20200515152615254.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



#### 自然连接

natural join; 自动寻找连接条件的查询; 相同字段;

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200515154822480.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

eg: 

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200515154822488.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



#### using关键字

using(相同字段 [, ]) ;

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200515165548788.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

### 子查询

通过select查询结果当做另一条select查询的条件或数据源; 减小复杂度;

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200519161827325.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

```mysql
# eg
select * from 学生表 where 专业id = (select 专业id from 专业表 where name = '专业名字'); 
```

#### 子查询分类



#### 标量子查询

子查询结果为, 一行一列;  当做查询条件;


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200519161827332.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



```mysql
# 查询computer专业的学生
select * from t24 where professional_id = (select id from t25 where name = 'computer');
```

#### 列子查询

一列多行; 通常为查询条件; 多个条件;  用关键字 in来判定;

```mysql
# 查询学生现在选中的热门专业 连接数量.
select * from t25 as a left join (select count(*),professional_id as p_id from t24 where professional_id is not null group by p_id) as b on a.id = b.p_id;

# 查询学生现在选中的专业 => 列子查询
select * from t25 where id in (select distinct professional_id from t24 where professional_id is not null);
```



#### 行子查询

一行多列; 多个字段组成查询条件;

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200519173336748.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)





![在这里插入图片描述](https://img-blog.csdnimg.cn/20200519173336787.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

```mysql
# 查询表t22 名字 年龄与 表t23 id=1 相同的数据
select * from t22 where (age, name) = (select age,name from t23 where id = 1);
```



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200519173336750.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



#### 表子查询

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200519175627295.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200519182000505.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200519182000461.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### exists子查询

条件一一匹配, true的保留

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200519193014995.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/2020051919301514.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


#### 比较方式

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200519193906859.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)





![在这里插入图片描述](https://img-blog.csdnimg.cn/20200519193906885.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)


#### 总结



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200519193906862.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

## MySQL安全管理

### 外键约束

#### 外键

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200520172644212.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



```mysql
[constraint 外键名] foreign key(当前字段名) references 外部表(主键字段名);

# 不指定外键名 自动生成
foreign key(当前字段名) references 外部表(主键字段名);
```



```mysql
# 专业表 (主表)
create table t26 (
	id int primary key,
    name varchar(12) not null unique
);

# 学生表 (外表)
create table t27 (
	id int primary key,
    name varchar(12) not null unique,
    c_id int comment '指向专业表的id',
    # constraint c_id foreign key(c_id) references t26(id)
    foreign key(c_id) references t26(id)
);
```



#### 约束和控制

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200520172644206.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200520173736722.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

操作约束: 

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200520173659869.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



添加更新控制和删除; 级联更新;

```mysql
create table t28 (
	id int primary key,
    name varchar(12) not null unique,
    c_id int comment '指向专业表的id',
    foreign key(c_id) references t26(id) on update cascade on delete set null
);
```



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200520173659954.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200520173659850.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200520174348686.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



#### 外键管理

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521143718898.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521143718882.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

### 事务安全

#### 概念

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521143718867.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521143718855.png)

#### 事务处理

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521143718921.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521154449646.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521154449619.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521154449623.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521154449637.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### 事务特点

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521154449669.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



### 预处理

#### 预处理

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521161346733.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521161346656.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

```mysql
# 创建预处理  sql语句若有单引号. 用双引号包裹.
prepare s22 from 'select * from t22';

# 执行
execute s22;

# 删除
deallocate prepare s22;
```





![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521161346727.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### 预处理传参

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521171054680.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521171054646.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)





### 视图

让别人看到的不是真的数据库; 虚拟表; 

#### 概念

简化复杂sql语句; 

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521174143444.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)





![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521174143432.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521174143463.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521174143480.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

```mysql
# 创建视图
create view student_info as select a.*, b.name as p_name from t24 a inner join t25 b on a.professional_id = b.id;

# 查看
select * from student_info;
```



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200521174143386.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### 视图管理

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200525152051590.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200525152051591.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



```mysql
show tables;
desc 表;

# 修改
alter view 视图名 as 新指令;
```

#### 视图数据操作

单基表可以操作; 最终操作结果是基表

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200525153813327.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200525153813270.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200525160459933.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200525160459922.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)





![在这里插入图片描述](https://img-blog.csdnimg.cn/20200525160459895.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### 视图算法

algorithm;

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200525160459928.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200525172326972.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200525172326949.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



### 数据还原与备份

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200525180325144.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



#### 表数据备份

导出加工或备份;

**my.ini配置文件在C:\ProgramData\MySQL\MySQL Server 8.0 下; my.ini需要保存成ANSI编码格式. 不然启动失败**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200526112358103.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



```mysql
select *|字段 into outfile 外部路径 
	[fields terminated by 格式 enclosed by 格式]
	[lines terminated by 格式 starting by 格式]
from 表;

# 导表 空格式
select * into outfile 'D:/t_22.csv' from t22;

# 带格式. 可以多表. 连表
 select * into outfile 'D:/t22.csv' fields terminated by '-' lines starting by '#' from t22;
 select name,gender,age,class_id into outfile 'D:/t22_copy.csv' fields terminated by '-' lines starting by '#' from t22;
```



```mysql
show variabales like '%secure%';
```



![在这里插入图片描述](https://img-blog.csdnimg.cn/2020052711151433.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/202005271115144.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### 表数据导入

加工好导入;

```mysql
# 格式是原来导出的格式. 
load data infile '路径' into table 表 
	[fields terminated by 格式 enclosed by 格式]
	[lines terminated by 格式 starting by 格式]
	[(字段列表)];

create table t22 like db_1.t22;
load data infile 'D:/t_22.csv' into table db_2.t22;

# 带格式
load data infile 'D:/t22_copy.csv' into table t23 fields terminated by '-' lines starting by '#' (name,gender,age,class_id);
load data infile 'D:/t22.csv' into table t23 fields terminated by '-' lines starting by '#';
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200527145716588.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200527145716547.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200527145716521.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### 文件备份

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200527161648355.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200527161648358.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



#### 文件还原

#### SQL备份(现在使用)

```cmd
mysqldump.exe -h -P -u -p [备份选项] 数据库 [表1 表2] > sql文件路径
```

```cmd
# 全库
mysqldump.exe -uroot -p --all-databases > D:/mysql.sql

# 单库
mysqldump -uroot -p --databases db_1 > D:/db_1.sql

# 单表 .多表
mysqldump -uroot -p db_1 t22 t23 > D:/t22_t23.sql
```



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200527180216928.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200527180216891.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200527180216853.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### SQL还原(导入)

```cmd
# 库
mysql.exe -uroot -p < D:/db_1.sql

# 表
mysql.exe -uroot -p 库名 < D:/t22_t23.sql

```

```mysql
# 表
source D:/t22_t23.sql
```



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200527183544176.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200527183544239.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### 总结



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200527183544212.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

### 用户管理

#### 账户管理

创建用户的方法

password() 加密函数已经在 8.0.11 中移除了，可以使用 MD5() 函数代替;

Host: 代表允许访问的客户端(ip或主机地址, *)  eg: ‘’ or '%'

1. 使用 CREATE USER 语句创建用户
2. 在 mysql.user 表中添加用户(不推荐)
3. 使用 GRANT 语句创建用户 (mysql 7 以前)

- 使用CREATE USER语句创建用户

```mysql
create user 用户名[user_name'@'host_name] identified by [password]  [,用户 IDENTIFIED BY PASSWORD]

# 查询用户 authentication_string加密的密码  5.7之前是 password
select User,Host,authentication_string from mysql.user;

# 普通用户
 create user 'yewq'@'%' identified by 'luojin';
 
 # 改名
 RENAME USER <旧用户> TO <新用户>
 
 # 删除用户
 drop user 'yewq'@'%';
```

##### 修改密码

```mysql
use mysql;
alter user 'yewq'@'%' identified with mysql_native_password by '123123';
```



#### 权限管理

权限赋予和回收

```mysql
# 赋予权限
grant 权限列表 on 数据库|*.表|* to 用户@主机地址;

# 回收
revoke 权限列表 on 数据库|*.表|* from 用户@主机地址;

# 刷新权限
flush privileges;

# 查看权限
show grants for 'yewq'@'%';
```

eg: 

```mysql
# db_1的所有权限
grant all privileges on db_1.* to `yewq`@`%`;

# 查看视图权限
grant select on db_1.student_info to `yewq`@`%`;

# 回收
revoke all on db_1.* from `yewq`@`%`;
revoke select on db_1.student_info from `yewq`@`%`;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200528164421160.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200528164421145.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



#### 角色管理

mysql 8 以后才有;  分配完还要激活权限;



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200528172447284.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200528172447178.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200528172447291.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200528172447272.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

	### targeting表

###  工作例子/mysql封装(node)

tareting表



```mysql
create table targeting (
    name varchar(50) not null,
    adaccount_id varchar(50) not null,
	age_min tinyint unsigned comment '年龄段',
	age_max tinyint unsigned comment '年龄段',
    genders varchar(20) comment '性别',
    targeting_optimization enum('none', 'expansion_all'),
    geo_locations text comment '地区',
    custom_audiences text comment '自定义受众',
    behaviors text comment '行为',
    interests text comment '兴趣',
    life_events text comment '生活',
    industries text comment '行业',
    family_statuses text comment '家庭情况',
    income text comment '收入',
    locales text comment '语言',
    publisher_platforms text comment '版位',
    device_platforms text comment '设备',
    user_os text comment '移动设备',
    user_device text comment '移动设备',
    wireless_carrier varchar(20) comment 'wifi',
    create_time varchar(20) comment '创建时间',
    update_time varchar(20) comment '更新时间',
  	primary key(name, adaccount_id)
)engine Innodb;
```

mysql使用

```js
var env = process.env.NODE_ENV === "production";
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: env ? "127.0.0.1" : "localhost",
  user: "yewq",
  password: "123123",
  database: "fb",
  port: 3306
});
function createConnection() {
  return mysql.createConnection({
    host: env ? "127.0.0.1" : "localhost",
    user: "yewq",
    password: "123123",
    database: "fb",
    port: 3306
  });
}

function query(sql) {
  let connection = createConnection();
  return new Promise((resolve, reject) => {
    connection.connect(err => {
      if (err) reject(err);
    });

    connection.query(sql, (error, result) => {
      if (error) reject(error);
      resolve(result);
      connection.end();
    });

  });
}
// 数据库配置
module.exports = {
  connection,
  createConnection,
  query
};
```



## MySQL进阶

### 索引使用(sql优化)

```mysql
# 创建索引 提升查询效率
create index 索引名 on 表(字段[,字段]);

# 创表的时候
create table t16(
	id int,
    name varchar(20),
    username varchar(20),
    # 普通索引
    index(name),
    primary key(id),
    # 唯一索引
    unique key(username)
)
```



#### 避免索引失效 使用规范

- (复合索引)查询时需要遵循索引最左法则 (要包括索引最左列), 并且不跳过其他列(有三个字段. 不能跳过第一个 或者第二个,直接查询第三)

```mysql
create index idx_name on t_1(name, age);

# ref
explain select * from t_1 where name = 'yewq2';

# type: index 
explain select * from t_1 where age = 19;

# 查询需要包含 name
explain select * from t_1 where name='yewq4' and  age = 19;

```

- 范围查询索引列, 若有后续索引列则失效

```mysql
create index idx_name on t23(name, class_id, gender);
# 无范围
explain select * from t23 where name='张' and class_id = 1 and gender = '男';
# 范围 gender索引失效
explain select * from t23 where name='张' and class_id > 1 and gender = '男';
```

- 不能要在索引列进行运算操作. 若有索引列失效

```mysql
# 只有name (class_id, gender)失效
explain select * from t23 where name='张' and class_id+1 = 2 and gender = '男';
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200623161420553.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

- 字符串不加引号 失效

```mysql
explain select * from t23 where name='张' and class_id = 1 and gender = '男';
explain select * from t23 where name='张' and class_id = 1 and gender = 男;
```

- 尽量覆盖索引列查询, 减少**select *** 
- 如果or查询后面不是单列索引. 这涉及的索引失效

```mysql
explain select * from t23 where gender = '男' or name='张';
```



- 模糊查询 若 '%' '_'开头 索引失效  , 若前面 有效. 使用覆盖索引列查询

```mysql
explain select * from t_1 where name like 'yewq_';

# 失效
explain select * from t_1 where name like '_ewq';
```

- 如果全表扫描更快. mysql则不走索引.  is null ,is not null的情况也是如此
- in 走索引. not in 不走
- 尽量复合索引, 减少单列索引

```mysql
# 复合索引
create index t23 on (name, age, class_id);

# 单列
create index t23 on (name);
create index t23 on (age);
create index t23 on (class_id);
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628154511439.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### 查看索引使用情况

```mysql
show status like 'Handler_read%';
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628154511509.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



### SQL优化

#### 批量插入数据

- 1. 主键顺序导入

有序数据导入耗时比无序导入要小.

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020062916165084.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

- 2. 关闭唯一性校验

```mysql
set UNIQUE_CHECKS = 0;

# 导入完成恢复
set UNIQUE_CHECKS = 1;
```

- 3. 手动提交事务

```mysql
set AUTOCOMMIT = 0;

# 结束恢复
set AUTOCOMMIT = 1;
```

#### 优化insert语句

```mysql
insert into t23 values (), (), ();
```

- 在事务中插入

```mysql
start transaction;
	insert into t23 values (), (), ();
commit;
```

- 主键顺序插入

#### order by 优化 (filesort优化)

- filesort 文件排序 效率低
- index sort 通过索引排序

适当提高 `sort_buffer_size `, `max_length_for_sort_data` 系统变量, 增大排序区的大小, 提高效率.

```mysql
show variables like 'sort_buffer_size';
show variables like 'max_length_for_sort_data';
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200629161650182.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### group by 优化

- 添加索引

#### 嵌套查询优化

 - 用join代替

   ```mysql
   # select * from t24 a join t25 b on a.professional_id = b.id;
   select * from t24 a, t25 b on a.professional_id = b.id;
   ```

   

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200629171143544.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### or条件优化

- 需要是单列索引. 复合索引失效
- 使用 union 代替

````mysql
explain select * from t24 where id = 1 or id = 10;

# 优化 union代替
explain select * from t24 where id = 1 union select * from t24 where id = 10;
````

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200629172948784.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### 优化分页查询

- 1. 先主键排序 再关联主表
- 2. 可以把Limit查询转化成某位置的查询 ( `适用于主键自增的表, 且没有断层`)

```mysql
select * from t limit 20000,10;

# 先主键排序 再关联主表
select * from t as a, (select id from t order by id limit 20000,10) as b where a.id = b.id;

# 可以把Limit查询转化成某位置的查询
select * from t where id > 20000 limit 10;

```

#### SQL提示

手动建议使用某个索引. 

- use index(索引名称): 建议
- ignore index(): 忽略某个索引
- force index(): 强制

```mysql
explain select * from t23 use index(idx_name) where name = '张';
```



### 存储过程 和函数

#### 概述

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200612141945877.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

#### 创建存储

```mysql
create procedure procedure_name([in / out / inout 参数名 参数类型])
begin
	select * from t_1
end;

# eg
delimiter $
create procedure t1()
begin
	select * from t_1;
end$
# 执行
call t1()$

# 带参数
create procedure t2(IN name VARCHAR(30))
begin
	select name;
end$

call t2('yewq')$
```

通常使用 **DELIMITER** 命令将结束命令修改为其他字符

```mysql
delimiter $

换回
delimiter ;

```

#### 查看/删除存储

```mysql
# 查询已有存储
SELECT ROUTINE_NAME FROM information_schema.Routines WHERE ROUTINE_SCHEMA=库名;

# 查看存储过程的状态
SHOW PROCEDURE STATUS LIKE 存储过程名;

show create procedure t1;

drop procedure t1;
```

#### 存储语法

##### 变量

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200612141945942.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

```mysql
# 声明
declare num int default 10;

# 赋值
set num = 20;
# sql 赋值
select count(*) into num from t_1;
```

##### if 条件判断

```mysql
if 条件 then sql语句
	[elseif 条件 then sql语句]
	[else sql语句]
end if;
```

##### 传递参数

```mysql
create procedure procedure_name([in / out / inout 参数名 参数类型,])
```

输出参数

```mysql
create procedure t3(in age int, out description varchar(10))
begin
	if 30 > age and age >= 20 then 
		set description = '青年';
	elseif age >= 30 then 
		set description = '中年';
	else 
		set description = '少年';
	end if;
end$

# 定义用户会话变量接收 @
call t3(18, @description)$
```

##### case结构

```mysql
# 1
case case_value
	when when_value then sql语句
	[when when_value then sql语句]
	[else sql语句]
end case;
# 2
case
	when 条件 then sql语句
	[when 条件 then sql语句]
	[else sql语句]
end case;
```



##### while

```mysql
while 条件 do
	sql
end while
```

##### repeat 满足条件退出循环

```mysql
repeat
	sql
	until 条件
end repeat
```

##### loop leave



```mysql
# [别名:] loop
[别名:]loop
	sql
	# 退出
	条件 leave [别名]
end loop [别名]

# eg
create procedure t4(n int) 
begin
	declare total int default 0;
	c:loop
		set total = n + total;
    	set n = n - 1;
        if n = 0 then
            leave c;
        end if;
	end loop c;
	select total;
end$

# 
call t4(10)$
```

##### 游标

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615143335809.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

```mysql
# 声明
declare 游标名 cursor for sql语句;

# 开启游标
open 游标名;

# 遍历
fetch 游标名  into ;

# 关闭
close 游标
```

eg:



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615143335796.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615143335872.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

循环遍历

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615143335838.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

##### 存储函数

```mysql
create function name([...])
returns 类型
begin
	sql...
end$
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615152314574.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

### 触发器

### 存储引擎

### 定位SQL优化

#### 查看sql执行频率

```mysql
show status like 'Com_______';

show status like 'Innodb_rows_%';
```

#### 定位慢sql

```mysql
 # 看info
 show processlist;
```

### explain分析执行计划

```mysql
explain select * from db_1.t_1;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200617161256616.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200617161256510.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/202006171713370.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200617171337856.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200617171337854.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200617174839775.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200622144335754.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70)

### show profile

开启开关;

```mysql
set profiling=1;

# 查看耗时;
show profiles;

# 详情
show profile for query query_id;
```

### trace

## 应用优化

### 使用连接池

### 减少对mysql的访问

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020090316232829.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70#pic_center)

####  避免对数据重复检索(合并请求)

#### 增加cache层

### 负载均衡

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020090316232857.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70#pic_center)

## mysql中查询缓存  (v8.03 之后删除)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200903163915245.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70#pic_center)

### 参数配置

```mysql
# 查看是否支持查询缓存
show variables like 'have_query_cache';

# 是否开启查询缓存 v5.7
show variables like 'query_cache_type';

# 查询缓存大小
show variables like 'query_cache_size';

# 缓存状态
show status like 'Qcache%';
```



## 内存管理及优化

MylSAM

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200907164254253.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200907164254211.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70#pic_center)



### InnoDB内存优化

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200907164254180.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70#pic_center)

配置修改:

- windows: ->安装 C:\ProgramData\MySQL\MySQL Server 8.0\my.ini
- linux: /etc/mysql/my.cnf

重启服务:

- windows:   cmd -> services.msc -> mysql服务重新启动
- linux: service mysql restart

## 并发参数调整



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200907165934412.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200907165934351.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NzY2Mjgz,size_16,color_FFFFFF,t_70#pic_center)

#### max_connections

#### back_log

#### table_open_cache

#### thread_cache_size

#### innodb_lock_wait_timeout







## 小知识

### mysql获取某个表的所有字段名

```mysql
select COLUMN_NAME from information_schema.COLUMNS where table_name = 'your_table_name' and table_schema = 'your_db_name';
```



### sql 值为null时在查询中设置默认值

COALESCE(Website,'no website')  AS WebSite 

```mysql
SELECT RegName,
       RegEmail,
       RegPhone,
       RegOrg,
       RegCountry,
       DateReg,
       COALESCE(Website,'no website')  AS WebSite 
FROM   RegTakePart 
WHERE  Reject IS NULL
```



# 安全问题: 防止sq注入



用户输入时需要参数验证



```javascript
// 插入
router.post("/submit", async (req, res) => {
  let body = req.body;
  let { keys, values } = Object;
  let key = keys(body).join(',');
  let [Timestamp, ...other] = values(body);
  // 转义 防止sql注入
  const sql = "insert into questionnaire (id,"+ key +") values(null,"+ mysql.escape(Timestamp) +","+ mysql.escape(other)+")"
  try {
    const result = await query(sql);
    res.json({
      status: 1,
      msg: "ok"
    });
  } catch (e) {
    res.json({
      status: 0,
      msg: e
    });
  }
});
```

# [mysql生成随机id](https://www.cnblogs.com/yanggb/p/11038138.html)

MySQL中生成随机ID的函数是UUID()，但是这样生成出来的随机ID是36位带【-】符号的。

```
SELECT UUID(); -- 37747019-90a2-11e9-9806-00505683703f
```

我们可以配合REPLACE()函数替换掉【-】符号来生成32位的不带【-】符号的随机ID。

```
SELECT REPLACE(UUID(), '-', ''); -- 62d1556390a211e9980600505683703f
```

我们也可以配合UPPER()函数将小写字母转换为大写。

```
SELECT UPPER(REPLACE(UUID(), '-', '')); -- C59ED7B190A211E9980600505683703F
```

在做数据导入的时候经常会用上。

# [mysql查树 -- WITH RECURSIVE递归查询父子集](https://blog.csdn.net/dylan95/article/details/105739504)

```mysql

create table temp.resource(
    id int unsigned primary key auto_increment,
    name varchar(50) not null,
    pid int unsigned not null comment '父id'
) charset=utf8;

insert into temp.resource values (8, "张三", 0), (9, "李四", 0), (10, "张三儿子", 8), (11, "张三孙子", 10), (12, "李四女儿", 9);
insert into temp.resource values (13, "张三孙女", 10);
```

【MySql 8】WITH RECURSIVE递归查询父子集


引入
```mysql
计算1到100的累加的结果。
WITH RECURSIVE t(n) AS ( //t为我们结果表，n为字段，可以只指定表明不指定字段
    VALUES (1) //递归的开始，此时可理解为t表字段n只有一条记录 1
  UNION ALL
    SELECT n+1 FROM t WHERE n < 100      
    /*这里产生的结果为 2  ，此时t表的字段n有两条记录分别为1，2
    *				  3
    *                 ...
    *                 100
    */													   
)
SELECT sum(n) FROM t; //对字段n求和
```

父求子  

**仅当temp第一条记录匹配不到resource表中的pid时才会对temp的第二条记录id进行匹配**
```
WITH RECURSIVE temp AS ( // 将结果表命名为temp
	SELECT * FROM resource r WHERE r.name ='张三'  //查询出父id这条记录，此时这条记录已存在temp表中 ，如图1-1
	UNION ALL
	/*这时要注意，下面这条sql是获取的期望结果中的后两条记录(不包含第一条)
	*注意where后的条件，我们使用temp表中的唯一一条记录的id关联resource表中的pid
	*仅当temp第一条记录匹配不到resource表中的pid时才会对temp的第二条记录id进行匹配
	*/
	SELECT r.* FROM resource r,temp t WHERE t.id = r.pid
)select * from temp;


WITH RECURSIVE temp AS (
	SELECT * FROM resource r WHERE r.name ='张三' 
	UNION ALL
	SELECT r.* FROM resource r,temp t WHERE t.id = r.pid
)select * from temp;
```

子求父

```
with recursive temp as (
    select * from resource r where r.name = '李四'
    union all
    select r.* from resource r,temp t where t.pid = r.id
)select * from temp;
```



# mysql中文乱码

使用 utf8字符集

> charset=utf8

https://blog.csdn.net/u012410733/article/details/61619656

# mysql 练习


https://github.com/bladeXue/sql50