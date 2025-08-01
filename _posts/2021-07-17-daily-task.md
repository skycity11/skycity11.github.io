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
6. 🟢 worklog填写
7. 🔵 sync_buf_idma中regfile2p_16x289
8. 🟡 ocm 1MB计算过程 ddl 8.4
9.  🔵 sync_buf wr/rd问题
10. 🔵 画lowpower/reset arch/clock arch 参考mm sys 
11. 🔵 clk gui & dvfs 了解&try run
12. 🔴 加入26m的源以后，为何能保证复位的时候没有时钟
13. 🔵 77对比21 为何svt增加，lvt减少？
14. 🟡 lp stat？mem_fw_eb 改成其他值配一下？

> 2025/7/31
1. 🔴 bugzila  
2. 🟢 changlist加上还没修改代码的点
3. 🟡 让npu ip出一版带ulvt u2p memory的版本

> 2025/8/1
1. 🟢 flat cdc  清理
2. 🟢 changelist review
   1. 🔵 matrix的write outstanding是否能配置为64
