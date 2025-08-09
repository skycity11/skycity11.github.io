---
layout:       post
title:        "STM32学习随手记录"
author:       "Eric"
header-style: text
hidden:       false
catalog:      true
category:     technique
tags:
    - STM32
    - 手记

---
STM32回顾性学习，只记要点

## 1 Keil设置
1. Configuration（帮叟）
   1. Editor->Encoding->Encode in UTF-8 without signature 支持中文
   2. Editor->C/C++ Files->Tab size->4 更改缩进为4
   3. Color & Fonts-> C/C++ Editor files-> Text -> Font->14 调整字体大小
   4. Text Completion -> Symbols after 3 Characters 选中 自动补全设置（需重启软件）
2. Options for Target（魔术棒）
   1. C/C++-> Include Paths 声明所有包含头文件的文件夹
   2. C/C++-> Define内定义USE_STDPERIPH_DRIVER 使用标准外设编译，这是使用库函数的条件编译
   3. Debug 下拉列表选择对应调试器
   4. Debug 调试器旁边Settings Flash Download里勾选Reset and Run

## 2 STM32内部电路结构
![图 0](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/87c0f39c51fa6e2f03d5a623635c74c71777db1dce7b17fa6d61abc73195c688.png)  


## 3 STM32编程
   ### 3.1 方式：
      1. 直接调用寄存器（需查阅STM32文档）
      2. 库函数
      3. HAL
   
   ### 3.2 库函数

#### 3.2.1 使用库函数简单进行一个寄存器配置
   
```c
#include "stm32f10x.h"                  // Device header

int main(void)
{
	//使用库函数将位于GPIOC的Pin13对应的LED点亮（0亮1灭）
	//1. 打开clk使能
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOC, ENABLE); 	//打开GPIOC的clk使能
	//2. 定义GPIO结构体
	GPIO_InitTypeDef GPIO_InitStrcture;					//定义一个名为GPIO_InitStrcture的结构体，并在下面描述结构体的内容
	GPIO_InitStrcture.GPIO_Mode = GPIO_Mode_Out_PP; 	//通用推挽输出
	GPIO_InitStrcture.GPIO_Pin = GPIO_Pin_13; 			//将控制目标定为Pin13（跳转：点击Class为member的GPIO_Pin）
	GPIO_InitStrcture.GPIO_Speed = GPIO_Speed_50MHz;	//将Pin13速度定位50MHz
	//3. 初始化GPIO
	GPIO_Init(GPIOC, &GPIO_InitStrcture); 				//初始化GPIOC
	//4. GPIO设置为高/低电平
	GPIO_SetBits(GPIOC, GPIO_Pin_13);
//	GPIO_ResetBits(GPIOC, GPIO_Pin_13);
	while (1)
	{
		
	}
}
```


#### 3.2.2 寄存器输出模式
![![图 1](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/7c1a099dcd573099a95407cb3c971a2d2be35948eda20e9744b23ebdf81cfb2f.png)  
 1](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/2c7f31407fb659852c99794bdb36cf6a109a5301a0faf34c0028e22e1b30f4b3.png)  

   1. 推挽
      1. P-MOS/N-MOS都导通。高电平：1，低电平：0
   2. 开漏
      1. P-MOS关闭，N-MOS导通。高电平：高阻，低电平：0
      2. 可外接5V上拉电阻，将高电平输出为5V
   3. 关闭
      1. P-MOS/N-MOS都关闭。电平由外部电路控制45

```



















—————————————————————————————————————

Ongoing

—————————————————————————————————————

[首页](https://blog.skycity11.xyz)