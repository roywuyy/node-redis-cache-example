# 在windows上 Node.js和koa-v2使用redis demo

## redis安装，下载和使用
### 下载 redis 和使用 Windows下Redis安装配置和使用注意事项: [转自](https://www.cnblogs.com/LMJBlogs/p/11550170.html)



### [redis下载地址](https://github.com/microsoftarchive/redis/releases) 3.2.100为例

- 解压并通过cmd指定到该redis目录。
- 使用命令：redis-server.exe redis.windows.conf 启动服务
 - 若启动redis出现 [****] *****(当前日期)****** # Creating Server TCP listening socket *:6379: listen: Unknown error 更改redis文件夹中的 redis.windows.conf #bind 127.0.0.1    去掉#
 - 若仍报以下错误：# Creating Server TCP listening socket 127.0.0.1:6379: bind: No error  按顺序输入如下命令就可以连接成功
	  - 1. redis-cli.exe
	    2. shutdown
	    3. exit
	    4. redis-server.exe redis.windows.conf
  
### 安装Redis为windows服务：

- 上面虽然启动了redis服务，但是，只要一关闭cmd窗口，redis服务就关闭了。所以，把redis设置为一个windows服务。
- 安装命令: redis-server.exe --service-install redis.windows-service.conf  使用命令，安装成功

#### 常用的Redis服务命令：

- 卸载服务：redis-server.exe --service-uninstall

- 开启服务：redis-server.exe --service-start

- 停止服务：redis-server.exe --service-stop

- 重命名服务：redis-server.exe --service-name name

### 测试 

- 打开解压文件夹下的：redis-cli.exe

- 使用get "key" (set,del)进行写入，读取和删除操作

### 配置密码登录和远程链接
- 打开服务中Redis,右键，找到红色框内redis.windows-service.conf文件

- 找到# requirepass foobared后在下方直接写入requirepass 你的密码

- 修改配置文件后，一定要重启Redis服务，

- 重启后，再次打开redis-cli.exe文件，进行测试写入，获取和删除操作，

- 通过命令auth 密码 来进行登录


## 启动
### 初始化 package.json
- npm init -y
### 安装依赖
- npm i --save koa koa-router node-fetch redis
### 安装开发依赖
- npm i -D nodemon
- 在package.json文件中，创建一个如下所示的新脚本。 
- "start": "nodemon index.js"

### 运行
- 确保redis服务启动着
- 运行npm run start 
- 输入http://localhost:3000/repos/:username :username为github上的一个用户的名字

## License
MIT