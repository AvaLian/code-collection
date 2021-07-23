<!-- TOC -->

- [1. Linux服务器nginx的安装](#1-linux服务器nginx的安装)
    - [1.1. 下载](#11-下载)
    - [1.2. 开始安装Nginx](#12-开始安装nginx)
    - [1.3. 启动nginx](#13-启动nginx)
    - [1.4. ssl证书配置（https配置）](#14-ssl证书配置https配置)
- [2. nginx常用命令](#2-nginx常用命令)
- [3. nginx更换http证书不生效，页面102](#3-nginx更换http证书不生效页面102)
- [4. Linux服务器根目录下面多个二级项目文件，则可配置域名指向项目根目录](#4-linux服务器根目录下面多个二级项目文件则可配置域名指向项目根目录)
- [5. vue history模式下服务器配置](#5-vue-history模式下服务器配置)
    - [5.1. 此种配置直接使用的根域名，没有其他的二级路径，因此root直接指向目标文件夹，即包含index.html的文件夹路径](#51-此种配置直接使用的根域名没有其他的二级路径因此root直接指向目标文件夹即包含indexhtml的文件夹路径)
    - [5.2. 同一域名下的多个项目，用二级路径来区别，不过root不再指向项目文件夹而是它的上一级](#52-同一域名下的多个项目用二级路径来区别不过root不再指向项目文件夹而是它的上一级)
    - [5.3. http是80端口，https是443端口](#53-http是80端口https是443端口)
- [6. nginx配置不缓存html](#6-nginx配置不缓存html)

<!-- /TOC -->

## 1. Linux服务器nginx的安装
### 1.1. 下载	
    1. 首先去官网下载Nginx的tar包(下载稳定版),如nginx-1.20.0.tar.gz
    2. 下载完成之后，把它上传到服务器上，如/usr/local目录
### 1.2. 开始安装Nginx
    1. 进入到/usr/local  使用命令 `tar -zxvf nginx-1.20.0.tar.gz`  进行解压nginx， 
    2. 解压后进入到nginx文件夹内   cd nginx-1.20.0
        ```js
        1. GCC——GNU编译器集合：yum install gcc-c++ 
        2. PCRE库：yum install -y pcre pcre-devel
        3. zlib库:yum install -y zlib zlib-devel
        4. OpenSSL库:yum install -y openssl openssl-devel
        ```
    3. 接下来命令: `./configure --prefix=/usr/local/nginx-1.20.0 `   意思是告诉等会安装的文件要放在哪里。(也可以不设置,直接 ./configure)
    4. 通过2步骤，你会看到文件夹多了Makefile这个文件
    5. 接下来通过命令 make 编译, 如果上述方法还是显示make失败 那么采取如下方式更新`yum：yum update`，更新完成后，先删除之前准备make的nginx包，然后重新解压一个
    6. 使用命令 `make install` 安装
    7. 进入到sbin目录 然后`./nginx`启动   nginx默认是80端口 如果你想修改端口就进入到conf目录下找到nginx.conf修改
### 1.3. 启动nginx
	1. 进入到nginx的sbin目录  命令./nginx启动
	2. 最后，可以在服务器上命令输入：http://ip:port/ 服务器地址+nginx端口号，访问页面
### 1.4. ssl证书配置（https配置）
   1. 进入到你的解压缩后的nginx目录, 输入： `./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module`
   2. 接下来执行
       ```
       make
		#切记不要执行make install，否则会重新安装nginx
       ```
    3. 上述操作执行完成以后，你的目录下会出现objs文件夹，文件夹内存在nginx文件,接下来使用新的nginx文件替换掉之前安装目录sbin下的nginx，注意这里的替换的时候可以先将之前的文件备份下，停掉nginx服务
        ```js
        ./nginx -s stop #停止nginx服务

            #替换之前的nginx
            cp /root/nginx/objs/nginx /usr/local/nginx/sbin

            # 成功之后，进入到nginx安装目录下，查看ssl时候成功

            #注意这里是大写的V，小写的只显示版本号
            ./nginx -V  
            #可以看到这里出现了configure arguments: --with-http_ssl_module   证明已经安装成功

            # 提示：这里替换后在执行 -V命令如果提示权限不足，先给这个nginx文件提升下权限
        ```
    4. 解压缩下载好的证书,将下载好的证书上上传到服务器





## 2. nginx常用命令

1. 查看安装目录： ` rpm -ql nginx`
2. 查看nginx版本： ` nginx -v`
2. 查看编译参数： ` nginx -V`
4. 启动nginx,进入sbin目录（cd /usr/local/nginx/sbin): ./nginx
5. 重启nginx: 进入sbin目录, 执行 ./nginx -s reload
5. 停止nginx: 进入sbin目录, 执行 ./nginx -s stop
7. `underscores_in_headers on;` #该属性默认为off，表示如果header name中包含下划线，则忽略掉。
8. 查看443接口是否开启：`netstat -anop|grep 443`


## 3. nginx更换http证书不生效，页面102

拷贝新的证书到服务器，修改nginx.conf中关于htpps证书的配置，重启nginx后，发现页面不能正常访问，多方排查问题后，发现是没有关掉所有进程的问题。

按以下步骤kill掉所有进程后启动nginx，页面即可正常访问。

1. 进入`nginx`文件夹：`cd /usr/local/nginx`
2. 查看现有nginx进程:`ps -ef|grep nginx`
```
[root@ecs-c962-9810 nginx]# ps -ef|grep nginx
root     15878     1  0 16:55 ?        00:00:00 nginx: master process nginx
nginx    15888 15878  0 16:55 ?        00:00:00 nginx: worker process
nginx    15889 15878  0 16:55 ?        00:00:00 nginx: worker process
nginx    15890 15878  0 16:55 ?        00:00:00 nginx: worker process
nginx    15891 15878  0 16:55 ?        00:00:00 nginx: worker process
root     15926 15125  0 16:56 pts/0    00:00:00 grep --color=auto nginx
[root@ecs-c962-9810 nginx]# kill -9 15878 15888 15889 15890 15891
```
3. kill掉所有进程,如：`kill -9 15878 15888 15889 15890 15891`
4. 启动nginx: `./sbin/nginx`

```
```


## 4. Linux服务器根目录下面多个二级项目文件，则可配置域名指向项目根目录

如服务器opt目录下面有`a`、`b`文件夹，分别放置不同的vue打包项目文件，按如下配置则可访问
`http://域名地址/a/`，` http://域名地址/b/`
```js

location / {
   root /opt;
    try_files $uri $uri/ @router;
    index  index.html index.htm;
}
```
```js
// 或者给每个项目都配置1个Nginx转发
location /a {
    alias /opt/a;
    try_files $uri $uri/ /a/index.html;
    index  index.html index.htm;
}
location /b {
    alias /opt/b;
    try_files $uri $uri/ /b/index.html;
    index  index.html index.htm;
}
```

配置根目录跳转到那个路径
```js
location / {
    root /opt/phone;
    try_files $uri $uri/ @router;
    index  index.html index.htm;
}
```

`root` 和 `alias`的区别：
- 使用root，实际的路径就是：`root值 + location值`。
- 使用alias，实际的路径就是：`alias值`。
    - alias在使用正则匹配时，必须捕捉要匹配的内容，并在指定的内容处使用。
    - alias只能位于location块中，root可以不放在location中。

例如，
有一张图片，URL是：`www.awaimai.com/static/a.jpg`

它在服务器的路径是：`/var/www/app/static/a.jpg`
```js
// 那么用root的配置是：
location /static/ {
    root /var/www/app/;
}
// 用alias的配置就是：
location /static/ {
    alias /var/www/app/static/;
}
// 对于alias，location值可以随便取，例如：
location /hello/ {
    alias /var/www/app/static/;
}
```
这样，我们访问图片的地址就是：`www.awaimai.com/hello/a.jpg`




## 5. vue history模式下服务器配置

### 5.1. 此种配置直接使用的根域名，没有其他的二级路径，因此root直接指向目标文件夹，即包含index.html的文件夹路径
```js
server {
　　listen 80;
　　listen 443 ssl;
　　server_name manager-qa.xxx.com;
　　ssl_certificate /etc/nginx/ssl/2319844__xxx.com.pem;
　　ssl_certificate_key /etc/nginx/ssl/2319844__xxx.com.key;
　　root /usr/share/nginx/;
　　#从系统时间中正则匹配出年月日
　　if ($time_iso8601 ~ "^(\d{4})-(\d{2})-(\d{2})") {
　　　　set $date $1$2$3;
　　}

　　# 日期记录日志
　　access_log /var/log/nginx/$date-manager-qa.xxx.com.access.log;

　　location / {
　　　　root /usr/share/nginx/manager/qa/dist/;
　　　　try_files $uri $uri/ /index.html;
　　　　index index.html;
　　　　add_header Access-Control-Allow-Origin *;
　　}
}
```


### 5.2. 同一域名下的多个项目，用二级路径来区别，不过root不再指向项目文件夹而是它的上一级

打包后的项目放在二级路径`/course`下面， `course`在资源管理器`/usr/share/nginx/qa/`下面

```js
location /course {
　　　　try_files $uri $uri/ /course/index.html;
　　　　root /usr/share/nginx/qa/;
　　　　index index.html;
　　}
```

### 5.3. http是80端口，https是443端口

## 6. nginx配置不缓存html

浏览器或者系统访问网页都会有自己的一套缓存机制，这就可能会导致前端代码已经更新了，但是用户还是访问了之前的缓存。

下面介绍下用nginx处理这个问题的方法，这里配置html和htm文件不缓存,js,css等文件没有做处理，是因为我们前端编译发布代码时，如果某个js或css有更新，会自动在文件名上加时间戳、哈希值，这样一发新版时，只要客户端请求了新版的html，就会自动找到新的js、css，没有更新的js、css还会继续用缓存，这样既不会太大的影响网页的访问速度，也能保证更新的代码不走缓存。

```js
server {
        listen       80;
        server_name  test.exmaple.cn;
 
 
        location / {
                if ($request_filename ~* .*\.(?:htm|html)$)  ## 配置页面不缓存html和htm结尾的文件
                {
                   add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
                }
                root /web/;
                index index.html;
                try_files $uri $uri/ /index.html =404;
        }
}
```
暴力禁止所有静态资源缓存

```js
location ~.*\.(js|css|html|png|jpg)$
{
   add_header Cache-Control no-cache;
}  
```