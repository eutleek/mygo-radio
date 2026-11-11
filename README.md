# 网络电台 · Network Radio

MyGo Music 的网络电台插件：161 个在线直播流，点一个就一直播下去。
只读——没有登录、没有收藏、没有歌单，只有声音。

A [MyGo Music](https://github.com/egoist/mygo-music) plugin for live internet radio:
161 streams from SomaFM, public broadcasters and independent stations. Pick one and
it plays for as long as you listen. Nothing to sign in to, nothing to save — just sound.

## 安装 / Install

**应用内**：设置 → 插件（Plugins）→ 标题栏 `+` → 从 GitHub（From GitHub）→ 填 `eutleek/mygo-radio`

**一键安装链接 / Install link**

```
mygo-music://install-plugin?repo=eutleek/mygo-radio
```

在浏览器里打开上面的链接（或点这里：<mygo-music://install-plugin?repo=eutleek/mygo-radio>），
会拉起 MyGo Music，下载插件并在安装前先问一句。开发版 App（`go tool mygo dev`）用
`mygo-music-dev://`。

**本地装**：把仓库 clone 下来，用 `+` → 从文件夹（From a folder）选这个目录；或者下载
Release 里的 zip 直接给它。

需要 MyGo Music **0.1.8** 或更高。装上之后侧边栏是：

```
网络电台      （首页：七类各一版）
全部电台      （161 台全在这）
洛菲与氛围 / 古典 / 爵士与灵魂 / 电子与舞曲 / 摇滚与流行 / 公共广播 / 民谣与世界
```

## 里面有什么 / What's inside

| 分类 | 台数 | 举例 |
| --- | --- | --- |
| 洛菲与氛围 Lo-Fi & Ambient | 35 | SomaFM Groove Salad、Lofi Girl、BigFM LoFi Focus |
| 古典 Classical | 28 | Classic FM、WQXR、KlassikRadio 全系、Radio Swiss Classic |
| 爵士与灵魂 Jazz & Soul | 13 | Jazz24、TSF Jazz、Sublime、Seven Inch Soul |
| 电子与舞曲 Electronic & Dance | 23 | Defcon、DubStep Beyond、FG Radio、Frisky、PulsRadio |
| 摇滚与流行 Rock, Indie & Pop | 38 | KEXP、KINK、Radio Paradise、VRT StuBru、80s80s |
| 公共广播 Public Radio | 14 | WNYC、RadioEins、NPO 全系、Deutschlandfunk Kultur |
| 民谣与世界 Folk & World | 10 | Boot Liquor、Thistle Radio、Bossa Beyond、Radio Paradise 世界音乐 |

全部是公开的、可直接访问的 ICEcast / SHOUTcast 直播流地址，逐条实测过能连上。

## 怎么加一台 / Adding a station

`index.js` 的 `STATIONS` 数组，一行一个：

```js
{ id: "sabc123", name: "台名", url: "https://example.com/live.mp3", type: "mp3", cat: "lofi" },
```

- `id` 只是这台的钥匙，随便起，别和别的重复。没给它配 `covers/<id>.jpg` 也能跑，卡片会显示一个电台图标
- `type` 是 `mp3` 或 `aac`。写错了也不要紧，App 会按流的前几个字节自己认格式；这个字段主要给下载器和画质标记看
- `cat` 取 `lofi` / `classical` / `jazz` / `electronic` / `rock` / `public` / `world`
- 名字用中文没问题，界面里直接显示
- 可选 `alts`：这台的备用地址数组，`[地址, 类型]` 成对；`slim` 是「从第几个开始算轻量流」的下标。不给也行，就只有一个地址

想加一条备用地址（同一频道换个机房）：

```js
{
  id: "s9063a7", name: "Chillhop慵懒", url: "https://ice3.somafm.com/groovesalad-128-mp3", type: "mp3", cat: "lofi",
  alts: [["https://ice3.somafm.com/groovesalad-128-mp3", "mp3"], ["https://ice5.somafm.com/groovesalad-128-mp3", "mp3"]],
  slim: 2,
}
```

改完不用重装：在设置里把插件关掉再打开，或者重启 App。

## 为什么是「一条流」而不是「一堆歌」

App 的电台模型是 `stationNext` 反复给曲目。这里每次只给**一条没有时长的流**：
流断了（换网络、服务器踢人）App 会再来要一次，于是重新连上——在你听来就是「一直在播」。
每次给的曲目 id 都带序号，所以重连算新的一首，不会和上一首撞在一起。

## 网络不稳的时候

App 拉流是「边下边播」：没有预缓冲，读到错误这一次就结束，然后回头再要一次。
所以插件能调的地方只有「下一次给你哪个地址」。这里做了三件事：

1. **每台用实测最快的机房**。同一频道在各机房都测了首字节时间，取最快的那条当默认地址。51 台有两个以上可换的地址。
2. **断了就换地方**。如果这次要流距上次不到 25 秒——说明上一轮刚连上就废了，跟地址的关系比跟台的关系大——下一次请求就换到备用机房。间隔超过 25 秒才算正常收听，会回到最快的那个机房。
3. **连续三次很快断，就降到更轻的流**。这是给链路实在撑不住时留的后路。目前只有 2 台有低码率版（Radio Paradise、SmoothJazz）。

SomaFM 的 64k / 32k 是 **AAC-HE**（aacPlus），这个 App 的解码器只认 AAC-LC，拿来当备用流只会更糟，
所以它的备用地址只用同码率的 MP3、换机房，不降码率。

要是这样还断，就不是插件能解决的了：那是到境外的链路本身在抖，换台、或者给系统挂个代理才会真的变好。

## 已知限制

1. **看不到节目名**。流的 ICY 元数据里有「正在播什么」，但 App 不解析，所以标题只能显示电台名，下面一行是分类。
2. **进度条没有意义**。直播流没有总长，界面显示 `0:00`。**别拖进度条**——拖动会把解码位置落到已缓冲的数据开头附近，等于把刚才那段重听一遍。
3. **听得越久占得越多**。App 的下载器是按「有头有尾的曲目」设计的，直播流会一直往内存和缓存临时文件里写。换台或停止就释放，单次别连着听太久就行。
4. **只吃 AAC-LC**。HE-AAC（`audio/aacp`）解码器会直接拒掉。
5. **要能连外网**。这些台基本都在境外，网络不通就会卡在「Buffering…」。

## 封面

每台一张 400×400 的封面，和插件一起打包在 `covers/` 里，**不依赖网络**：

- 官方频道图：SomaFM 各频道、以及各台官网上能找到的品牌图
- 文字封面：找不到公开品牌图的台，按所属分类的配色做的文字封面，同一套设计语言

同一个品牌下有多个频道的（KlassikRadio 十几台、Radio Paradise 六台、VRT 几台），
只留一张品牌 logo，其余做成以**频道名**为主视觉的封面——否则那一排会变成十几张一模一样的图。

想换某台的封面：把 `covers/<id>.jpg` 换成你自己的图即可，文件名不用改，方形、400×400 最好。

> 封面仅用于在播放器里区分电台，版权归各电台所有。

## 文件

```
mygo-radio/
├── plugin.json        清单：id、名称、导航、权限（空的，插件自己不发网络请求）
├── index.js           电台数据 + 五个导出：stations / stationNext / stream / home / browse
├── covers/            161 张 400×400 封面，文件名就是电台的 id
├── locales/
│   └── zh-CN.json     界面中文
├── LICENSE
└── README.md
```

插件本身不联网抓任何东西——音频地址由插件给出、App 自己去取，所以 `permissions` 是空的，
安装时不会出现网络或进程之类的提示。

## License

MIT © 2026 eutleek
