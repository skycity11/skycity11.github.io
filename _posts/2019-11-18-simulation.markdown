---
layout: post
title:  "仿真语句总结"
date:   2019-11-18 16:09:00 +0530
categories: FPGA Verilog Testbench
---

总写一些testbench语法和仿真时出现的问题。

—————————————————————————————————————

# 1 testbench语法
## 1.1 task语法
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
```

## 1.2 repeat语法
repeat表示重复，括号中为次数。
```verilog
repeat(10) begin
	key = 1;
	#200000;
	key = 0;
end
```




### 就写到这里吧
—————————————————————————————————————

[HOME][home]

[home]: https://vinericy.cn

