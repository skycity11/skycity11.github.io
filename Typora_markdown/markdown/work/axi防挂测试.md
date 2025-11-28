## 修改内容

### RTL修改

> 在RTL0P5基础上新增antihang分支，不改动master代码

1. 增加antihang ip，插在matrix_s4和asb_ai2pcie中间
   1. ![image-20251128155552476](../../image/axi放挂测试/image-20251128155552476.png) 
2. apb_decode新增antihang，并加入apb2apb异步桥
   1. ![image-20251128155844223](../../image/axi放挂测试/image-20251128155844223.png) 
3. 通过rf中的dummy output，cdc到antihang ip中，用来& force axi握手信号

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