---
layout:       post
title:        "OpenClaw 本地模型电脑配置清单"
author:       "Eric"
header-style: text
hidden:       false
catalog:      true
category:     technique
tags:
    - AI
    - LLM
    - OpenClaw
    - 本地模型
    - 硬件

---

OpenClaw 是一套以 AI Agent 为核心用户的本地运行框架，可以接入本地大语言模型或云端模型。本文整理了在本地跑模型时推荐的硬件配置，供参考。

---

## 1 最低配置（能跑，但别指望太快）

| 配置项 | 最低要求 |
|--------|---------|
| CPU    | x86_64 或 ARM64 现代处理器 |
| 内存   | 16 GB RAM |
| GPU    | 4 GB VRAM（NVIDIA / AMD） |
| 存储   | 50 GB 可用空间 |
| 系统   | macOS / Linux / Windows |
| 运行时 | Node.js 20+ |

> 如果只跑 gateway 模式（转发到云端），10 GB 存储 + 4 GB RAM 即可，不需要 GPU。

---

## 2 推荐配置（日常使用 3B–7B 模型）

| 配置项 | 推荐参数 |
|--------|---------|
| CPU    | 8 核以上（CPU 不是瓶颈，够用即可） |
| 内存   | 32 GB RAM |
| GPU    | 8 GB VRAM（如 RTX 3060 / RTX 4060） |
| 存储   | 100 GB SSD |
| 网络   | 稳定连接（模型下载用） |

- **16 GB RAM**：可跑 3B 参数量级模型
- **32 GB RAM**：可跑 7B 参数量级模型，体验流畅

---

## 3 高性能配置（跑 27B+ 大模型）

| 配置项 | 高性能参数 |
|--------|-----------|
| CPU    | 16 核以上 |
| 内存   | 64 GB+ RAM |
| GPU    | NVIDIA RTX 4090（24 GB VRAM）或同级 |
| 存储   | 500 GB NVMe SSD |

### Apple Silicon 方案

苹果 M 系列芯片的统一内存架构（Unified Memory）在本地模型推理上性价比很高，且内存带宽直接决定 token 生成速度：

| 芯片 | 统一内存上限 | 内存带宽 | 适合模型规模 | 代表机型 |
|------|------------|---------|-------------|---------|
| M4 | 32 GB | 120 GB/s | 7B–13B | MacBook Air, Mac mini |
| M4 Pro | 64 GB | 273 GB/s | 13B–32B | MacBook Pro 14/16 |
| M4 Max | 128 GB | 546 GB/s | 32B–70B | MacBook Pro 16, Mac Studio |
| M5 | 32 GB | 154 GB/s | 7B–13B | MacBook Air（2025） |
| M5 Pro | 64 GB | 307 GB/s | 13B–32B | MacBook Pro 14/16（2026） |
| M5 Max | 128 GB | 614 GB/s | 32B–70B | MacBook Pro 16（2026） |

**参考推理速度（Ollama，4-bit 量化）：**
- M4 Pro 64GB 跑 DeepSeek R1 32B：约 11–14 tok/s
- M4 Max：约 81 tok/s（通用小模型）
- M5 系列相比 M4 整体快约 20–27%

> **注意**：token 生成速度由内存带宽决定，而非 CPU 频率。M5 Max 的 614 GB/s 带宽是目前消费级设备中最高的。

> **推荐甜蜜点**：M5 Pro（64 GB）是 2026 年当前性价比最高的本地模型方案，可流畅运行 32B 量级模型。

---

## 4 本地模型运行时

OpenClaw 官方推荐搭配 **Ollama** 作为本地模型的运行后端（2026年3月起成为官方支持的 provider）。

```bash
# 安装 Ollama
brew install ollama  # macOS

# 拉取模型（以 Qwen 为例）
ollama pull qwen2.5:7b

# 启动 OpenClaw 并指向 Ollama
# 在 OpenClaw 配置中设置 provider 为 ollama
```

推荐模型：
- **Qwen2.5 7B** — 中文支持好，7B 体量，32 GB 内存可流畅运行
- **Qwen3.5 27B** — 性能接近 GPT-4o Mini，需 64 GB+ 内存
- **Llama 3.1 8B** — 英文任务推荐

---

## 5 存储空间估算

| 模型规模 | 大约占用磁盘空间 |
|---------|---------------|
| 3B      | ~2 GB         |
| 7B      | ~4–5 GB       |
| 13B     | ~8 GB         |
| 27B     | ~16 GB        |
| 70B     | ~40 GB        |

---

## 6 总结

| 场景 | 推荐方案 |
|------|---------|
| 轻量体验 | 16 GB RAM + 任意独显 4 GB VRAM |
| 日常开发 | 32 GB RAM + RTX 4060 / Apple M5 Pro 64GB |
| 高强度生产 | 64 GB RAM + RTX 4090 / M5 Max 128GB Mac Studio |
| 低功耗部署 | Jetson Orin Nano |

数据隐私是本地部署最大的优势——所有推理都在本机完成，不走网络。如果对数据安全有要求，本地跑模型是目前最稳妥的方案。
