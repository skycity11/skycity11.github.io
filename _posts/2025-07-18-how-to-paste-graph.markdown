---
layout:       post
title:        "使用MD写网页文章的贴图方法"
author:       "Eric"
header-style: text
hidden:       false
catalog:      true
category:     technique
tags:
    - markdown
    - 博客
    - 个人网站
    - 粘贴图片
    - 技巧
---
总结了一些使用MD写网页文章的贴图方法，解决贴图麻烦的问题

—————————————————————————————————————


## 方法1：引用绝对路径图片

将名为"filename"的JPG格式图片存放在img路径下，然后用这种引用方式：
```markdown
![](/img/filename.jpg)
```

*注：该方法虽稳定但较为繁琐，需先粘贴图片，再填路径*
—————————————————————————————————————

## 方法2：通过vscode + markdown image插件贴图

（个人理解）原理是通过插件中的**jsdelivr**服务，将图片传到github上指定仓的jsdelivr镜像仓，获取该图片的镜像仓链接，也就是`https://cdn.jsdelivr.net`开头的链接。取决于该服务器的稳定性。个人目前使用还算稳定。


#### 1. github中的设置

1. 在github中**新建一个仓库**，如picture，之后该目录的https地址将会用到，如`https://github.com/username/picture`  
2. 在github中**获取个人访问令牌**，从而vscode中的插件获得访问picture库的权限
      1) 进入github，点击右上角头像进入settings，左边栏拉到最下找到Developer settings
      ![图 3](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/b1ea5b8107a746a50438f1fe527827fad7039aa40c31cb7ef8a9264fc316c2b3.png)  
      ![图 4](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/d34c0bb254c3ccb986f4f3402afed09cf6e34bd71e52f6eca7ac8ce879e161ca.png)
      2) 选择Fine-grained tokens，选择右上角Generate new tokens
      ![图 5](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/7ae41e7cf61b37813dcada6c27d13b38b8fcceac88cf4fbf48176c10d35ebfa7.png)
      ![图 6](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/34982037a206d435f197a121cf40674f97e6381b37084828f595bbfc9476ad80.png)  
      3) Token name任取，Expiration选择custom，最高可达一年
      ![图 7](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/03808cbdc18b6b3d0b5aab4b13ea4d8c571cb01536378ebb89d1f8365e875154.png)  
      4) Repository access选择刚刚建好的仓库
      ![图 8](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/e49f078b61f4b9701c38530f573c968a1136d083764973179fe09f8b8a1416ec.png)  
      5) Permissions中点开Account permissions，只需选择Contents Read and write
      ![图 9](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/84cc60d7dc82ff14eaa01ec40282641dd986303dfad72eafaf06666c21a824ea.png) 
      6) Generate token之后，需妥善保存 

#### 2. vscode中的设置

1. 接下来，使用vscode编辑器，安装**Markdown Image**插件  
![图 0](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/07319afbc7e7c4c6a7532298750e914a01f5452116c27608e2f96712e570841a.png)  

2. 进入插件设置，选择GitHub作为上传图片的方式，然后点击设置项目  
![图 1](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/bc0b9fa62a4bc16dd306b772637933b91e55c7746a875215795743aa5654ae5b.png) 

3. 需要填的内容为这4项，第二项填入之前保存的token，第三项填入新建的github仓库，第一项是为保存的图片新建仓库的一级目录  
![图 11](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/6da92424fb47ff2ff0a34ce0b32f209a69300acae1353f139362b4c8c9c5c52f.png)  

4. 之后就可以通过右键粘贴图片，或者快捷键`Shift+Alt+V`粘贴图片链接，如  
![图 10](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/1add83bb73a1946b6473d5d0c8e7d08836b1310406bf74bbaf092ccfc76639b0.png)  

*注：很偶尔会出现上传不成功，导致粘贴不了的问题，可能是服务器卡了，过一会儿再试即可*

—————————————————————————————————————  
The end  
—————————————————————————————————————

[首页](https://blog.skycity11.xyz)