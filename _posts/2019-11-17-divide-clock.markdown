---
layout: post
title:  "任意奇数分频"
date:   2019-11-17 11:07:36 +0530
categories: FPGA Verilog
---

对时钟信号进行任意奇数分频，并仿真实现分频信号。

—————————————————————————————————————

# 1 三分频
## 1.1 三分频时序

### 首先来讲三分频电路逻辑，如何实现占空比为50%的三分频，也是硬件逻辑笔试题中常提的问题。其实三分频电路有很多种方法，这里选用其中一种：
### 先对时钟信号进行上升沿和下降沿触发的两个模三计数，当计数器计数到0和1时进行两次翻转，从而求出两个占空比为1/3的频率波形，分别为上升沿触发和下降沿触发，再将两个信号波形进行或运算。时序图如下：
![Aaron Swartz](https://github.com/skycity11/skycity11.github.io/raw/master/img/1/shixu.png)

## 1.2 三分频代码

### 对上升沿和下降沿分别进行模三计数
```verilog
reg	[15:0]	cnt_pos;    //上升沿计数
always@(posedge clk_in or negedge rst_n) begin
	if(!rst_n)
		cnt_pos <= 1'b0;
	else if(cnt_pos == 0)
		cnt_pos <= 1'b0;
	else
		cnt_pos <= cnt_pos + 1'b1;
end
```
```verilog
reg	[15:0]	cnt_neg;    //下降沿计数
always@(negedge clk_in or negedge rst_n) begin
	if(!rst_n)
		cnt_neg <= 1'b0;
	else if(cnt_neg == (DIV - 1'b1))
		cnt_neg <= 1'b0;
	else
		cnt_neg <= cnt_neg + 1'b1;
end
```

### 当计数器计数到0和1时进行两次翻转
```verilog
reg	clk_pos;    //  上升沿触发时钟
always@(posedge clk_in or negedge rst_n) begin
	if(!rst_n)
		clk_pos <= 1'b1;
	else if(cnt_pos == 0)
		clk_pos <= 1'b0;
	else if(cnt_pos == 1'b0)
		clk_pos <= 1'b1;
	else
		clk_pos <= clk_pos;
end
```
```verilog
reg	clk_neg;
always@(negedge clk_in or negedge rst_n) begin
	if(!rst_n)
		clk_neg <= 1'b1;
	else if(cnt_neg == ((DIV - 1'b1)/2))
		clk_neg <= 1'b0;
	else if(cnt_neg == 1'b0)
		clk_neg <= 1'b1;
	else
		clk_neg <= clk_neg;
end
```

### 将两个信号波形进行或运算
```verilog
assign	clk_out = clk_pos | clk_neg;
```

## 1.3 三分频仿真实现

### 用modelsim对逻辑代码进行仿真，得到的仿真图如下：
![Aaron Swartz](https://github.com/skycity11/skycity11.github.io/raw/master/img/1/div_3.png)

# 2 任意奇数分频
## 2.1 任意奇数分频逻辑

### 任意奇数分频只要在三分频的基础上进行修改即可，比如进行N分频，就让计数器进行模N计数，然后在计数到0和(N-1)/2的时候翻转，其余不变。

## 2.2 任意奇数分频代码
```verilog
module	divide_N
#(parameter DIV = 7)
(		input		clk_in,
		input		rst_n,
		output	clk_out
);

reg	clk_pos;
reg	clk_neg;

reg	[15:0]	cnt_pos;
reg	[15:0]	cnt_neg;

always@(posedge clk_in or negedge rst_n) begin
	if(!rst_n)
		cnt_pos <= 1'b0;
	else if(cnt_pos == (DIV - 1'b1))
		cnt_pos <= 1'b0;
	else
		cnt_pos <= cnt_pos + 1'b1;
end

always@(posedge clk_in or negedge rst_n) begin
	if(!rst_n)
		clk_pos <= 1'b1;
	else if(cnt_pos == ((DIV - 1'b1)/2))
		clk_pos <= 1'b0;
	else if(cnt_pos == 1'b0)
		clk_pos <= 1'b1;
	else
		clk_pos <= clk_pos;
end

always@(negedge clk_in or negedge rst_n) begin
	if(!rst_n)
		cnt_neg <= 1'b0;
	else if(cnt_neg == (DIV - 1'b1))
		cnt_neg <= 1'b0;
	else
		cnt_neg <= cnt_neg + 1'b1;
end

always@(negedge clk_in or negedge rst_n) begin
	if(!rst_n)
		clk_neg <= 1'b1;
	else if(cnt_neg == ((DIV - 1'b1)/2))
		clk_neg <= 1'b0;
	else if(cnt_neg == 1'b0)
		clk_neg <= 1'b1;
	else
		clk_neg <= clk_neg;
end

assign	clk_out = clk_pos | clk_neg;

endmodule
```

## 2.3 任意奇数分频测试模块代码
```verilog
`timescale 1ns/1ns
`define CLK50M_PERIOD 20

module	divide_N_tb;
	reg	clk;
	reg	rst_n;
	wire	clk_out;
	
parameter	DIV = 7;
initial clk = 1'b1;
always #(`CLK50M_PERIOD/2) clk = ~clk;

initial begin
	rst_n = 0;
	#(`CLK50M_PERIOD * 20 + 1)
	rst_n = 1;
	
	#5000;
	$stop;
end

divide_N
#(	.DIV(DIV)
	)divide_N
(	.clk_in(clk),
	.rst_n(rst_n),
	.clk_out(clk_out)
);

endmodule
```
## 2.4 任意奇数分频仿真实现
### 以7分频为例:
![Aaron Swartz](https://github.com/skycity11/skycity11.github.io/raw/master/img/1/div_7.png)

—————————————————————————————————————

[HOME][home]

[home]: https://vinericy.cn

