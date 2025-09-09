---
layout:       post
title:        "每日任务"
author:       "Eric"
header-style: text
catalog: true
category: workflow
hidden: true

---


❤️|💛|💙|💚|
--|--|--|--
高优先级|中优先级|低优先级|/
未完成|未完成|未完成|已完成


> 2025/7/17  
1. 💚 10 tag release邮件
2. 💚 s6p ai arch更新  

> 2025/7/18  
1. 💚 changelist  

> 2025/7/29  
1. 💚 后仿波形确认
   1. 💚 uniclk&clk_core内部没有rst同步模块，需要规范软件对ai sys软复位行为
2. 💚 mem floating——ongoing
   1. 💚 ai_share_mem addr[15] deaddead
3. 💚 确认stc R24-01-02最新check list是否还存在问题
4. 💚 ai clk_glue 修改完毕 
5. 💚 地址回绕问题确认
6. 💚 worklog填写d 
7. 💚 sync_buf_idma中regfile2p_16x289
8. 💚 ocm 1MB计算过程 ddl 8.4
9.  🔵 sync_buf wr/rd问题
10. 🔵 画lowpower/reset arch/clock arch 参考mm sys 
11. 🔵 clk gui & dvfs 了解&try run
12. 💚 加入26m的源以后，为何能保证复位的时候没有时钟
   1. 硬复位：26m clk有sys专用gate，pmu给ai上电复位时，pmu会在ai复位之前gate该时钟，复位释放之后才会释放，ai的配置时钟sel默认在26m，以此保证硬复位过程中不会有时钟
   2. 软复位：无法确保，没有对应gate反压，但S6软件不会使用
13. 💚 77对比21 为何svt增加，lvt减少？
14. 💚 lp stat？mem_fw_eb 改成其他值配一下？

> 2025/7/31
1. 💚 bugzila  
2. 💚 changelist review aciton追踪  
2. 💚 changlist加上还没修改代码的点
3. 💚 让npu ip出一版带ulvt u2p memory的版本

> 2025/8/1
1. 💚 flat cdc  清理
2. 💚 changelist review及action追踪
   1. 💚 matrix的write outstanding是否能够达到要求

> 2025/8/5
1. 💚 ai low power arch更新
2.  💚 ai clock arch绘制

> 2025/8/8
1. 💚 沟通vdsp插slice问题
   1. vau相关的aw/ar通路是否能优化，不插slice
      1. 将vau位置上挪后（加region），vdsp2vau得到改善，但是vau2mtx 违例增加到0.13
         1. mtx2mtx r通道路径，违例达0.33
   2. cfg_s2 -> vdsp suboridinate也存在timing问题,约0.17
      1. 需要将reg_slice配置为打拍
   3. 
2. 💚 dbg bus是否为sys最新版本 
3. 💚 pcie，抓level shifter 延时
4. 💚 ase 跑完数据对比错误

> 2025/8/11
1. 💚 S6P NPU+VDSP加PowerSwitch 实验结果讨论
   1. 预计SYS内增加power switch后，IR可能会恶化1.5%到2.5%，可能需要在额外抬压50mV到0.90V才能改善IR问题
2. 💚 s6 ai后仿rst需要确认timing violation，预计只有clk core内部存在x态

> 2025/8/20
1. 💙 vc里qogirs6pro_define.v ?
2. 💚 和泽峰确认mem_fw连接
3. 💚 和bingwei确认ai_clk_glue.V


> 2025/9/1


2. 💚 AI系统说明书，有两个AISYS的问题修改
3. 💚 ai sys cv对齐会议
4. 💚 截止9.3 PBS ai sys修改
   1. 删除tower
   2. 删除axi top2ai异步桥？
5. 💙 NPU 64K sram优化
   1. before：2个64KB的SRAM
      1. 2048深度，256bit
      2. ![图 1](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/ccfbb1c409663c46b5223d2147352a7c6421d823e01481549258c9c3b35d5b24.png)  
   2. after：2个32KB的SRAM
      1. 1024深度，256bit
      2. ![图 3](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/1d41551bfc81a2b5166787c6a0cccbd32418a55d15da87c1d10c5bb816639611.png)  
   3. conclusion：预计减小0.0159mm2（综合面积）
 
> 2025/9/2
1. 💛 sta检查时钟周期正确
2. 💛 ai2pcie 通路
   1.  matrix+异步桥w端
   2.  matrix具体细节待确认
   3.  💚 pcie port fix
       1.  async bridge w
       2.  lp_stat_ai2pcie
3. 💚 ai clk glue还是有点问题，div_sel应该怎么选
    1.  改之前![图 4](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/1e263fedcc688a0b1e2ebc3c7db153f731d9208144ef384f9b57b25d77d8f6b2.png)  
    2.  改之后![图 5](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/ce16c95b67a97ec205173641748c18f21a0185671b3717e983d22c4ebc8dc288.png)  
    3.  ![图 6](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/bf9ed745bc10079bcf3ecb2830e2b906642b514c469c48d51a20b1338c226439.png)  



> 2025/9/4
1. 💛 dvfs 更新ipa后对比rtl
2. 💛 pr 更新timing 查看
   1. ![图 7](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/87871bbb9b3ce2c2215a157c89abb530c4b19ac18c1538bc07fd12de21db8452.png)  

3. 💛 slv fw进版更新
4. 💛 dbg bus修改
5. 💛 dv后仿 vio查看

> 2025/9/5
1. 💚 tower 006进版修改port位宽


> 2025/9/8
1. 💛 ocm slack
   1. ![图 8](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/6162b7d837c28ae1113cf02e265a1e5210ff9c1c2d24e9e615af62161e967153.png)  
   2. 现在大是因为multi bit，导致绕线很多
2. 💛 data path是否合理
   1. ![图 11](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/9e893551bbad432bba1a0903feaa10b6730b37621c79c8dd641f6c1fb6f334c6.png)  
   2. ![图 12](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/e8cb201f2e6e7fb21f67b8e867ccb939f6ae1d60d84ffd83e335c54322e1da80.png)  

> 2025/9/9
1. 💛 clk tree是ulvt ll，瑞奇推荐使用ulvt
2. 💛 后仿波形确认——第二轮回归的结果，vio还是得看，多关注下第一轮重点看的vio
   1. ![图 13](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/aedb4441c4bfeca2e3f6e9f84018d2351112078f1baffb39b84166b96bcdb50f.png)  
   2. ![图 14](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/92c102f884f2a7702d1319b9db13c26324250531b04c86d1c973a771bd543a1c.png)   
3. 💙 ai实验室有个偏技术项目的开发, 主要是一个可配置(预计96T)算力ai sys层的开发
   1. ![图 15](https://cdn.jsdelivr.net/gh/skycity11/picture@master/pic/9b7ae9b1596473eba2734603d6a5bc7569ce2cd7ab96ba672f4c8811448a1683.png)  


