## 2025-11-20

- [ ] aging sensor时序修改
- [x] ai2pcie mtx需要修改outstanding
  - [x] 已告知songlin，确认不需要修改

- [x] dvfs反压加入cfg_clk cgm en
- [x] uniclk 默认值修改
- [x] ist bist mode需要将BistEn=Y的时钟在ist_bist模式下开启
  - [x] clk glue里的ist bist连接上

- [ ] STC补充，增加ai2pcie axi2axi和mem_fw apb2apb
- [ ] vdsp梳理
  - [ ] vdsp port梳理
  - [ ] vdsp clk arch

## 2025-11-28

- [x] 报销
  - [x] 部门
  - [x] 羽毛球

## 2025-12-05

- [x] ram把bit enable下成0
  - [x] 已无法修改，因为ip已经0.9

- [ ] ai_scc_ro的set output delay去掉

## 2025-12-10

- [ ] pr guide补全

## 2025年12月16日

- [x] ptest_scan_reset_n
- [x] vau r1p3 09 002进版

## 2025年12月19日

- [ ] sdc
- [ ] ai2pcie加regslice
- [ ] pcie的两个中断，由dummy接入
- [ ] debug bus更新

## 2025-12-22

- [ ] dslp逻辑缺少缺main_m4的lpc