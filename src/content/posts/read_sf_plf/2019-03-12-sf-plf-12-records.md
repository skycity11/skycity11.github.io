---
title: 「SF-PLF」12 Records
published: "2019-03-12T00:00:00.000Z"
description: Programming Language Foundations - Adding Records To STLC
tags:
  - SF (软件基础)
  - PLF (编程语言基础)
  - Coq
  - 笔记
author: Hux
draft: true
---

## Adding Records


```coq
t ::=                          Terms:
    | {i1=t1, ..., in=tn}         record
    | t.i                         projection
    | ...

v ::=                          Values:
    | {i1=v1, ..., in=vn}         record value
    | ...

T ::=                          Types:
    | {i1:T1, ..., in:Tn}         record type
    | ...
```


## Formalizing Records
