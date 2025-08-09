---
layout:       post
title:        "手记-DIY-異議あり！-陀螺仪-音频播放器"
author:       "Eric"
header-style: text
hidden:       false
catalog:      true
category:     technique
tags:
    - DIY
    - STM32
    - 音乐播放器
    - MPU6050
    - 手记

---
记录制作"異議あり！-陀螺仪-音频播放器"的过程

## 空想阶段

> start at 2025/5/12

### 想法来源

由于最近沉迷《逆转裁判》123系列（又称逆转裁判成步堂传），经常幻想自己在法庭上学成步堂拿手指人并大喊「異議あり！」

![图 1](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/085166ff8e2a9773e93c2b4c5b9932e292a705d061db87ac26c8cc2266c6c6cf.png)

加上由于NS上游玩无法切换日语配音，导致其经典台词「異議あり！」只能用中文「异议！」呈现，对此耿耿于怀。又无聊时刷到[b站视频](https://www.bilibili.com/video/BV19pGvzqETu/?spm_id_from=333.1391.0.0&vd_source=82e7af664af41b55402c040af5862bde)有up自己DIY了一款实体版「異議あり！」的小型播放器，支持手势操作和播放bgm功能，非常中二，又想起了自己的专业，总该干点老本行了，遂有了自己制作这个播放器的想法。

![图 0](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/370ddbc3b3145fd444a92a14593d6ce6b6098aa05070c34e1dd121b32d2f884d.png)  

## 画饼阶段

> start at 2025/8/6

（不要问我为什么拖了这么久）

### 1 目标指定

能做出来一个能同时播放游戏的语音及bgm、支持手势操作切换歌曲、支持USB烧录歌曲、能通过按键调节音量、能离线使用&能充电、有外壳的音乐播放器即可，功能实现为主，大小、功耗、外观不追求太多。

### 2 功能划分

1. 电路方面
   1. 主控芯片，应该没啥门槛，能使就行
      1. 采用STM32F103C8T6（暂定）
   2. 陀螺仪芯片，用来实现手势操作，通过X轴/Y轴位移手势指令，输入单片机识别，支持I2C控制
      1. 采用MPU6050（V老师推荐准没错）
   3. 语音芯片,功能包括语音编码、解码、存储、播放和识别，支持串口控制
      1. 采用[CH7003](https://www.ch2003.com/search.jsp?id=468&q=ch7003&fromTopShoppingCart=false)（网上随便找的），抄一下datasheet
         1. 带4MB内存
         2. PWM音频输出，内置0.5W功放，可直接推动8Ω/0.5W喇叭
         3. 支持DAC输出，外界功放
         4. 支持外挂SPI flash，最大128Mbit
         5. 支持USB连接电脑拷贝音频，PC虚拟内置存储介质的U盘功能
         6. 30级音量自由设定
   4. DAC及功放模块
      1. 视情况而定，先用语音芯片内置功放试试效果，不行再加喇叭
   5. 存储flash模块
      1. 视情况而定，先看看语音芯片内部够用不，不够再加SPI flash
   6. 蓄电池以及充电模块
      1. 没想好具体咋做
   7. USB typec电路，实现调试、连接电脑烧录音频音频、充电
      1. 没想好具体咋做
2. 外壳方面
   1. 3D打印外壳，具体设计待定，先把电路功能做好再去求教Q老师


### 3 计划步骤
1. 先用现成的（"这不是现成的？"）核心板+面包板+功能芯片分步实现核心功能
   1. 熟悉核心板相关
      1. 购买[STM32最小系统板+面包板硬件平台](https://item.taobao.com/item.htm?ak=27696150&ali_trackid=2%3Amm_2038330052_2851900351_114774900234%3A1754491472028_189881609_0&bxsign=tbkj4UizbkIFcsC-D8vNM3N4MusMQIMS2NgfROIovyxjPIVeegZP8-JDXnAIQ9N0GkbEW5EfnWOyu5q9VHxazJTKKfPrKJLpLftDQ9jX2wRVGk4FE04KUv2HWxuNCZo9vkpnjjleQ6Luy2Jw6SxfbWF3YyQD5qsChRcr3UU0jjE-BnaPsCEYERUIx4FwScGjW7z&id=655451342180&union_lens=lensId%3ATAPI%401701262245%40212c1916_0f45_18c1b21c002_8f11%4001%3Brecoveryid%3A189881609_0%401754491472032)，套件内容包括：
         1. STM32F103C8T6最小系统板（支持直插面包板）
         2. 面包板以及各种线
         3. OLED显示屏
         4. MPU6050陀螺仪模块
         5. 以及一些暂时看上去用不到的东西
      2. 根据[套件配套视频](https://www.bilibili.com/video/BV1th411z7sn?spm_id_from=333.788.videopod.episodes&vd_source=82e7af664af41b55402c040af5862bde)捡回尘封的记忆
   2. 用STM32+MPU6050实现手势操作识别功能
      1. 核心板套件自带MPU6050套件
      2. [参考视频](https://www.bilibili.com/video/BV12o5vzwEPp?spm_id_from=333.788.videopod.episodes&vd_source=82e7af664af41b55402c040af5862bde&p=2)工程代码，实现MPU6050初始化配置
      3. 实现X轴/Y轴位移手势指令识别
   3. 用STM32+语音芯片实现音频播放、切换、控制功能
      1. [参考视频](https://www.bilibili.com/video/BV1hsbAesE6F/?spm_id_from=333.337.search-card.all.click&vd_source=82e7af664af41b55402c040af5862bde)
   4. 用USB模块实现调试、连接电脑烧录音频音频功能
   5. 用电池模块实现设备离线、充电功能
2. 画原理图、PCB实现以STM32、MPU6050、语音芯片为主体的硬件电路，投稿嘉立创获得板板
3. 实现外壳设计

> update at 2025/8/6

### 4 实际开干

#### 4.1 MPU6050学习

##### 4.1.1 原理

* MPU6050是一个6轴姿态传感器，可以测量芯片自身X、Y、Z轴的加速度、角速度参数，通过数据融合，可进一步得到姿态角，常应用于平衡车、飞行器等需要检测自身姿态的场景
  
![图 2](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/ef4adfc59dfa2f44c53df58f0485b1af2f3f40e8090499c0e2b805489989a2ad.png)  

* 3轴加速度计（Accelerometer）：测量X、Y、Z轴的加速度
  * 实际上是一个测力计
  * 可以理解为坐在车里，车子突然往前开，椅背感觉到力
  * 静态稳定，动态不稳定

![图 3](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/3aa78a54bd67128e62a8a0a5b4245b3cf0b48fe304fa23a3ddc10a18812cdb5f.png)  

* 3轴陀螺仪传感器（Gyroscope）：测量X、Y、Z轴的角速度
  * 静态不稳定，动态稳定
  * 可以理解为游乐场甩椅子，甩起来以后测两个椅子间的距离从而获得角速度

![图 4](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/aa4b62b76a22fc4ec8a7f57a7a943b2b738c952fd524b49aa05e1557ffd32cf1.png)  


##### 4.1.2 参数

* 16位ADC采集传感器的模拟信号，量化范围：-32768~32767
* 加速度计满量程选择：±2、±4、±8、±16（g）
  * 如选择为±2，那么32767对应的就是2g加速度
  * 量程越小，测量就会更细腻
* 陀螺仪满量程选择： ±250、±500、±1000、±2000（°/sec）
  * 运动剧烈，就把量程调高，避免加速度/角速度超出量程
* 可配置的数字低通滤波器
  * 如果抖动太厉害，就开启，可以让数据平缓一点
* 可配置的时钟源，可配置的采样分频
  * 控制AD采样的快慢 
* I2C从机地址：1101000（AD0=0）；1101001（AD0=1）
  * 由于I2C读写位的存在，所以0x68(1101000)会左移一位在加上读写位，也就变成了0xD0（读），0xD1（写）
         
![图 5](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/070df6919e69e1fb112d2bee6fbbf35d650bb1fc2d200b5b68c7fb868cc0a1d9.png)  

 
##### 4.1.3 电路

![图 6](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/807cd05ee9ec4f4a6002b445c7d5b483025b2c3a693f82a0741bd08f3a2a5520.png) 


| 引脚 | 功能                |
| :--:|:--------: |
| XCL、XDA | 主机I2C通信引脚 | 
| AD0 | 从机地址最低位       |
| INT | 中断信号输出 |

* SCL、SDA已经接如上拉电阻
* XCL、XDA
  * 通常用于外接磁力计或磁力计，MPU6050通过I2C主动访问这些芯片，经过内部DMP进行数据融合和姿态解算
  * 用于扩展功能，比如引入绕z轴角度（偏航角）（类似于指南针），或者无人机定高时，需要加气压计扩展为10轴，提供一个高度信息的稳定参考
* AD0 已接入下拉电阻，默认为0
* LDO 左上角，扩展5V供电

##### 4.1.3 内部框图

![图 7](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/709076e96a5622fc680d9662a55bc0f2776f5ae3b65e6abb95ca84fa4de168db.png) 

* Self test
  * 功能：自测模块，启动自测后，芯片内部会模拟一个外力施加在传感器上，导致传感器数据比平时大一些
  * 使用：先开自测，再关自测，把两者数据相减得到自测响应，查阅手册，如果在范围内就没坏 















—————————————————————————————————————

Ongoing

—————————————————————————————————————

[首页](https://blog.skycity11.xyz)