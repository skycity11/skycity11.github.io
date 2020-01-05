---
layout: post
title:  "FPGA笔试题汇总"
date:   2019-1-5 18:25:00 +0530
categories: FPGA Verilog Test
---

FPGA笔试题汇总

—————————————————————————————————————

## 1 AMD 2008
### Q: Write a sequece of 3-bit grey code. Can you derive a general equation to convert binary to grey code?

* ### [题目分析]
    * 编写一个3位格雷码序列。 您可以导出将二进制转换为格雷码的一般方程吗？
    * 格雷码
      * 用途：跨时钟域的计数器设计（FIFO读写地址）
      * 好处：每次只变1bit,因此检测到边缘的时候不会判断出错，只会往返一拍。
      * 格雷码与二进制码对应关系：
        * 某二进制数为 B(n-1)B(n-2)...B2B1B0
        * 对应格雷码为 G(n-1)G(n-2)...G2G1G0
        * 最高位保留—— G(n-1) = B(n-1)
        * 其他各位  —— G(i) = B(i+1) 异或 B(i)

![grey_code](https://github.com/skycity11/skycity11.github.io/raw/master/img/FPGA_test/grey_code.png)

### A: 4位二进制转为格雷码的实现代码如下
```verilog
assign dout[3] = din[3];
assign dout[2] = din[3] ^ din[2];
assign dout[1] = din[2] ^ din[1];
assign dout[0] = din[1] ^ din[0];
```









—————————————————————————————————————

[HOME][home]

[home]: https://vinericy.cn

