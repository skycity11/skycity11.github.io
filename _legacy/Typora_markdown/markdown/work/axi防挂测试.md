## 修改内容

### RTL修改

> 在RTL0P5基础上新增antihang分支，不改动master代码
>
> ![image-20251201095639748](../../image/axi防挂测试/image-20251201095639748.png) 

1. 增加antihang ip，插在matrix_s4和asb_ai2pcie中间
   1. ![image-20251128155552476](../../image/axi放挂测试/image-20251128155552476.png) 

2. apb_decode新增antihang，并加入apb2apb异步桥
   1. ![image-20251128155844223](../../image/axi放挂测试/image-20251128155844223.png) 
   1. ![image-20251201162202178](../../image/axi防挂测试/image-20251201162202178.png)

3. 通过rf中的dummy output，cdc到antihang ip中，用来& force axi握手信号

   1. 参考dpu:master的机制,valid/last信号需要在hand shake之后再加入随机挂死

   2. ![image-20251203112433529](../../image/axi防挂测试/image-20251203112433529.png) 

   3. 
   
      


> 问题：
>
> 	1. clk接freerun
> 	1. time_pulse_in tie0
> 	1. paddr 12bit——4096B——4KB？
> 	1. o_irq_timeout和o_irq_buserr接到dummy_in
> 	1. 接rf的信号：/i_axready/i_rvalid/i_wready/i_rlast/i_bvalid

> 参数：
>
> 1. OUTSTANDING_NUM_W = 32
> 2. OUTSTANDING_NUM_R = 64
> 3. ID_W = 9
> 4. LEN_W = 8
> 5. ADDR_W = 36 ?
> 6. D_W = 64
> 7. WR_EN = 1
> 8. RD_EN = 1
> 9. MST_SLV_FLG = 0

### 环境修改

#### 需求

1. 以bus用例为基础，人为加入随机挂死
2. 触发timeout，环境就不比对，这样不会挂死
3. 触发timeout以后，master还会继续发
4. 补完以后，会回illegal response
5. m0和m1一起发

#### 三种挂死情况

1. awvalid来了，awready为0
   1. ![image-20251128163150787](../../image/axi放挂测试/image-20251128163150787.png)
2. data发了cmd没发
3. data发完 b通道没有反应

#### case修改点

![image-20251203112411623](../../image/axi防挂测试/image-20251203112411623.png)

![image-20251203112423324](../../image/axi防挂测试/image-20251203112423324.png)

![image-20251204204254130](../../image/axi防挂测试/image-20251204204254130.png)![image-20251204204354011](../../image/axi防挂测试/image-20251204204354011.png)

## dpu环境参考

tb![image-20251204205605912](../../image/axi防挂测试/image-20251204205605912.png)

cfg![image-20251204205609872](../../image/axi防挂测试/image-20251204205609872.png)

## ttb环境测试

ttb=

![sp20251205_101428_006](../../image/axi防挂测试/sp20251205_101428_006.png)

![image-20260113100119779](../../image/axi防挂测试/image-20260113100119779.png)
