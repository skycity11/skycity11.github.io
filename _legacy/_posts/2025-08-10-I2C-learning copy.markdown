---
layout:       post
title:        "I2C学习随手记录"
author:       "Eric"
header-style: text
hidden:       false
catalog:      true
category:     technique
tags:
    - I2C
    - 手记

---
I2C回顾性学习，只记要点

## 1 原理分析
1. I2C（Inter IC Bus）是由Philips公司开发的一种通用数据总线
2. 两根通信线：SCL（Serial Clock串行时钟线）、SDA（Serial Data串行数据线）
3. SCL和SDA均要配置开漏输出模式
   1. SDA配置为开漏输出目的：因为SDA半双工，主从机都可以输出，为了防止主从对SDA线输出不同电平，导致避免短路，所以采取禁止所有设备输出强上拉的高电平（对单片机来说是推挽模式），采用外置若上拉电阻加开漏输出的电路结构
      1. 强上拉：PMOS/NMOS或者开关连接VCC/GND
      2. 弱上拉：用电阻连接至VCC/GND
      3. 开漏模式+弱上拉情况下，只有每个设备都输出高电平，才是高电平，但凡有一个设备输出低电平，就是低电平
   2. SCL配置为开漏输出目的：出于多主机模式下时钟同步和总线仲裁考虑
4. SCL和SDA各添加一个上拉电阻，阻值一般为4.7KΩ左右
5. 
![图 0](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/31c264aa21a1b82083fa492daf8ff12959e8f4c1e56e9eca53ad85a20307a7a2.png)  

![图 1](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/ed774236912735eb7804ee1cb98a1b2f46854510a94b4612d230ff1aa914ddca.png)  

## 2 STM32软件I2C

### 2.1 时序逻辑

开始/结束：SCL高电平期间，变换SDA
接受/发送数据：SCL低电平时，放置SDA，SCL高电平时读走

### 2.1 时序基本单元

* 起始条件：SCL高电平期间，SDA下降沿

![图 3](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/201547c3e925793adc35bc079b23b3c09387e9cd15f6bd1b08cb377ab47c7755.png)  

* 终止条件：SCL高电平期间，SDA上升沿

![图 4](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/d551a4ba6c50f137937a3ce800aeb9badfc64150a6b818ef545339e5c9c1a118.png)  

* 发送一个字节：SCL低电平期间，主机将数据位依次放到SDA线上（高位先行），然后释放SCL，从机将在SCL上升沿时读取数据位，所以SCL高电平期间SDA不允许有数据变化，依次循环上述过程8次，即可发送一个字节
  * 简单概括：SCL低电平主机放数据，高电平从机读数据

![图 5](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/988a805e5dcf45e03d741a8cbb335af051a204a1a5a5cbe8ebfaa66d77ab0983.png)  

* 接收一个字节：SCL低电平期间（实为下降沿时），从机将数据位依次放到SDA线上（高位先行），然后释放SCL，主机将在SCL高电平期间读取数据位，所以SCL高电平期间SDA不允许有数据变化，依次循环上述过程8次，即可接收一个字节（主机在接收之前，需要释放SDA）
  * 简单概括：SCL低电平从机放数据，高电平主机读数据
  * 注意点：主机需要提前释放SDA（置1）

![图 6](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/477d22d284f86112b637f6dda87d9d48cd1fbda9d4b567e7ca1e7ae4e1240e20.png)  

* 发送应答：主机在接收完一个字节之后，在下一个时钟发送一位数据，数据0表示应答，数据1表示非应答
   * 概括：主机接受完之后，发送1bit数据
   * 理解：从机发送完数据以后，等待SDA拉低，从而判断主机接收到了数据，即可再发下一笔数据，否则便释放SDA总线，不干扰主机下一步操作

![图 7](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/59cd5361cc063290adc1fa390aef7f30a45650f55690c3f91b17c4b107dea25f.png)  

* 接收应答：主机在发送完一个字节之后，在下一个时钟接收一位数据，判断从机是否应答，数据0表示应答，数据1表示非应答（主机在接收之前，需要释放SDA）
   * 概括：主机发送完之后，接收1bit数据
   * 理解：主机发送完数据以后，等待SDA拉低，从而判断从机接收到了数据，若没有接收到应答，主机可以视情况产生停止条件，并提示一些信息

![图 8](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/7a17e0b0e1075696e0b18d26c3291bbf1704a8efaaf3a492f43f3d0bfae06a17.png)  

### 2.2 三种数据帧

### 2.2.1 指定地址写

1. 步骤：
    1. 起始
    2. 主机写从机设备地址+写标志位（0）
       1. 从机地址一般为7位
    3. 主机接收从机应答
    4. 主机写从机内部地址
       1. 传感器：寄存器地址
       2. ADC：指令控制字
       3. Flash：内部RAM地址
    5. 主机接收从机应答
    6. 主机写数据
    7. 主机接收从机应答
    8. 停止
2. 注意：
   1. 扩展：如果想在一条数据帧连续写入多字节地址，则在7后重复6、7即可，地址会自动+1

![图 10](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/b9a6632ea0e682b56f3bb53698e74257b5dc97ada49fd71ae63704e572340bfc.png)  

### 2.2.1 当前地址读

1. 步骤：
    1. 起始
    2. 主机写从机设备地址+读标志位（1）
    3. 主机接收从机数据
    4. 主机发送从机非应答（SA）（1）
    5. 停止
2. 注意：
   1. 该方式无法指定从机内部地址，只能通过上一笔读写过的地址+1判断，若没有操作过默认为0地址。
      1. 地址会存入从机内部一个寄存器中，不会因为起始/停止改变地址内容
   2. 发送非应答SA，表示主机不想再继续接收数据，此时从机会释放SDA
   3. 扩展：如果想在一条数据帧连续读出多字节地址，则将4改为“主机发送从机应答”后重复3、4即可，地址会自动+1，直到不想再接收数据，将4改为“主机发送从机非应答”

![图 11](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/2bfba56c1f1d7b3a272f1e1b6e4f71c2e9caefc5533aef838085644c11a3eedb.png)  

### 2.2.2 指定地址读

1. 步骤：
    1. 起始
    2. 主机写从机设备地址+写标志位（0）
    3. 主机接收从机应答
    4. 主机写从机内部地址
    5. 主机接收从机应答
    6. restart（Sr）
    7. 主机写从机设备地址+读标志位（1）
    8. 主机接收从机应答
    9. 主机接收从机数据
    10. 主机发送从机非应答位（SA）
    11. 停止
2.  注意：
    1.  相当于主机先写了一个地址但没写数据，然后再发起一个读请求，从机就会由这个地址读取

![图 12](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/070df6919e69e1fb112d2bee6fbbf35d650bb1fc2d200b5b68c7fb868cc0a1d9.png)  




## 3 STM32硬件I2C













—————————————————————————————————————

Ongoing

—————————————————————————————————————

[首页](https://blog.skycity11.xyz)