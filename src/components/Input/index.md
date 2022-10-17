---
title: Input 输入框
nav:
  title: Components
  path: /components
group:
  title: Form 表单
  path: /components/form
---

## Input 输入框

通过键盘输入内容，最基础的表单域。

#### 基础用法

```tsx | preview
import React from 'react';
import {Input} from './index.tsx';

export default () => {
  return (
    <div>
      <Input placeholder="请输入内容"/>
    </div>
  )
};
```

#### 尺寸

```tsx | preview
import React from 'react';
import {Input} from './index.tsx';

export default () => {
  return (
    <div className="demo-input">
      <Input placeholder="请输入内容"  size="large"/>
      <Input placeholder="请输入内容" />
      <Input placeholder="请输入内容"  size="small"/>
    </div>
  )
};
```

#### 禁用状态

```tsx | preview
import React from 'react';
import {Input} from './index.tsx';

export default () => {
  
  return (
    <div>
      <Input disabled value="Lilith"/>
    </div>
  )
};
```

#### 样式

```tsx | preview
import React from 'react';
import {Input} from './index.tsx';

export default () => {
  
  return (
    <div>
      <Input disabled inline={false} value="Lilith"/>
    </div>
  )
};
```

#### 搜索

```tsx | preview
import React from 'react';
import {Input} from './index.tsx';


export default () => {
  return (
    <div>
      <Input type="search" />
    </div>
  )
};
```

#### 前缀和后缀

```tsx | preview
import React from 'react';
import {Input, Icon} from '../../../index.ts';


export default () => {
  return (
    <div className="demo-input">
      <Input suffix={<span>RMB</span>} size="large" value="100,00.00"/>
      <Input prefix={<Icon type="avatar"/>} size="large" value="100,00.00"/>
      <Input placeholder="请选择文件" suffix={<Icon type="folder"/>} size="large"/>
    </div>
  )
};
```

#### 三维曲线

```tsx | preview
import React from 'react';
import {Input} from './index.tsx';

export default () => {
  return (
    <div className="demo-input">
      <Input prefix={<span style={{fontSize: 12, lineHeight: 18, color: '#F84D5E'}}>X</span>} size="small" value="123.45"/>
      <Input prefix={<span style={{fontSize: 12, lineHeight: 18, color: '#47D27F'}}>Y</span>} size="small" value="123.45"/>
      <Input prefix={<span style={{fontSize: 12, lineHeight: 18, color: '#4E82E8'}}>Z</span>} size="small" value="123.45"/>
    </div>
  )
};
```

<API src='index.tsx'></API>
