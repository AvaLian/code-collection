## npm命令
```js
//  初始化npm包，生成package.json文件
npm init
// 查看npm的版本号
npm -v
// 查看npm源
npm config get registry

// 切换镜像源
npm config set 镜像名  镜像地址
// 查看各个镜像地址可以先下载nrm模块
npm i nrm
// 查看各个镜像对应的url
nrm ls

// 注册
npm adduser
// 登录
npm login
// 查看当前用户
npm whoami
// 发布
npm public
// 列出所有环境变量
npm run env
// 在全局npm modules文件夹中创建一个指向测试包的符号链接
npm link
// 列出所有已安装的包
npm ls
```
## npm 安装
```js
// 1.全局安装
npm install -g module_name
  // OR 
yarn global add module_name 

// 2. 局部安装
npm install module_name -D(--save-dev)
npm install module_name -S(--save)
// # OR 
yarn add module_name -D(--save-dev)(写入dependenciesdev)
yarn add module_name -S(--save)(写入dependencies )

// devDependencies 里面的插件只用于开发环境，不用于生产环境
// dependencies 是需要发布到生产环境的。
```

## 常用npm包记录