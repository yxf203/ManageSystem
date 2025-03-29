---
title: 通用零售批发系统
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# 通用零售批发系统

# Authentication

# store

## GET 分页查询仓库

GET /stores

分页查询

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|number| 否 |页数|
|pageSize|query|number| 否 |每页记录数|
|name|query|string| 否 |仓库名称|
|kind|query|number| 否 |仓库类型，说明：1为大库，2为门店|

> 返回示例

> 200 Response

```json
{
    "code": 1,
    "msg": "success",
    "data": {
        "total": 7,
        "rows": [
            {
                "id": 7,
                "name": "山东店",
                "kind": 2,
                "createTime": "2024-05-10T15:31:25"
            },
            {
                "id": 6,
                "name": "环翠仓",
                "kind": 1,
                "createTime": "2024-05-08T21:02:14"
            },
            {
                "id": 5,
                "name": "高区仓",
                "kind": 1,
                "createTime": "2024-05-08T21:02:03"
            },
        ]
    }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» total|integer|true|none||none|
|»» rows|[object]|true|none||none|
|»»» id|integer|false|none||none|
|»»» name|string|false|none||none|
|»»» kind|integer|false|none||none|
|»»» createTime|string|false|none||none|

## POST 新建仓库

POST /stores

> Body 请求参数

```json
{
  "name": "哈威仓",
  "kind": 1
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» name|body|string| 是 | 仓库名称|none|
|» kind|body|integer| 是 | 仓库类型：1大库，2门店|none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## PUT 修改仓库信息

PUT /stores

> Body 请求参数

```json
{
  "name": "哈威仓",
  "kind": 1
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» name|body|string| 是 ||none|
|» kind|body|integer| 是 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## DELETE 删除仓库

DELETE /stores/{ids}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|ids|path|number| 是 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 获取所有仓库

GET /stores/all

> 返回示例

> 200 Response

```json
{
  "code": 1,
  "msg": "success",
  "data": [
    {
      "id": 1,
      "name": "哈威店",
      "kind": 2,
      "createTime": "2024-05-08T21:00:57"
    },
    {
      "id": 2,
      "name": "山威店",
      "kind": 2,
      "createTime": "2024-05-08T21:01:18"
    },
    {
      "id": 3,
      "name": "哈威仓",
      "kind": 1,
      "createTime": "2024-05-09T21:01:32"
    },
    {
      "id": 4,
      "name": "山威仓",
      "kind": 1,
      "createTime": "2024-05-08T21:01:49"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» name|string|false|none||none|
|»» kind|integer|false|none||none|
|»» createTime|string|false|none||none|

## GET 根据id获取仓库

GET /stores/{id}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|id|path|number| 是 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 1,
  "msg": "success",
  "data": {
    "id": 1,
    "name": "哈威店",
    "kind": 2,
    "createTime": "2024-05-08T21:00:57"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|false|none||none|
|»» name|string|false|none||none|
|»» kind|integer|false|none||none|
|»» createTime|string|false|none||none|

# good

## GET 分页查询货品

GET /goods

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|page|query|number| 否 ||none|
|pageSize|query|number| 否 ||none|
|name|query|string| 否 ||none|
|state|query|number| 否 ||1上架，2未上架|
|storeId|query|number| 否 ||仓库id|
|decri|query|string| 否 ||货品规格|

> 返回示例

> 200 Response

```json
{
  "code": 1,
  "msg": "success",
  "data": {
    "total": 4,
    "rows": [
      {
        "id": 4,
        "name": "康师傅红烧牛肉面",
        "state": 1,
        "decri": "200g",
        "storeId": 1,
        "jhPri": 2,
        "pfPri": 2.5,
        "lsPri": 3,
        "storage": 100,
        "createTime": "2024-05-10T16:14:22"
      },
      {
        "id": 3,
        "name": "阿萨姆",
        "state": 2,
        "decri": "200mL",
        "storeId": 2,
        "jhPri": 3,
        "pfPri": 3.2,
        "lsPri": 4,
        "storage": 100,
        "createTime": "2024-05-10T16:13:43"
      },
      {
        "id": 2,
        "name": "可乐",
        "state": 1,
        "decri": "1L",
        "storeId": 1,
        "jhPri": 6,
        "pfPri": 6.4,
        "lsPri": 7,
        "storage": 100,
        "createTime": "2024-05-10T16:13:10"
      },
      {
        "id": 1,
        "name": "可乐",
        "state": 2,
        "decri": "150mL",
        "storeId": 1,
        "jhPri": 2,
        "pfPri": 2.3,
        "lsPri": 3,
        "storage": 100,
        "createTime": "2024-05-10T16:12:31"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» total|integer|true|none||none|
|»» rows|[object]|true|none||none|
|»»» id|integer|false|none|id|none|
|»»» name|string|false|none|货品名称|none|
|»»» state|integer|false|none|货品状态，1上架，2未上架|none|
|»»» decri|string|false|none||none|
|»»» storeId|integer|false|none||none|
|»»» jhPri|integer|false|none|进货价|none|
|»»» pfPri|number|false|none|批发价|none|
|»»» lsPri|integer|false|none|零售价|none|
|»»» storage|integer|false|none||none|
|»»» createTime|string|false|none||none|

## POST 新建货品

POST /goods

> Body 请求参数

```json
{
  "name": "康师傅红烧牛肉面",
  "state": 1,
  "decri": "200g",
  "storeId": 1,
  "jhPri": 2,
  "pfPri": 2.5,
  "lsPri": 3,
  "storage": 100
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» name|body|string| 是 ||none|
|» state|body|integer| 是 ||none|
|» decri|body|string| 是 ||none|
|» storeId|body|integer| 是 ||none|
|» jhPri|body|number| 是 ||none|
|» pfPri|body|number| 是 ||none|
|» lsPri|body|number| 是 ||none|
|» storage|body|integer| 是 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## PUT 修改货品信息

PUT /goods

> Body 请求参数

```json
{
  "id": 1,
  "name": "康师傅红烧牛肉面",
  "state": 1,
  "decri": "200g",
  "storeId": 1,
  "jhPri": 2,
  "pfPri": 2.5,
  "lsPri": 3,
  "storage": 100
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» id|body|integer| 是 ||none|
|» name|body|string| 是 ||none|
|» state|body|integer| 是 ||none|
|» decri|body|string| 是 ||none|
|» storeId|body|integer| 是 ||none|
|» jhPri|body|number| 是 ||none|
|» pfPri|body|number| 是 ||none|
|» lsPri|body|number| 是 ||none|
|» storage|body|integer| 是 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 获取所有商品

GET /goods/all

> 返回示例

> 200 Response

```json
{
  "code": 1,
  "msg": "success",
  "data": [
    {
      "id": 1,
      "name": "可乐",
      "state": 2,
      "decri": "150mL",
      "storeId": 1,
      "jhPri": 2,
      "pfPri": 2.3,
      "lsPri": 3,
      "storage": 100,
      "createTime": "2024-05-10T16:12:31"
    },
    {
      "id": 2,
      "name": "可乐",
      "state": 1,
      "decri": "1L",
      "storeId": 1,
      "jhPri": 6,
      "pfPri": 6.4,
      "lsPri": 7,
      "storage": 100,
      "createTime": "2024-05-10T16:13:10"
    },
    {
      "id": 3,
      "name": "阿萨姆",
      "state": 2,
      "decri": "200mL",
      "storeId": 2,
      "jhPri": 3,
      "pfPri": 3.2,
      "lsPri": 4,
      "storage": 100,
      "createTime": "2024-05-10T16:13:43"
    },
    {
      "id": 4,
      "name": "康师傅红烧牛肉面",
      "state": 1,
      "decri": "200g",
      "storeId": 1,
      "jhPri": 2,
      "pfPri": 2.5,
      "lsPri": 3,
      "storage": 100,
      "createTime": "2024-05-10T16:14:22"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» name|string|false|none||none|
|»» state|integer|false|none||none|
|»» decri|string|false|none||none|
|»» storeId|integer|false|none||none|
|»» jhPri|integer|false|none||none|
|»» pfPri|number|false|none||none|
|»» lsPri|integer|false|none||none|
|»» storage|integer|false|none||none|
|»» createTime|string|false|none||none|

## DELETE 删除货品

DELETE /goods/{ids}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|ids|path|number| 是 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 根据id获取货品

GET /goods/{id}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|id|path|number| 是 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 1,
  "msg": "success",
  "data": {
    "id": 1,
    "name": "可乐",
    "state": 2,
    "decri": "150mL",
    "storeId": 1,
    "jhPri": 2,
    "pfPri": 2.3,
    "lsPri": 3,
    "storage": 100,
    "createTime": "2024-05-10T16:12:31"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|false|none||none|
|»» name|string|false|none||none|
|»» state|integer|false|none||none|
|»» decri|string|false|none||none|
|»» storeId|integer|false|none||none|
|»» jhPri|integer|false|none||none|
|»» pfPri|number|false|none||none|
|»» lsPri|number|false|none||none|
|»» storage|number|false|none||none|
|»» createTime|string|false|none||none|

## GET 不分页仅查询

GET /goods/list

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|name|query|string| 否 ||名称|
|state|query|integer| 否 ||none|
|storeId|query|integer| 否 ||none|
|decri|query|string| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "id": 0,
      "name": "string",
      "state": 0,
      "decri": "string",
      "storeId": 0,
      "jhPri": 0,
      "pfPri": 0,
      "lsPri": 0,
      "storage": 0,
      "createTime": "string"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» name|string|false|none||none|
|»» state|integer|false|none||none|
|»» decri|string|false|none||none|
|»» storeId|integer|false|none||none|
|»» jhPri|integer|false|none||none|
|»» pfPri|number|false|none||none|
|»» lsPri|integer|false|none||none|
|»» storage|integer|false|none||none|
|»» createTime|string|false|none||none|

# cust

## GET 分页查询客户

GET /custs

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|page|query|integer| 否 ||none|
|pageSize|query|integer| 否 ||none|
|name|query|string| 否 ||none|
|kind|query|integer| 否 ||客户类型，说明：1 为批发客户，2 为零售客户，3为供货商|
|gender|query|string| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 1,
  "msg": "success",
  "data": {
    "total": 2,
    "rows": [
      {
        "id": 3,
        "name": "李四",
        "address": "哈尔滨工业大学（威海）",
        "kind": 1,
        "gender": 2,
        "phone": "19861355565",
        "createTime": "2024-05-11T09:13:54"
      },
      {
        "id": 1,
        "name": "张三",
        "address": "哈尔滨工业大学（威海）",
        "kind": 1,
        "gender": 1,
        "phone": "18972888398",
        "createTime": "2024-05-08T21:28:50"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» total|integer|true|none||none|
|»» rows|[object]|true|none||none|
|»»» id|integer|false|none||none|
|»»» name|string|false|none||none|
|»»» address|string|false|none||none|
|»»» kind|integer|false|none||客户类型，说明：1 为批发客户，2 为零售客户，3为供货商|
|»»» gender|integer|false|none||none|
|»»» phone|string|false|none||none|
|»»» createTime|string|false|none||none|

## POST 新建客户信息

POST /custs

> Body 请求参数

```json
{
  "name": "张三",
  "address": "哈尔滨工业大学（威海）",
  "kind": 1,
  "gender": 1,
  "phone": "18972888398"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» name|body|string| 是 ||none|
|» address|body|string| 是 ||none|
|» kind|body|integer| 是 ||none|
|» gender|body|integer| 是 ||none|
|» phone|body|string| 是 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## PUT 修改客户信息

PUT /custs

> Body 请求参数

```json
{
  "id": 1,
  "name": "张三",
  "address": "哈尔滨工业大学（威海）",
  "kind": 1,
  "gender": 1,
  "phone": "18972888398"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» id|body|integer| 是 ||none|
|» name|body|string| 是 ||none|
|» address|body|string| 是 ||none|
|» kind|body|integer| 是 ||none|
|» gender|body|integer| 是 ||none|
|» phone|body|string| 是 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 1,
  "msg": "success",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 获取所有客户信息

GET /custs/all

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "id": 0,
      "name": "string",
      "address": "string",
      "kind": 0,
      "gender": 0,
      "phone": "string",
      "createTime": "string"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» name|string|false|none||none|
|»» address|string|false|none||none|
|»» kind|integer|false|none||none|
|»» gender|integer|false|none||none|
|»» phone|string|false|none||none|
|»» createTime|string|false|none||none|

## GET 根据id获取客户

GET /custs/{id}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|id|path|integer| 是 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 1,
  "msg": "success",
  "data": {
    "id": 1,
    "name": "张三",
    "address": "哈尔滨工业大学（威海）",
    "kind": 1,
    "gender": 1,
    "phone": "18972888398",
    "createTime": "2024-05-08T21:28:50"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|false|none||none|
|»» name|string|false|none||none|
|»» address|string|false|none||none|
|»» kind|integer|false|none||none|
|»» gender|integer|false|none||none|
|»» phone|string|false|none||none|
|»» createTime|string|false|none||none|

## DELETE 删除客户信息

DELETE /custs/{ids}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|ids|path|integer| 是 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 分页查询供货商

GET /custs/sups

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|page|query|number| 否 ||none|
|pageSize|query|number| 否 ||none|
|name|query|string| 否 ||none|
|gender|query|number| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "total": 0,
    "rows": [
      {
        "id": 0,
        "name": "string",
        "address": "string",
        "kind": 0,
        "gender": 0,
        "phone": "string",
        "createTime": "string"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» total|integer|true|none||none|
|»» rows|[object]|true|none||none|
|»»» id|integer|false|none||none|
|»»» name|string|false|none||none|
|»»» address|string|false|none||none|
|»»» kind|integer|false|none||none|
|»»» gender|integer|false|none||none|
|»»» phone|string|false|none||none|
|»»» createTime|string|false|none||none|

# slip

## GET 分页查询销售单

GET /slips/sale

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|page|query|integer| 否 ||none|
|pageSize|query|integer| 否 ||none|
|kind|query|integer| 否 ||none|
|state|query|string| 否 ||none|
|storeId|query|integer| 否 ||none|
|custId|query|integer| 否 ||none|
|begin|query|string| 否 ||2024-01-01|
|end|query|string| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 1,
  "msg": "success",
  "data": {
    "total": 2,
    "rows": [
      {
        "id": 2,
        "kind": 1,
        "state": 2,
        "storeId": 1,
        "custId": 1,
        "createTime": "2024-05-11"
      },
      {
        "id": 1,
        "kind": 1,
        "state": 2,
        "storeId": 1,
        "custId": 1,
        "createTime": "2024-05-10"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» total|integer|true|none||none|
|»» rows|[object]|true|none||none|
|»»» id|integer|false|none||none|
|»»» kind|integer|false|none||none|
|»»» state|integer|false|none||none|
|»»» storeId|integer|false|none||none|
|»»» custId|integer|false|none||none|
|»»» createTime|string|false|none||none|

## GET 不分页查询

GET /slips/list

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|kind|query|integer| 否 ||none|
|state|query|integer| 否 ||none|
|storeId|query|integer| 否 ||none|
|custId|query|integer| 否 ||none|
|begin|query|string| 否 ||none|
|end|query|string| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "id": 0,
      "kind": 0,
      "state": 0,
      "storeId": 0,
      "custId": 0,
      "createTime": "string"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» kind|integer|false|none||none|
|»» state|integer|false|none||none|
|»» storeId|integer|false|none||none|
|»» custId|integer|false|none||none|
|»» createTime|string|false|none||none|

## GET 获取所有开单

GET /slips/all

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "id": 0,
      "kind": 0,
      "state": 0,
      "storeId": 0,
      "custId": 0,
      "createTime": "string"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» kind|integer|false|none||none|
|»» state|integer|false|none||none|
|»» storeId|integer|false|none||none|
|»» custId|integer|false|none||none|
|»» createTime|string|false|none||none|

## GET 根据id查询开单

GET /slips/{id}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|id|path|integer| 是 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "id": 0,
    "kind": 0,
    "state": 0,
    "storeId": 0,
    "custId": 0,
    "createTime": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|false|none||none|
|»» kind|integer|false|none||none|
|»» state|integer|false|none||none|
|»» storeId|integer|false|none||none|
|»» custId|integer|false|none||none|
|»» createTime|string|false|none||none|

## POST 新增开单

POST /slips

> Body 请求参数

```json
{
  "kind": 1,
  "state": 2,
  "storeId": 1,
  "custId": 1
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» kind|body|integer| 是 ||none|
|» state|body|integer| 是 ||none|
|» storeId|body|integer| 是 ||none|
|» custId|body|integer| 是 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 1,
  "msg": "success",
  "data": 5
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|integer|true|none||none|

## PUT 编辑开单信息

PUT /slips

> Body 请求参数

```json
{
  "id": 2,
  "kind": 1,
  "state": 2,
  "storeId": 1,
  "custId": 1
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» id|body|integer| 是 ||none|
|» kind|body|integer| 是 ||none|
|» state|body|integer| 是 ||none|
|» storeId|body|integer| 是 ||none|
|» custId|body|integer| 是 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## DELETE 删除开单信息

DELETE /slips/{ids}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|ids|path|integer| 是 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 分页查询采购单

GET /slips/buy

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|page|query|integer| 否 ||none|
|pageSize|query|integer| 否 ||none|
|state|query|integer| 否 ||none|
|storeId|query|integer| 否 ||none|
|custId|query|integer| 否 ||none|
|begin|query|string| 否 ||none|
|end|query|string| 否 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# user

## GET 分页查询用户信息

GET /users

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|page|query|integer| 否 ||none|
|pageSize|query|integer| 否 ||none|
|name|query|string| 否 ||名称|
|kind|query|integer| 否 ||none|
|gender|query|integer| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "total": 0,
    "rows": [
      {
        "id": 0,
        "name": "string",
        "username": "string",
        "password": "string",
        "kind": 0,
        "gender": 0,
        "createTime": "string"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» total|integer|true|none||none|
|»» rows|[object]|true|none||none|
|»»» id|integer|false|none||none|
|»»» name|string|false|none||none|
|»»» username|string|false|none||none|
|»»» password|string|false|none||none|
|»»» kind|integer|false|none||none|
|»»» gender|integer|false|none||none|
|»»» createTime|string|false|none||none|

## POST 新建用户信息

POST /users

> 返回示例

> 200 Response

```json
{
  "name": "string",
  "username": "string",
  "kind": 0,
  "gender": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» name|string|true|none||none|
|» username|string|true|none||none|
|» kind|integer|true|none||none|
|» gender|integer|true|none||none|

## PUT 修改用户信息

PUT /users

> 返回示例

> 200 Response

```json
{
  "name": "string",
  "username": "string",
  "kind": 0,
  "gender": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» name|string|true|none||none|
|» username|string|true|none||none|
|» kind|integer|true|none||none|
|» gender|integer|true|none||none|

## GET 获取所有用户信息

GET /users/all

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "id": 0,
      "name": "string",
      "username": "string",
      "password": "string",
      "kind": 0,
      "gender": 0,
      "createTime": "string"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» name|string|false|none||none|
|»» username|string|false|none||none|
|»» password|string|false|none||none|
|»» kind|integer|false|none||none|
|»» gender|integer|false|none||none|
|»» createTime|string|false|none||none|

## GET 根据id获取用户信息

GET /users/{id}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|id|path|integer| 是 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "id": 0,
    "name": "string",
    "username": "string",
    "password": "string",
    "kind": 0,
    "gender": 0,
    "createTime": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» username|string|true|none||none|
|»» password|string|true|none||none|
|»» kind|integer|true|none||none|
|»» gender|integer|true|none||none|
|»» createTime|string|true|none||none|

## DELETE 删除用户信息

DELETE /users/{ids}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|ids|path|integer| 是 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# slipDetail

## GET 查询开单细节

GET /slipDetails

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|goodId|query|integer| 否 ||none|
|slipId|query|integer| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 1,
  "msg": "success",
  "data": [
    {
      "id": 5,
      "slipId": 3,
      "goodId": 1,
      "number": 3,
      "notes": null
    },
    {
      "id": 4,
      "slipId": 3,
      "goodId": 2,
      "number": 2,
      "notes": null
    },
    {
      "id": 2,
      "slipId": 1,
      "goodId": 2,
      "number": 3,
      "notes": null
    },
    {
      "id": 1,
      "slipId": 1,
      "goodId": 1,
      "number": 2,
      "notes": null
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» slipId|integer|false|none||none|
|»» goodId|integer|false|none||none|
|»» number|integer|false|none||none|
|»» notes|string|false|none||none|

## GET 根据id查询开单细节

GET /slipDetails/{id}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|id|path|integer| 是 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 1,
  "msg": "success",
  "data": {
    "id": 1,
    "slipId": 1,
    "goodId": 1,
    "number": 2,
    "notes": null
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» slipId|integer|true|none||none|
|»» goodId|integer|true|none||none|
|»» number|integer|true|none||none|
|»» notes|null|true|none||none|

## POST 新建开单细节

POST /slipDetail

> Body 请求参数

```json
[
  {
    "slipId": 3,
    "goodId": 1,
    "number": 3,
    "notes": null
  },
  {
    "slipId": 3,
    "goodId": 2,
    "number": 2,
    "notes": null
  }
]
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|array[object]| 否 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## PUT 修改开单细节

PUT /slipDetails/{slipId}

> Body 请求参数

```json
[
  {
    "id": 1,
    "slipId": 1,
    "goodId": 2,
    "number": 2,
    "notes": null
  },
  {
    "slipId": 1,
    "goodId": 3,
    "number": 2,
    "notes": null
  }
]
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|slipId|path|integer| 是 ||none|
|body|body|array[object]| 否 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## DELETE 删除开单细节

DELETE /slipDetails/{ids}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|ids|path|integer| 是 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## PUT 根据订单id退货

PUT /slipDetails/reject/{slipId}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|slipId|path|integer| 是 ||需要退货的订单id|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## PUT 根据订单id出货

PUT /slipDetails/out/{slipId}

会把订单对应的详情货品扣掉库存

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|slipId|path|integer| 是 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# billDetail

## GET 根据采购单id查询

GET /billDetails

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|slipId|query|integer| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "id": 0,
      "slipId": 0,
      "name": "string",
      "decri": "string",
      "storeId": 0,
      "jhPri": 0,
      "number": 0,
      "notes": "string"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» slipId|integer|false|none||none|
|»» name|string|false|none||none|
|»» decri|string|false|none||none|
|»» storeId|integer|false|none||none|
|»» jhPri|number|false|none||none|
|»» number|integer|false|none||none|
|»» notes|string|false|none||none|

## POST 新增多个采购单细节

POST /billDetails

> Body 请求参数

```json
[
  {
    "slipId": 7,
    "name": "可乐",
    "decri": "150mL",
    "storeId": 1,
    "jhPri": 1.5,
    "number": 100,
    "notes": null
  }
]
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|array[object]| 否 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## PUT 根据采购单id修改对应细节

PUT /billDetails/{slipId}

> Body 请求参数

```json
[
  {
    "slipId": 7,
    "name": "可乐",
    "decri": "150mL",
    "storeId": 1,
    "jhPri": 1.5,
    "number": 100,
    "notes": null
  },
  {
    "id": 4,
    "slipId": 7,
    "name": "可乐",
    "decri": "150mL",
    "storeId": 1,
    "jhPri": 1.5,
    "number": 100,
    "notes": null
  }
]
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|slipId|path|integer| 是 ||none|
|body|body|array[object]| 否 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## DELETE 批量删除

DELETE /billDetails/{ids}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|ids|path|number| 是 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 根据id查询

GET /billDetails/{id}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|id|path|integer| 是 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "id": 0,
    "slipId": 0,
    "name": "string",
    "decri": "string",
    "storeId": 0,
    "jhPri": 0,
    "number": 0,
    "notes": null
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» slipId|integer|true|none||none|
|»» name|string|true|none||none|
|»» decri|string|true|none||none|
|»» storeId|integer|true|none||none|
|»» jhPri|number|true|none||none|
|»» number|integer|true|none||none|
|»» notes|null|true|none||none|

## POST 审核完对货品进行修改

POST /billDetails/pass/{slipId}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|slipId|path|integer| 是 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|



