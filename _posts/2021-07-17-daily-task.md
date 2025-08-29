---
layout:       post
title:        "每日任务"
author:       "Eric"
header-style: text
catalog: true
category: workflow
hidden: true

---


🔴|🟡|🔵|🟢
--|--|--|--
高优先级|中优先级|低优先级|/
未完成|未完成|未完成|已完成


> 2025/7/17  
1. 🟢 10 tag release邮件
2. 🟢 s6p ai arch更新  

> 2025/7/18  
1. 🟢 changelist  

> 2025/7/29  
1. 🟢 后仿波形确认
   1. 🟢 uniclk&clk_core内部没有rst同步模块，需要规范软件对ai sys软复位行为
2. 🟡 mem floating——ongoing
   1. 🟡 ai_share_mem addr[15] deaddead
3. 🟢 确认stc R24-01-02最新check list是否还存在问题
4. 🔵 ai clk_glue 修改完毕 
5. 🟡 地址回绕问题确认
6. 🟢 worklog填写d 
7. 🔵 sync_buf_idma中regfile2p_16x289
8. 🟡 ocm 1MB计算过程 ddl 8.4
9.  🔵 sync_buf wr/rd问题
10. 🔵 画lowpower/reset arch/clock arch 参考mm sys 
11. 🔵 clk gui & dvfs 了解&try run
12. 🟢 加入26m的源以后，为何能保证复位的时候没有时钟
   1. 硬复位：26m clk有sys专用gate，pmu给ai上电复位时，pmu会在ai复位之前gate该时钟，复位释放之后才会释放，ai的配置时钟sel默认在26m，以此保证硬复位过程中不会有时钟
   2. 软复位：无法确保，没有对应gate反压，但S6软件不会使用
13. 🟢 77对比21 为何svt增加，lvt减少？
14. 🟡 lp stat？mem_fw_eb 改成其他值配一下？

> 2025/7/31
1. 🟢 bugzila  
2. 🟢 changelist review aciton追踪  
2. 🟢 changlist加上还没修改代码的点
3. 🟡 让npu ip出一版带ulvt u2p memory的版本

> 2025/8/1
1. 🟢 flat cdc  清理
2. 🟢 changelist review及action追踪
   1. 🟢 matrix的write outstanding是否能够达到要求

> 2025/8/5
1. 🟢 ai low power arch更新
2. 🔴 ai clock arch绘制

> 2025/8/8
1. 🟡 沟通vdsp插slice问题
   1. vau相关的aw/ar通路是否能优化，不插slice
      1. 将vau位置上挪后（加region），vdsp2vau得到改善，但是vau2mtx 违例增加到0.13
         1. mtx2mtx r通道路径，违例达0.33
   2. cfg_s2 -> vdsp suboridinate也存在timing问题,约0.17
      1. 需要将reg_slice配置为打拍
   3. 
2. 🟢 dbg bus是否为sys最新版本 
3. 🟡 pcie，抓level shifter 延时
4. 🟡 ase 跑完数据对比错误

> 2025/8/11
1. 🟢 S6P NPU+VDSP加PowerSwitch 实验结果讨论
   1. 预计SYS内增加power switch后，IR可能会恶化1.5%到2.5%，可能需要在额外抬压50mV到0.90V才能改善IR问题
2. 🟡 s6 ai后仿rst需要确认timing violation，预计只有clk core内部存在x态

> 2025/8/20
1. 🟡 vc里qogirs6pro_define.v ?
2. 🟢 和泽峰确认mem_fw连接
3. 🟢 和bingwei确认ai_clk_glue.V
