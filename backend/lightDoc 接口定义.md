# 接口定义

### POST `/api/getDocumentList`

params : None

returns :

```json
[
	{
		"title": "demoTitle 1",
		"summary": "Just some summary text in limited length."
	}, {
		"title": "demoTitle 2",
		"summary": "Just some summary text in limited length."
	}
]
```



### POST `/api/searchDocument`

params :

```js
{
	keyword: "keyword"
}
```

returns :

```json
[
	{
		"title": "demoTitle keyword 1",
		"summary": "Just some summary text in limited length."
	}, {
		"title": "demoTitle keyword 2",
		"summary": "Just some summary text in limited length."
	}
]
```



### POST `/api/getDocument`

params :

```js
{
	title: "demoTitle 1"
}
```

returns :

```json
{
	"title": "demoTitle 1",
	"summary": "summary text....",
	"content": "这里应该是经过服务器转换的 HTML 文档"
}
```

