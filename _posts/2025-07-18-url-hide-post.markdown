---
layout:       post
title:        "特定URL隐藏分类文章"
author:       "Eric"
header-style: text
hidden:       false
catalog:      true
category:     technique
tags:
    - markdown
    - html
    - 个人网站
    - 隐藏文章
    - 技巧
---
通过屏蔽关键词的方式伪隐藏文章，并通过特定URL查找到这些文章


## 原理分析

**目的:** 
要实现通过特定URL访问隐藏的分类文章，同时不让这些文章出现在**首页或其他公开位置**。

**方法分析：**
如果只是不想让文章出现在首页 → 方法1（hidden: true）
如果希望完全隐藏，除非知道 URL → 方法2（_drafts）
如果需要更严格的访问控制 → 方法3（私有分支）

*本文中只介绍**方法1***

**举例说明:** 
比如想要将work分类下的文章隐藏起来，输入`https://<your-site>/work`才可以看到

—————————————————————————————————————

## 具体步骤

### 1. 在文章的 Front Matter 中添加 hidden: true 和 category: work
* 给**隐藏文章**设置，隐藏属性为**是**，分类为**work**

```markdown
hidden: true  # 不在首页显示
category: work  # 属于 work 分类
```

* 给**正常文章**设置，隐藏属性为**否**

```markdown
hidden: false  # 在首页显示
```

### 2. 在_config.yml添加内容确保首页不显示 hidden 文章
* 在首页只显示hidden属性为false的文章

```markdown
defaults:
  - scope:
      path: ""
      type: posts
    values:
      hidden: false
```

### 3. 创建 /work/index.html 页面
* 该步骤目的是在`https://<your-site>/work`中**只显示**work分类的文章
* 将根目录的index.html直接**复制**到新建目录work下，在此基础上做一些修改
   1) Front Matter中加入`permalink: /work/`，以设置访问路径是`https://<your-site>/work`
   2) 在`for post in site.posts`中加入 {% if post.category ** "work" %}的判断，并用`{% endif %}`收尾，以确保只显示work分类的文章
* **以我的index.html为例**
  * 有些个人博客（比如我）搭建时用了**分页插件**（比如**jekyll-paginate**），所以首页的 index.html 里用的是 `paginator.posts`，而不是 `site.posts`。但分页插件 `paginator`只在首页生效，所以/work页面还是需要`site.posts`，只需都替换成`site.posts`即可
* **修改后**我的work/index.html如下
{% raw %}
```html
---
layout: page
description: "「work」"
permalink: /work/  
---

{% for post in site.posts %}
  {% if post.category == "work" %} 
    <div class="post-preview">
        <a href="{{ post.url | prepend: site.baseurl }}">
            <h2 class="post-title">
                {{ post.title }}
            </h2>
            {% if post.subtitle %}
            <h3 class="post-subtitle">
                {{ post.subtitle }}
            </h3>
            {% endif %}
            <div class="post-content-preview">
                {% if post.lang == 'en' %}
                    {{ post.content | strip_html | truncate:300 }}
                {% else %}
                    {{ post.content | strip_html | truncate:200 }}
                {% endif %}
            </div>
        </a>
        <p class="post-meta">
            Posted by {% if post.author %}{{ post.author }}{% else %}{{ site.title }}{% endif %} on {{ post.date | date: "%B %-d, %Y" }}
        </p>
    </div>
  {% endif %} 
<hr>
{% endfor %}
```
{% endraw %}

—————————————————————————————————————

The end

—————————————————————————————————————

[首页](https://blog.skycity11.xyz)