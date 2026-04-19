## 只保留匹配行

```cmd
:g!/<keyword>/d
```

## 搜索省略的正则

```cmd
/keyword1.*keyword2
```

## 跨行匹配

```cmd
/keyword.*\n.*keyword2
```

## 设置绝对行数/相对行数

```cmd
:set relativenumber		#相对行数
:set norelativenumber 	#绝对行数
```

