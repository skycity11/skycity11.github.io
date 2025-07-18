---
layout: post
title:  "Testbench书写"
date:   2019-11-18 16:09:00 +0530
categories: FPGA Verilog Testbench
---

总结一些testbench常用模块和语法以及仿真时出现的问题。

—————————————————————————————————————
# 1 testbench常用小模块
## 1.1 时钟产生模块
产生50MHz时钟模块：
```verilog
`timescale 1ns/1ns
`define CLK50M_PERIOD 20
initial clk = 1'b1;
always #(`CLK50M_PERIOD/2) clk = ~clk;
```

# 2 testbench语法
## 2.1 task语法
task表示任务，里面的语句顺序执行，写好之后直接调用即可,注意加括号，该语法可以起到精简代码的作用。
```verilog
initial begin
	rst_n = 0;
	#201;
	rst_n = 1;
	#20000;
	key_press();	//调用
	#20000;
end

reg key;
task key_press;		//定义
	begin
		key = 1;
		#200000;
		key = 0;
	end
endtask
```

## 2.2 repeat语法
repeat表示重复，括号中为次数。
简单的重复10次的例子：
```verilog
repeat(10) begin
	key = 1;
	#200000;
	key = 0;
end
```
含敏感信号的例子：
```verilog
repeat(10) @(posedge clk) syn_rst = 1'b0;
```

## 2.3 随机数$random(不可综合)
random函数仅用于测试验证，如果需要可综合的随机数，需要研究LSFR等随机数生成方法。
产生一个(-50,50)范围内的随机数：
```verilog
reg	[23:0]	rand;
rand = $random % 50
```
产生一个(min,max)范围内的随机数：
```verilog
reg [23:0]	rand;
rand = min + {$random} % (max - min + 1);
```

## 2.4 wait语法
等待key=1时往下执行。
```verilog
wait(key == 1);
```

## 2.5 for语法
与C基本一致，注意不能i++，实例如下：
```verilog
for(i=0;i<100;i=i+1) begin
	key = 1;
	#(i * 1000);
	key = 0;
end
```


—————————————————————————————————————

[HOME][home]

[home]: https://vinericy.cn

