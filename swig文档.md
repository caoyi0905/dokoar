#开始
##安装
npm安装：
```
$ npm install swig --save
```
##基础用法
Swig有多种方式去编译和渲染模版。请查看API文档来获取更多详细信息和用法。
``` js
var swig=require('swig');

// Compile a file and store it, rendering it later
var tpl = swig.compileFile('/path/to/template.html');
console.log(tpl({ article: { title: 'Swig is fun!' }}));

// Immediately render a Swig template from a string
console.log(swig.render('{% if foo %}Hooray!{% endif %}', { locals: { foo: true }}));
```
##变量
变量传递给模板可以使用double-curly-brackets输出:所有的变量输出都自动转义，函数输出除外。


###符号
可以通过使用通过点或括号访问对象的属性。下面的例子是等价的:
``` js
{{ foo.bar }}
// is equivalent to
{{ foo['bar'] }}
```
然而,符号样式同样遵循JavaScript的规则。 如果一个属性包括非字母或数字的字符,必须使用括号来访问,而不是通过点。


####错误用法
``` js
{{ foo.chicken-tacos }}
```

####正确用法
``` js
{{ foo['chicken-tacos'] }}
```

###未定义类型(Undefined) VS 零值(Falsy Values)
如果某个变量是未定义的，不用担心，你的模板不会出问题。取而代之的是一个空字符串输出在相应位置。然而，比如像```null,false,0```这样的零值，将会显示。

###过滤器
变量可以被过滤器修改。过滤器以特殊的链式结构表达。
``` js
{{ name|title }} was born on {{ birthday|date('F jS, Y') }}
// => Jane was born on July 6th, 1985
```

###函数
变量也可以是JavaScript函数。请注意，不管你是否设置了自动转义，函数用于阿奴会被自动转义
``` js
var locals = { mystuff: function mystuff() { return '<p>Things!</p>'; } };
swig.render('{{ mystuff() }}', { locals: locals });
// => <p>Things!</p>
```
如果你想强制转义，请使用转义过滤器。
``` js
{{ mystuff()|escape }}
// => &lt;p&gt;Things&lt;/p&gt;
```

##逻辑标签
Swig包括一些基础的操作块(operational blocks)，称之为标签，可以帮助你控制比变量更大规模的输出。标签用'%'包含起来。

``` js
{% if foo %}bar{% endif %}

// Create a list of people, only if there are items in the people array
{% for person in people %}
  {% if loop.first %}<ol>{% endif %}
  <li>{{ person.name }}</li>
  {% if loop.last %}</ol>{% endif %}
{% endfor %}
```
```end```tags may also have any set of extra context within them, and will just be ignore. This is useful for scoping and understanding which block you are closing and where.
``` js
{% block tacos %}
  //...
{% endblock tacos %}
{% block burritos %}
  {% if foo %}
    // ...
  {% endif the above will render if foo == true %}
{% endblock burritos %}
```
若想了解更多的标签和用法，请查看标签文档。

##注释
注释标签在解析过程中将被忽略。他们将会在模板渲染出来之前被移除，所以注释只会出现在源代码中。注释是用{##}来包含。
``` html
{#
This is a comment.
It will be fully stripped and ignored during parsing.
#}
```

##空格控制
模板中的任何空格在最终渲染时都将被保留。然而，你可以使用标签让空格不出现。
在标签的最开始或最末添加'-'就可以去掉在这前后的空格。
``` js
// seq = [1, 2, 3, 4, 5]
{% for item in seq -%}{{ item }}
{%- endfor %}
// => 12345
```

*注意：在标签的开始/结束标记和‘-’之间* **不能** * 有任何空格*

##模板继承
Swig使用```extend & block```来进行模板继承。  
###layout.html
``` html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>{% block title %}My Site{% endblock %}</title>

  {% block head %}
  <link rel="stylesheet" href="main.css">
  {% endblock %}
</head>
<body>
  {% block content %}{% endblock %}
</body>
</html>
```

###index.html
``` html
{% extends 'layout.html' %}

{% block title %}My Page{% endblock %}

{% block head %}
  {% parent %}
  <link rel="stylesheet" href="custom.css">
{% endblock %}

{% block content %}
<p>This is just an awesome page.</p>
{% endblock %}
```

##在Express中使用Swig
Swig兼容Express(一个Node.js的简单web框架)。
以下是一个用Swig作为模版引擎的Express的例子：
``` js
var app = require('express')(),
  swig = require('swig'),
  people;

// This is where all the magic happens!
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!

app.get('/', function (req, res) {
  res.render('index', { /* template locals context */ });
});

app.listen(1337);
console.log('Application Started on http://localhost:1337/');
```