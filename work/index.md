---
title: "Work"
layout: default  # 使用你的默认布局（通常是 `default.html` 或 `post.html`）
permalink: /work/  # 确保访问路径是 `/work/`
---

## Work 相关文章

{% for post in site.posts %}
  {% if post.category == "work" %}
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p>{{ post.excerpt }}</p>
  {% endif %}
{% endfor %}