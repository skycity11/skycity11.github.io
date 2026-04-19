# VDSP梳理

## VDSP port梳理

| PORT | bit | direction | Function |
| ---- | - | ------------------------ | ---- |
| clk_vdsp                   |      | in        |      |
| clk_vdsp_tck               |      | in        | |
| clk_scan_ate               |      | in        | |
| rst_por_n                  |      | in        | |
| vdsp_soft_rst              |      | in        | |
| vdsp_debug_rst             |      | in        | |
|                            |      |           | |
| dummy_vdsp_wrap_in | 32 | in | |
| dummy_vdsp_wrap_out | 32 | out | |
| ram_pd |  | in | |
| ram_poff_sd |  | in | |
| ram_pd_dly | 1 | out | |
| ram_poff_sd_dly | | out | |
| pd_vdsp_core_iso | | in | |
| pd_vdsp_core_shutdown_m_b | | in | |
| pd_vdsp_core_shutdown_d_b | | in | |
| pd_vdsp_core_ack_m | | out | |
| pd_vdsp_core_ack_d | | out | |
|  | |  | |
| PwaitMode | | out | |
| PFatalError | | out | |
| PFaultInfo | 64 | out | |
| PFaultInfoValid | | out | |
| MEM_TESTCTRL | 16 | in | |
| JTDI | | in | |
| JTMS | | in | |
| JTRST | | in | |
| JTDO | | out | |
| JTDOEn | | out | |
| DBGEN | | in | |
| NIDEN | | in | |
| SPIDEN | | in | |
| SPNIDEN | | in | |
| RunStall | | in | |
| StatVectorSel | | in | |
| BInterrupt | 48 | in | |
| PRID | 16 | in | |
| AltResetVec | 32 | in | |
|  |  |  | |
| TrigIn_iDMA | 4 | in | |
| TrigOut_iDMA | 4 | out | |
| pdebug_enable |  | in | |
| pdebug_sel | 3 | in | |
| pdebug_out | 32 | out | |
|                            |      |           | |
| ManagerL1AXBAR |  | out | |
| ManagerL1AXDOMAIN | 2 | out | |
| ManagerL1AXCACHE | 4 | out | |
| ManagerL1AXLOCK | | out | |
| ManagerL1AXPROT | | out | |
| ManagerL1AXQOS | | out | |
| ManagerL1AXSNOOP | | out | |
|  | |  | |
| SysSubordinate0* | / | / | |
| IDMA* | / | / | |
|                            |      |           |          |
| ptest_scan_mode | | in | |
| ptest_scan_occ_bypass | | in | |
| ptest_scan_mem_bypass_mode | | in | |
| ptest_scan_reset_n | | in | |
| ptest_icg_mode | | in | |
| ptest_bist_mode | | in | |
| ptest_sram_emc_tie         |      | in        |          |
| ptest_bist_pll_reset_n     |      | in        | |
| ptest_scan_pll_reset_n | | in | |
| ptest_scan_qgating_en      |      | in        | |
| ptest_ist_bist_mode        |      | in        |          |
|                            |      |           | |
|                            |      |           | |
|                            |      |           | |
|                            |      |           |          |
|                            |      |           | |
|                            |      |           |          |
|                            |      |           | |
|                            |      |           | |
|                            |      |           | |
|                            |      |           |          |
|                            |      |           |          |
|                            |      |           |          |
|                            |      |           | |
|                            |      |           | |
|                            |      |           |          |
|                            |      |           |          |
|                            |      |           |          |
|                            |      |           |          |
|                            |      |           |          |
|                            |      |           |          |
|                            |      |           | |
|                            |      |           |          |
|                            |      |           | |
|                            |      |           | |
|                            |      |           |          |
|                            |      |           | |
|                            |      |           | |

