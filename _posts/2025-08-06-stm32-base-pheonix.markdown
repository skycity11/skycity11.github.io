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


## 画饼阶段
> start at 2025/8/6

（不要问我为什么拖了这么久）

> update at 2025/8/6

### 想法来源

由于最近沉迷《逆转裁判》123系列，又称逆转裁判成步堂传，由于NS上游玩无法切换日语配音，导致其经典台词「異議あり！」只能用中文「异议！」呈现，对此耿耿于怀，又刷到[视频](https://www.bilibili.com/video/BV19pGvzqETu/?spm_id_from=333.1391.0.0&vd_source=82e7af664af41b55402c040af5862bde)有up自己DIY了一款实体版「異議あり！」的小型播放器，支持手势操作和播放bgm功能，非常中二，又想到自己专业，总该干点"老本行"了，遂开始有自己制作播放器的想法。

### 最终目标
能做出来一个能同时播放游戏的语音及bgm、支持手势操作切换歌曲、支持USB烧录歌曲、能通过按键调节音量、能离线使用&能充电、有外壳的音乐播放器即可，功能实现为主，大小、功耗、外观不追求太多。

### 拆分功能
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


### 计划步骤
1. 先用现成的（"这不是现成的？"）核心板+面包板+功能芯片分步实现核心功能
   1. 熟悉核心板相关
      1. 购买[STM32最小系统板+面包板硬件平台](https://item.taobao.com/item.htm?ak=27696150&ali_trackid=2%3Amm_2038330052_2851900351_114774900234%3A1754491472028_189881609_0&bxsign=tbkj4UizbkIFcsC-D8vNM3N4MusMQIMS2NgfROIovyxjPIVeegZP8-JDXnAIQ9N0GkbEW5EfnWOyu5q9VHxazJTKKfPrKJLpLftDQ9jX2wRVGk4FE04KUv2HWxuNCZo9vkpnjjleQ6Luy2Jw6SxfbWF3YyQD5qsChRcr3UU0jjE-BnaPsCEYERUIx4FwScGjW7z&id=655451342180&union_lens=lensId%3ATAPI%401701262245%40212c1916_0f45_18c1b21c002_8f11%4001%3Brecoveryid%3A189881609_0%401754491472032)，内容包括：
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
   4. 用USB模块实现调试、连接电脑烧录音频音频功能
   5. 用电池模块实现设备离线、充电功能
2. 画原理图、PCB实现以STM32、MPU6050、语音芯片为主体的硬件电路，投稿嘉立创
3. 实现外壳设计




















—————————————————————————————————————

Ongoing

—————————————————————————————————————

[首页](https://blog.skycity11.xyz)