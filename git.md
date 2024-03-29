## 常用命令
![git](./img/git.png)
```js
git log
git reflog //查看所有log

git status

git fetch + git merge = git pull

git reset --hard head^ //回退到上一次提交的代码
```

## 协作开发如何更新代码

### 方法1：如果你想保留刚才本地修改的代码，并把git服务器上的代码pull到本地（本地刚才修改的代码将会被暂时封存起来）
```js
// 备份当前的工作区的内容，从最近的一次提交中读取相关内容，让工作区保证和上次提交的内容一致。同时，将当前的工作区内容保存到Git栈中。 
git stash  
git pull origin master  
// 从Git栈中读取最近一次保存的内容，恢复工作区的相关内容。由于可能存在多个Stash的内容，所以用栈来管理，pop会从最近的一个stash中读取内容并恢复。
git stash pop  
```

如此一来，服务器上的代码更新到了本地，而且你本地修改的代码也没有被覆盖，之后使用add，commit，push 命令即可更新本地代码到服务器了。

### 方法2、如果你想完全地覆盖本地的代码，只保留服务器端代码，则直接回退到上一个版本，再进行pull：
```js
git reset --hard  
git pull origin master  
```

## 本地代码暂不提交
- `stash`变更状态的缓存，不可推送到远程仓库
- `commit`提交，可推送到远程仓库
```js
git stash // git stash --help查看其对应具体命令
...
git stash apply
```