// Network Radio — a MyGo Music plugin.
//
// Each station is one live stream: there are no tracks to list, and the app
// keeps the sound going by asking for the station again when the stream ends,
// which is what a dropped connection looks like from here.
//
// Add a station by appending one line to STATIONS below: a name, the stream's
// URL, mp3 or aac, and a category key from CATS.

// What each station is: a category key, and what to call it.
const CATS = [
  { key: "lofi", title: "Lo-Fi & Ambient" },
  { key: "classical", title: "Classical" },
  { key: "jazz", title: "Jazz & Soul" },
  { key: "electronic", title: "Electronic & Dance" },
  { key: "rock", title: "Rock, Indie & Pop" },
  { key: "public", title: "Public Radio" },
  { key: "world", title: "Folk & World" },
];

const CATS_BY_KEY = {};
for (let i = 0; i < CATS.length; i++) CATS_BY_KEY[CATS[i].key] = CATS[i];

const STATIONS = [
  { id: "s9063a7", name: "Chillhop慵懒", url: "https://ice3.somafm.com/groovesalad-128-mp3", type: "mp3", cat: "lofi", alts: [["https://ice3.somafm.com/groovesalad-128-mp3", "mp3"], ["https://ice5.somafm.com/groovesalad-128-mp3", "mp3"], ["https://ice6.somafm.com/groovesalad-128-mp3", "mp3"]], slim: 3 },
  { id: "s1gbl6o4", name: "Lush氛围女声", url: "https://ice4.somafm.com/lush-128-mp3", type: "mp3", cat: "lofi", alts: [["https://ice4.somafm.com/lush-128-mp3", "mp3"], ["https://ice3.somafm.com/lush-128-mp3", "mp3"], ["https://ice6.somafm.com/lush-128-mp3", "mp3"]], slim: 3 },
  { id: "s1hwg1b8", name: "Chillhop经典", url: "https://ice5.somafm.com/gsclassic-128-mp3", type: "mp3", cat: "lofi", alts: [["https://ice5.somafm.com/gsclassic-128-mp3", "mp3"], ["https://ice2.somafm.com/gsclassic-128-mp3", "mp3"], ["https://ice6.somafm.com/gsclassic-128-mp3", "mp3"]], slim: 3 },
  { id: "s15yil3w", name: "Ambient氛围", url: "https://ice5.somafm.com/dronezone-128-mp3", type: "mp3", cat: "lofi", alts: [["https://ice5.somafm.com/dronezone-128-mp3", "mp3"], ["https://ice2.somafm.com/dronezone-128-mp3", "mp3"], ["https://ice3.somafm.com/dronezone-128-mp3", "mp3"]], slim: 3 },
  { id: "s1w6vc7o", name: "DeepSpace深空", url: "https://ice6.somafm.com/deepspaceone-128-mp3", type: "mp3", cat: "lofi", alts: [["https://ice6.somafm.com/deepspaceone-128-mp3", "mp3"], ["https://ice2.somafm.com/deepspaceone-128-mp3", "mp3"], ["https://ice1.somafm.com/deepspaceone-128-mp3", "mp3"]], slim: 3 },
  { id: "sfoa5di", name: "SpaceStation空间站", url: "https://ice4.somafm.com/spacestation-128-mp3", type: "mp3", cat: "lofi", alts: [["https://ice4.somafm.com/spacestation-128-mp3", "mp3"], ["https://ice2.somafm.com/spacestation-128-mp3", "mp3"], ["https://ice1.somafm.com/spacestation-128-mp3", "mp3"]], slim: 3 },
  { id: "s4ls2tc", name: "Beat深屋节拍", url: "https://ice2.somafm.com/beatblender-128-mp3", type: "mp3", cat: "electronic", alts: [["https://ice2.somafm.com/beatblender-128-mp3", "mp3"], ["https://ice3.somafm.com/beatblender-128-mp3", "mp3"], ["https://ice4.somafm.com/beatblender-128-mp3", "mp3"]], slim: 3 },
  { id: "s1826j8d", name: "Secret间谍风", url: "https://ice6.somafm.com/secretagent-128-mp3", type: "mp3", cat: "lofi", alts: [["https://ice6.somafm.com/secretagent-128-mp3", "mp3"], ["https://ice4.somafm.com/secretagent-128-mp3", "mp3"], ["https://ice5.somafm.com/secretagent-128-mp3", "mp3"]], slim: 3 },
  { id: "swlprj7", name: "LofiGirl洛菲女孩", url: "https://play.streamafrica.net/lofiradio", type: "mp3", cat: "lofi" },
  { id: "swrbvtj", name: "ChillhopMusic奇乐嘻哈", url: "https://streams.ilovemusic.de/iloveradio17.mp3", type: "mp3", cat: "lofi" },
  { id: "sqg0ppz", name: "DefCon黑客防御", url: "https://ice2.somafm.com/defcon-128-mp3", type: "mp3", cat: "electronic", alts: [["https://ice2.somafm.com/defcon-128-mp3", "mp3"], ["https://ice3.somafm.com/defcon-128-mp3", "mp3"], ["https://ice5.somafm.com/defcon-128-mp3", "mp3"]], slim: 3 },
  { id: "s18lpz88", name: "BootLiquor酒靴乡村", url: "https://ice2.somafm.com/bootliquor-128-mp3", type: "mp3", cat: "world", alts: [["https://ice2.somafm.com/bootliquor-128-mp3", "mp3"], ["https://ice5.somafm.com/bootliquor-128-mp3", "mp3"], ["https://ice6.somafm.com/bootliquor-128-mp3", "mp3"]], slim: 3 },
  { id: "s1b8ofiy", name: "Covers翻唱精选", url: "https://ice4.somafm.com/covers-128-mp3", type: "mp3", cat: "rock", alts: [["https://ice4.somafm.com/covers-128-mp3", "mp3"], ["https://ice2.somafm.com/covers-128-mp3", "mp3"], ["https://ice1.somafm.com/covers-128-mp3", "mp3"]], slim: 3 },
  { id: "s1p9m98r", name: "MissionControl任务控制", url: "https://ice3.somafm.com/missioncontrol-128-mp3", type: "mp3", cat: "lofi", alts: [["https://ice3.somafm.com/missioncontrol-128-mp3", "mp3"], ["https://ice5.somafm.com/missioncontrol-128-mp3", "mp3"], ["https://ice4.somafm.com/missioncontrol-128-mp3", "mp3"]], slim: 3 },
  { id: "s1vnj0ut", name: "SonicUniverse音速宇宙", url: "https://ice6.somafm.com/sonicuniverse-128-mp3", type: "mp3", cat: "electronic", alts: [["https://ice6.somafm.com/sonicuniverse-128-mp3", "mp3"], ["https://ice4.somafm.com/sonicuniverse-128-mp3", "mp3"], ["https://ice2.somafm.com/sonicuniverse-128-mp3", "mp3"]], slim: 3 },
  { id: "s3owz54", name: "TheTrip迷幻旅程", url: "https://ice2.somafm.com/thetrip-128-mp3", type: "mp3", cat: "electronic", alts: [["https://ice2.somafm.com/thetrip-128-mp3", "mp3"], ["https://ice6.somafm.com/thetrip-128-mp3", "mp3"], ["https://ice3.somafm.com/thetrip-128-mp3", "mp3"]], slim: 3 },
  { id: "s18kdd20", name: "Underground80s地下80年代", url: "https://ice2.somafm.com/u80s-128-mp3", type: "mp3", cat: "rock", alts: [["https://ice2.somafm.com/u80s-128-mp3", "mp3"], ["https://ice4.somafm.com/u80s-128-mp3", "mp3"], ["https://ice5.somafm.com/u80s-128-mp3", "mp3"]], slim: 3 },
  { id: "szkdk3m", name: "Digitalis洋地黄迷幻", url: "https://ice5.somafm.com/digitalis-128-mp3", type: "mp3", cat: "electronic", alts: [["https://ice5.somafm.com/digitalis-128-mp3", "mp3"], ["https://ice2.somafm.com/digitalis-128-mp3", "mp3"], ["https://ice6.somafm.com/digitalis-128-mp3", "mp3"]], slim: 3 },
  { id: "sgtnqma", name: "SevenInchSoul七寸灵魂", url: "https://ice2.somafm.com/7soul-128-mp3", type: "mp3", cat: "jazz", alts: [["https://ice2.somafm.com/7soul-128-mp3", "mp3"], ["https://ice3.somafm.com/7soul-128-mp3", "mp3"], ["https://ice4.somafm.com/7soul-128-mp3", "mp3"]], slim: 3 },
  { id: "s12ni4mu", name: "Vaporwaves蒸汽波", url: "https://ice5.somafm.com/vaporwaves-128-mp3", type: "mp3", cat: "electronic", alts: [["https://ice5.somafm.com/vaporwaves-128-mp3", "mp3"], ["https://ice4.somafm.com/vaporwaves-128-mp3", "mp3"], ["https://ice3.somafm.com/vaporwaves-128-mp3", "mp3"]], slim: 3 },
  { id: "s1ofoktc", name: "BossaBeyond波萨诺瓦", url: "https://ice4.somafm.com/bossa-128-mp3", type: "mp3", cat: "world", alts: [["https://ice4.somafm.com/bossa-128-mp3", "mp3"], ["https://ice3.somafm.com/bossa-128-mp3", "mp3"], ["https://ice6.somafm.com/bossa-128-mp3", "mp3"]], slim: 3 },
  { id: "s7c9gy0", name: "TikiTime提基时光", url: "https://ice5.somafm.com/tikitime-128-mp3", type: "mp3", cat: "world", alts: [["https://ice5.somafm.com/tikitime-128-mp3", "mp3"], ["https://ice6.somafm.com/tikitime-128-mp3", "mp3"], ["https://ice3.somafm.com/tikitime-128-mp3", "mp3"]], slim: 3 },
  { id: "s6bndbj", name: "FluxFM流动奇乐", url: "https://streams.fluxfm.de/Chillhop/mp3-128", type: "mp3", cat: "lofi" },
  { id: "s1m0ej64", name: "HotmixMotown热混音城", url: "https://streaming.hotmixradio.fr/hotmix-motown-en-mp3", type: "mp3", cat: "rock" },
  { id: "s6nayel", name: "OuiFM法国独立", url: "https://ouifm.ice.infomaniak.ch/ouifm-high.mp3", type: "mp3", cat: "rock" },
  { id: "sdccfq3", name: "HotmixMovies热混影视", url: "https://streaming.hotmixradio.fr/hotmix-movies-en-mp3", type: "mp3", cat: "rock" },
  { id: "s1ifyd8c", name: "Fluid流体碎拍", url: "https://ice4.somafm.com/fluid-128-mp3", type: "mp3", cat: "electronic", alts: [["https://ice4.somafm.com/fluid-128-mp3", "mp3"], ["https://ice2.somafm.com/fluid-128-mp3", "mp3"], ["https://ice1.somafm.com/fluid-128-mp3", "mp3"]], slim: 3 },
  { id: "scylu8q", name: "SuburbsOfGoa果阿郊区", url: "https://ice2.somafm.com/suburbsofgoa-128-mp3", type: "mp3", cat: "world", alts: [["https://ice2.somafm.com/suburbsofgoa-128-mp3", "mp3"], ["https://ice4.somafm.com/suburbsofgoa-128-mp3", "mp3"], ["https://ice6.somafm.com/suburbsofgoa-128-mp3", "mp3"]], slim: 3 },
  { id: "sd4vvj9", name: "ThistleRadio蓟花民谣", url: "https://ice6.somafm.com/thistle-128-mp3", type: "mp3", cat: "world", alts: [["https://ice6.somafm.com/thistle-128-mp3", "mp3"], ["https://ice2.somafm.com/thistle-128-mp3", "mp3"], ["https://ice3.somafm.com/thistle-128-mp3", "mp3"]], slim: 3 },
  { id: "s3e6u76", name: "SmoothChill平滑放松", url: "https://streams.fluxfm.de/SmoothChill/mp3-128", type: "mp3", cat: "lofi" },
  { id: "s1x7j7xo", name: "ClassicFM经典调频", url: "https://icecast.thisisdax.com/ClassicFMMP3", type: "mp3", cat: "classical" },
  { id: "sfs456o", name: "FriskyDeep欢跃深度", url: "https://stream.friskyradio.com/frisky_deep.mp3", type: "mp3", cat: "electronic" },
  { id: "s1wedsm8", name: "IndiePop独立流行", url: "https://ice1.somafm.com/indiepop-128-mp3", type: "mp3", cat: "rock", alts: [["https://ice1.somafm.com/indiepop-128-mp3", "mp3"], ["https://ice2.somafm.com/indiepop-128-mp3", "mp3"], ["https://ice5.somafm.com/indiepop-128-mp3", "mp3"]], slim: 3 },
  { id: "s15zv76j", name: "MetalDetector金属探测", url: "https://ice3.somafm.com/metal-128-mp3", type: "mp3", cat: "rock", alts: [["https://ice3.somafm.com/metal-128-mp3", "mp3"], ["https://ice2.somafm.com/metal-128-mp3", "mp3"], ["https://ice4.somafm.com/metal-128-mp3", "mp3"]], slim: 3 },
  { id: "snjrnwv", name: "BlackRock黑岩", url: "https://ice4.somafm.com/brfm-128-mp3", type: "mp3", cat: "rock", alts: [["https://ice4.somafm.com/brfm-128-mp3", "mp3"], ["https://ice2.somafm.com/brfm-128-mp3", "mp3"], ["https://ice6.somafm.com/brfm-128-mp3", "mp3"]], slim: 3 },
  { id: "s1euznh6", name: "PopTron流行电子", url: "https://ice3.somafm.com/poptron-128-mp3", type: "mp3", cat: "electronic", alts: [["https://ice3.somafm.com/poptron-128-mp3", "mp3"], ["https://ice2.somafm.com/poptron-128-mp3", "mp3"], ["https://ice4.somafm.com/poptron-128-mp3", "mp3"]], slim: 3 },
  { id: "s1aqfwh4", name: "SF1033旧金山地下", url: "https://ice4.somafm.com/sf1033-128-mp3", type: "mp3", cat: "electronic", alts: [["https://ice4.somafm.com/sf1033-128-mp3", "mp3"], ["https://ice6.somafm.com/sf1033-128-mp3", "mp3"], ["https://ice3.somafm.com/sf1033-128-mp3", "mp3"]], slim: 3 },
  { id: "s1csa01k", name: "Cliqhop智能舞曲", url: "https://ice2.somafm.com/cliqhop-128-mp3", type: "mp3", cat: "electronic", alts: [["https://ice2.somafm.com/cliqhop-128-mp3", "mp3"], ["https://ice6.somafm.com/cliqhop-128-mp3", "mp3"], ["https://ice3.somafm.com/cliqhop-128-mp3", "mp3"]], slim: 3 },
  { id: "s1enxc7z", name: "DubStepBeyond低音回响", url: "https://ice2.somafm.com/dubstep-128-mp3", type: "mp3", cat: "electronic", alts: [["https://ice2.somafm.com/dubstep-128-mp3", "mp3"], ["https://ice4.somafm.com/dubstep-128-mp3", "mp3"], ["https://ice6.somafm.com/dubstep-128-mp3", "mp3"]], slim: 3 },
  { id: "s1ydlq08", name: "TheInSound复古欧陆", url: "https://ice2.somafm.com/insound-128-mp3", type: "mp3", cat: "rock", alts: [["https://ice2.somafm.com/insound-128-mp3", "mp3"], ["https://ice5.somafm.com/insound-128-mp3", "mp3"], ["https://ice1.somafm.com/insound-128-mp3", "mp3"]], slim: 3 },
  { id: "s1pcjkqk", name: "N5MD现代实验", url: "https://ice2.somafm.com/n5md-128-mp3", type: "mp3", cat: "electronic", alts: [["https://ice2.somafm.com/n5md-128-mp3", "mp3"], ["https://ice1.somafm.com/n5md-128-mp3", "mp3"], ["https://ice4.somafm.com/n5md-128-mp3", "mp3"]], slim: 3 },
  { id: "s1dd8v6o", name: "Doomed暗黑氛围", url: "https://ice1.somafm.com/doomed-128-mp3", type: "mp3", cat: "lofi", alts: [["https://ice1.somafm.com/doomed-128-mp3", "mp3"], ["https://ice4.somafm.com/doomed-128-mp3", "mp3"], ["https://ice6.somafm.com/doomed-128-mp3", "mp3"]], slim: 3 },
  { id: "s579zt0", name: "Chillits露营氛围", url: "https://ice5.somafm.com/chillits-128-mp3", type: "mp3", cat: "lofi", alts: [["https://ice5.somafm.com/chillits-128-mp3", "mp3"], ["https://ice2.somafm.com/chillits-128-mp3", "mp3"], ["https://ice1.somafm.com/chillits-128-mp3", "mp3"]], slim: 3 },
  { id: "sp7rhp8", name: "SomaFM特别节目", url: "https://ice2.somafm.com/specials-128-mp3", type: "mp3", cat: "public", alts: [["https://ice2.somafm.com/specials-128-mp3", "mp3"], ["https://ice1.somafm.com/specials-128-mp3", "mp3"], ["https://ice3.somafm.com/specials-128-mp3", "mp3"]], slim: 3 },
  { id: "sbwfhaw", name: "SomaFM现场", url: "https://ice4.somafm.com/live-128-mp3", type: "mp3", cat: "public", alts: [["https://ice4.somafm.com/live-128-mp3", "mp3"], ["https://ice2.somafm.com/live-128-mp3", "mp3"], ["https://ice5.somafm.com/live-128-mp3", "mp3"]], slim: 3 },
  { id: "s1igz2va", name: "TheDarkZone深暗氛围", url: "https://ice3.somafm.com/darkzone-128-mp3", type: "mp3", cat: "lofi", alts: [["https://ice3.somafm.com/darkzone-128-mp3", "mp3"], ["https://ice2.somafm.com/darkzone-128-mp3", "mp3"], ["https://ice6.somafm.com/darkzone-128-mp3", "mp3"]], slim: 3 },
  { id: "s1yo72hj", name: "REYFM洛菲", url: "https://listen.reyfm.de/lofi_64kbps.mp3", type: "aac", cat: "lofi" },
  { id: "sucfdny", name: "Chillofi卡洛佐", url: "https://streams.dez.ovh/listen/chillofi/radio.mp3", type: "mp3", cat: "lofi" },
  { id: "s2rq1d5", name: "BigFM2000s年代", url: "https://stream.bigfm.de/2000er/mp3-128/stream.bigfm.de/", type: "mp3", cat: "rock" },
  { id: "s1yleivh", name: "BigFM嘻哈", url: "https://stream.bigfm.de/hiphop/aac-128/stream.bigfm.de/", type: "aac", cat: "rock" },
  { id: "sypbnj7", name: "RadioParadise主频道", url: "https://stream.radioparadise.com/mp3-128", type: "mp3", cat: "rock" },
  { id: "s1vp1rj", name: "RadioParadise世界音乐", url: "https://stream.radioparadise.com/world-192", type: "mp3", cat: "world", alts: [["https://stream.radioparadise.com/world-192", "mp3"], ["https://stream.radioparadise.com/world-128", "aac"]], slim: 2 },
  { id: "s1a3avrz", name: "KUSC古典", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/KUSCMP128.mp3", type: "mp3", cat: "classical" },
  { id: "s1kzjxzk", name: "WNYC纽约公共", url: "https://fm939.wnyc.org/wnycfm", type: "mp3", cat: "public" },
  { id: "siukdub", name: "WQXR古典", url: "https://stream.wqxr.org/wqxr", type: "mp3", cat: "classical" },
  { id: "s1ct2whq", name: "WXPN独立摇滚", url: "https://wxpnhi.xpn.org/xpnhi", type: "mp3", cat: "rock" },
  { id: "s12iljj8", name: "KNKX爵士公共", url: "https://knkx-live-a.edge.audiocdn.com/6284_128k", type: "mp3", cat: "jazz" },
  { id: "s135wclh", name: "Jazz24爵士", url: "https://knkx-live-a.edge.audiocdn.com/6285_128k", type: "mp3", cat: "jazz" },
  { id: "smq2njt", name: "WCPE古典", url: "https://audio-mp3.ibiblio.org/wcpe.mp3", type: "mp3", cat: "classical" },
  { id: "s8t0v1m", name: "WDAV古典", url: "https://audio-mp3.ibiblio.org/wdav-112k", type: "mp3", cat: "classical" },
  { id: "s11qvwcy", name: "SmoothUK英国舒缓", url: "https://media-ice.musicradio.com/SmoothUKMP3", type: "mp3", cat: "lofi" },
  { id: "s1gbjlv6", name: "NPORadio2荷兰二台", url: "https://icecast.omroep.nl/radio2-bb-mp3", type: "mp3", cat: "public" },
  { id: "s1f4tguv", name: "NPO3FM荷兰三台", url: "https://icecast.omroep.nl/3fm-bb-mp3", type: "mp3", cat: "rock" },
  { id: "s15d4shg", name: "NPOKlassiek荷兰古典", url: "https://icecast.omroep.nl/radio4-bb-mp3", type: "mp3", cat: "classical" },
  { id: "szvxdsl", name: "NPORadio5荷兰五台", url: "https://icecast.omroep.nl/radio5-bb-mp3", type: "mp3", cat: "public" },
  { id: "senp84e", name: "KINK另类摇滚", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/KINK.mp3", type: "mp3", cat: "rock" },
  { id: "s1l4jb42", name: "Sublime灵魂爵士", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/SUBLIME.mp3", type: "mp3", cat: "jazz" },
  { id: "s1hfmhcv", name: "StudioBrussel布鲁塞尔", url: "https://icecast.vrtcdn.be/stubru-high.mp3", type: "mp3", cat: "rock" },
  { id: "s111fced", name: "TSFJazz爵士", url: "https://tsfjazz.ice.infomaniak.ch/tsfjazz-high.mp3", type: "mp3", cat: "jazz" },
  { id: "sqawqh5", name: "JazzRadioFrance法国爵士", url: "https://jazzradio.ice.infomaniak.ch/jazzradio-high.mp3", type: "mp3", cat: "jazz" },
  { id: "s1mgvc10", name: "RadioMeuh梅乌", url: "https://radiomeuh.ice.infomaniak.ch/radiomeuh-128.mp3", type: "mp3", cat: "electronic" },
  { id: "s18s32jb", name: "FGRadio电子", url: "https://radiofg.impek.com/fg.mp3", type: "mp3", cat: "electronic" },
  { id: "s1uaqlqc", name: "NostalgieFrance怀旧", url: "https://scdn.nrjaudio.fm/fr/30001/mp3_128.mp3", type: "mp3", cat: "rock" },
  { id: "s1iwybau", name: "DeutschlandfunkKultur文化", url: "https://st01.sslstream.dlf.de/dlf/01/128/mp3/stream.mp3", type: "mp3", cat: "public" },
  { id: "s1dstj8u", name: "FluxFM另类", url: "https://streams.fluxfm.de/FluxFM/mp3-128", type: "mp3", cat: "rock" },
  { id: "s1qynmf", name: "FluxFM80年代", url: "https://streams.fluxfm.de/80s/mp3-128", type: "mp3", cat: "rock" },
  { id: "sgatrs6", name: "FluxFMX频道", url: "https://streams.fluxfm.de/FluxFMX/mp3-128", type: "mp3", cat: "rock" },
  { id: "s1hlt454", name: "FluxFM柏林", url: "https://streams.fluxfm.de/berlin/mp3-128", type: "mp3", cat: "rock" },
  { id: "s1omd3lg", name: "RadioEins柏林一台", url: "https://radioeins.de/livemp3", type: "mp3", cat: "public" },
  { id: "s132w2x3", name: "RadioSwissJazz瑞士爵士", url: "https://stream.srg-ssr.ch/m/rsj/mp3_128", type: "mp3", cat: "jazz" },
  { id: "s1dhyabs", name: "RadioSwissClassic瑞士古典", url: "https://stream.srg-ssr.ch/m/rsc_de/mp3_128", type: "mp3", cat: "classical" },
  { id: "s16p7gxo", name: "RadioSwissClassic2瑞士古典二台", url: "https://stream.srg-ssr.ch/m/rsc_it/mp3_128", type: "mp3", cat: "classical" },
  { id: "sjwu3t9", name: "RadioSwissPop瑞士流行", url: "https://stream.srg-ssr.ch/m/rsp/mp3_128", type: "mp3", cat: "rock" },
  { id: "s16o8zad", name: "Klara古典艺术台", url: "https://icecast.vrtcdn.be/klara-high.mp3", type: "mp3", cat: "classical" },
  { id: "sajeuyi", name: "VRTRadio1一台", url: "https://icecast.vrtcdn.be/radio1-high.mp3", type: "mp3", cat: "public" },
  { id: "s1lsr0k1", name: "NPORadio1Music音乐台", url: "https://icecast.omroep.nl/radio1-bb-mp3", type: "mp3", cat: "public" },
  { id: "sju1s2f", name: "80s80s德国八十年代", url: "https://streams.80s80s.de/web/mp3-192/streams.80s80s.de/", type: "mp3", cat: "rock" },
  { id: "s14zxvju", name: "BigFMLoFiFocus专注", url: "https://stream.bigfm.de/lofifocus/mp3-128/stream.bigfm.de/", type: "mp3", cat: "lofi" },
  { id: "s1imvke4", name: "BigFMSunsetLounge日落酒廊", url: "https://stream.bigfm.de/sunsetlounge/mp3-128/stream.bigfm.de/", type: "aac", cat: "lofi" },
  { id: "s68x149", name: "BigFMReggaeVibes雷鬼", url: "https://stream.bigfm.de/reggaevibes/aac-128/stream.bigfm.de/", type: "aac", cat: "world" },
  { id: "snvc6xg", name: "FluxFMChillhopAAC奇乐嘻哈", url: "https://channels.fluxfm.de/chillhop/externalembedflxhp/stream.aac", type: "aac", cat: "lofi" },
  { id: "s8bsy6x", name: "KEXP西雅图独立音乐", url: "https://kexp.streamguys1.com/kexp160.aac", type: "aac", cat: "rock" },
  { id: "s1mwtwjq", name: "NIALoFi洛菲", url: "https://radio.nia.nc/radio/8020/lofi-hq-stream.aac", type: "aac", cat: "lofi" },
  { id: "s1mtuyaq", name: "CapitalChill伦敦舒缓", url: "https://media-ice.musicradio.com/CapitalChillMP3", type: "mp3", cat: "lofi" },
  { id: "s1h6youu", name: "RadioParadise舒缓", url: "https://stream.radioparadise.com/mellow-128", type: "aac", cat: "lofi" },
  { id: "s1mkz2gm", name: "RadioParadise摇滚", url: "https://stream.radioparadise.com/rock-128", type: "aac", cat: "rock" },
  { id: "s12jqlmt", name: "RadioParadise320AAC高音质", url: "https://stream.radioparadise.com/aac-320", type: "aac", cat: "rock", alts: [["https://stream.radioparadise.com/aac-320", "aac"], ["https://stream.radioparadise.com/aac-128", "aac"]], slim: 2 },
  { id: "s12jqjyj", name: "RadioParadise128AAC", url: "https://stream.radioparadise.com/aac-128", type: "aac", cat: "rock" },
  { id: "s126kc2b", name: "Synphaera星界氛围", url: "https://ice1.somafm.com/synphaera-128-mp3", type: "mp3", cat: "lofi", alts: [["https://ice1.somafm.com/synphaera-128-mp3", "mp3"], ["https://ice5.somafm.com/synphaera-128-mp3", "mp3"], ["https://ice4.somafm.com/synphaera-128-mp3", "mp3"]], slim: 3 },
  { id: "s1dwszem", name: "LeftCoast70s西岸七十年代", url: "https://ice1.somafm.com/seventies-128-mp3", type: "mp3", cat: "rock", alts: [["https://ice1.somafm.com/seventies-128-mp3", "mp3"], ["https://ice5.somafm.com/seventies-128-mp3", "mp3"], ["https://ice3.somafm.com/seventies-128-mp3", "mp3"]], slim: 3 },
  { id: "s1yzu0wo", name: "DroneZone2氛围二台", url: "https://ice6.somafm.com/dz2-128-mp3", type: "mp3", cat: "lofi", alts: [["https://ice6.somafm.com/dz2-128-mp3", "mp3"], ["https://ice3.somafm.com/dz2-128-mp3", "mp3"], ["https://ice4.somafm.com/dz2-128-mp3", "mp3"]], slim: 3 },
  { id: "s1dtyhsl", name: "FolkForward民谣前行", url: "https://ice2.somafm.com/folkfwd-128-mp3", type: "mp3", cat: "world", alts: [["https://ice2.somafm.com/folkfwd-128-mp3", "mp3"], ["https://ice3.somafm.com/folkfwd-128-mp3", "mp3"], ["https://ice1.somafm.com/folkfwd-128-mp3", "mp3"]], slim: 3 },
  { id: "s0t2xgg", name: "IllinoisStreetLounge伊利诺伊酒廊", url: "https://ice4.somafm.com/illstreet-128-mp3", type: "mp3", cat: "lofi", alts: [["https://ice4.somafm.com/illstreet-128-mp3", "mp3"], ["https://ice5.somafm.com/illstreet-128-mp3", "mp3"], ["https://ice6.somafm.com/illstreet-128-mp3", "mp3"]], slim: 3 },
  { id: "sw9kbep", name: "GrooveSalad256高音质", url: "https://ice4.somafm.com/groovesalad-128-mp3", type: "mp3", cat: "lofi", alts: [["https://ice4.somafm.com/groovesalad-128-mp3", "mp3"], ["https://ice2.somafm.com/groovesalad-128-mp3", "mp3"], ["https://ice3.somafm.com/groovesalad-128-mp3", "mp3"]], slim: 3 },
  { id: "s1vtrl6i", name: "Underground80s256高音质", url: "https://ice5.somafm.com/u80s-128-mp3", type: "mp3", cat: "rock", alts: [["https://ice5.somafm.com/u80s-128-mp3", "mp3"], ["https://ice2.somafm.com/u80s-128-mp3", "mp3"], ["https://ice5.somafm.com/u80s-256-mp3", "mp3"]], slim: 3 },
  { id: "slfuv20", name: "LeftCoast70s320高音质", url: "https://ice5.somafm.com/seventies-320-mp3", type: "mp3", cat: "rock" },
  { id: "s1m8g300", name: "SpaceStation320高音质", url: "https://ice5.somafm.com/spacestation-320-mp3", type: "mp3", cat: "lofi" },
  { id: "scnyqyq", name: "BossaBeyond256高音质", url: "https://ice6.somafm.com/bossa-128-mp3", type: "mp3", cat: "world", alts: [["https://ice6.somafm.com/bossa-128-mp3", "mp3"], ["https://ice4.somafm.com/bossa-128-mp3", "mp3"], ["https://ice3.somafm.com/bossa-128-mp3", "mp3"]], slim: 3 },
  { id: "s1mtrs84", name: "Digitalis256高音质", url: "https://ice4.somafm.com/digitalis-128-mp3", type: "mp3", cat: "electronic", alts: [["https://ice4.somafm.com/digitalis-128-mp3", "mp3"], ["https://ice5.somafm.com/digitalis-128-mp3", "mp3"], ["https://ice2.somafm.com/digitalis-128-mp3", "mp3"]], slim: 3 },
  { id: "s1dpexuh", name: "DEFCON256高音质", url: "https://ice5.somafm.com/defcon-256-mp3", type: "mp3", cat: "electronic", alts: [["https://ice5.somafm.com/defcon-256-mp3", "mp3"], ["https://ice5.somafm.com/defcon-128-mp3", "mp3"], ["https://ice1.somafm.com/defcon-128-mp3", "mp3"]], slim: 3 },
  { id: "syf8s5n", name: "WFUV福特汉姆大学台", url: "https://music.wfuv.org/music-hi", type: "mp3", cat: "public" },
  { id: "soq88ye", name: "KUT奥斯汀公共电台", url: "https://streams.kut.org/5020_192.mp3", type: "mp3", cat: "public" },
  { id: "s5fxgbg", name: "WRSU罗格斯大学台", url: "https://wrsu-libstrm.radioca.st/stream", type: "aac", cat: "public" },
  { id: "s1hwsdc8", name: "KUAF爵士台", url: "https://war.streamguys1.com:7031/kuaf3", type: "mp3", cat: "jazz" },
  { id: "s14fpekc", name: "威尼斯古典一台", url: "https://uk2.streamingpulse.com/ssl/vcr1", type: "mp3", cat: "classical" },
  { id: "s14fpekd", name: "威尼斯古典二台", url: "https://uk2.streamingpulse.com/ssl/vcr2", type: "mp3", cat: "classical" },
  { id: "svq6v58", name: "SmoothJazzHouse深屋爵士", url: "https://smoothjazz.cdnstream1.com/2586_320.mp3", type: "mp3", cat: "jazz", alts: [["https://smoothjazz.cdnstream1.com/2586_320.mp3", "mp3"], ["https://smoothjazz.cdnstream1.com/2586_128.mp3", "mp3"]], slim: 1 },
  { id: "s1yfr7zf", name: "SmoothJazzGlobal环球爵士", url: "https://smoothjazz.cdnstream1.com/2585_320.mp3", type: "mp3", cat: "jazz", alts: [["https://smoothjazz.cdnstream1.com/2585_320.mp3", "mp3"], ["https://smoothjazz.cdnstream1.com/2585_128.mp3", "mp3"]], slim: 1 },
  { id: "s11pvvsv", name: "RadioSwissPopAAC瑞士流行", url: "https://livestreaming-node-4.srg-ssr.ch/srgssr/rsp/aac/96", type: "aac", cat: "rock" },
  { id: "s7zgvy0", name: "RadioSwissClassicAAC瑞士古典", url: "https://livestreaming-node-2.srg-ssr.ch/srgssr/rsc_de/aac/96", type: "aac", cat: "classical" },
  { id: "s1yl4by1", name: "RadioSwissJazzAAC瑞士爵士", url: "https://livestreaming-node-4.srg-ssr.ch/srgssr/rsj/aac/96", type: "aac", cat: "jazz" },
  { id: "s3kg9qa", name: "VRTMNM舞曲台", url: "https://icecast.vrtcdn.be/mnm-high.mp3", type: "mp3", cat: "electronic" },
  { id: "su549fn", name: "VRTRadioBene", url: "https://icecast.vrtcdn.be/radiobene-high.mp3", type: "mp3", cat: "public" },
  { id: "shxnorn", name: "VRTStuBru永恒金曲", url: "https://icecast.vrtcdn.be/stubru_tijdloze-high.mp3", type: "mp3", cat: "rock" },
  { id: "sm9r04v", name: "VRTStuBruUNTZ电子", url: "https://icecast.vrtcdn.be/stubru_untz-high.mp3", type: "mp3", cat: "electronic" },
  { id: "s1hwsdc7", name: "KUAF阿肯色公共电台", url: "https://war.streamguys1.com:7031/kuaf2", type: "mp3", cat: "public" },
  { id: "s1roclax", name: "VRTMNM劲歌台", url: "https://icecast.vrtcdn.be/mnm_hits-high.mp3", type: "mp3", cat: "rock" },
  { id: "s1g7w840", name: "VRTStuBru重吉他", url: "https://icecast.vrtcdn.be/stubru_bruut-high.mp3", type: "mp3", cat: "rock" },
  { id: "s14s3bxi", name: "VRTStuBru零零年代", url: "https://icecast.vrtcdn.be/stubru_dejarennul-high.mp3", type: "mp3", cat: "rock" },
  { id: "sl11u9b", name: "Guldkanalen七十年代", url: "https://stream.dbmedia.se/gk70talMP3", type: "mp3", cat: "rock" },
  { id: "sfjufkg", name: "Guldkanalen八十年代", url: "https://stream.dbmedia.se/gk80talMP3", type: "mp3", cat: "rock" },
  { id: "sa2n0vl", name: "Guldkanalen九十年代", url: "https://stream.dbmedia.se/gk90talMP3", type: "mp3", cat: "rock" },
  { id: "se8r3tb", name: "PulsRadio酒廊", url: "https://icecast.pulsradio.com/relaxHD.mp3", type: "mp3", cat: "lofi" },
  { id: "s1duupxg", name: "FriskyRadio自由电子", url: "https://stream.friskyradio.com/frisky_mp3_hi", type: "mp3", cat: "electronic" },
  { id: "s1x9vrw6", name: "PeacedPiano宁静钢琴", url: "https://peacefulpiano.stream.publicradio.org/peacefulpiano.aac", type: "aac", cat: "classical" },
  { id: "sy0j1qb", name: "WhisperingSoloPiano低语独奏钢琴", url: "https://pianosolo.streamguys1.com/live", type: "mp3", cat: "classical" },
  { id: "sn4p7ee", name: "MPRRelax明尼苏达舒缓", url: "https://relax.stream.publicradio.org/relax.aac", type: "aac", cat: "lofi" },
  { id: "s16t068t", name: "MPRGuitarFavorites吉他精选", url: "https://favorites.stream.publicradio.org/guitar.aac", type: "aac", cat: "lofi" },
  { id: "s9b13ur", name: "EpicLounge钢琴爵士酒廊", url: "https://stream.epic-lounge.com/piano-jazz-bar", type: "mp3", cat: "jazz" },
  { id: "s1k671ye", name: "VermontPublicClassical佛蒙特古典", url: "https://vprclassical.streamguys1.com/vprclassical128.mp3", type: "mp3", cat: "classical" },
  { id: "s1mkx0yo", name: "KODA休斯顿古典", url: "https://stream.revma.ihrhls.com/zc2017", type: "aac", cat: "classical" },
  { id: "s1qdupk8", name: "KlassikRadio新古典", url: "https://stream.klassikradio.de/newclassics/mp3-192/stream.klassikradio.de/", type: "mp3", cat: "classical" },
  { id: "sqs0frd", name: "KlassikRadio电影配乐", url: "https://stream.klassikradio.de/movie/mp3-192/stream.klassikradio.de/", type: "mp3", cat: "classical" },
  { id: "s1ve3sud", name: "KlassikRadio古典梦境", url: "https://stream.klassikradio.de/dreams/mp3-192/stream.klassikradio.de/", type: "mp3", cat: "classical" },
  { id: "soes1s0", name: "KlassikRadio歌剧", url: "https://stream.klassikradio.de/opera/mp3-192/stream.klassikradio.de/", type: "mp3", cat: "classical" },
  { id: "s1g9h9mg", name: "KlassikRadio摇滚遇上古典", url: "https://stream.klassikradio.de/rockmeetsclassic/mp3-192/stream.klassikradio.de/", type: "mp3", cat: "classical" },
  { id: "snt6ax9", name: "KlassikRadio巴西风情", url: "https://stream.klassikradio.de/brazil/mp3-192/stream.klassikradio.de/", type: "mp3", cat: "world" },
  { id: "spr2uhv", name: "KlassikRadio顺滑爵士", url: "https://stream.klassikradio.de/smooth/mp3-192/stream.klassikradio.de/", type: "mp3", cat: "jazz" },
  { id: "s5pizje", name: "KlassikRadio古典摇滚", url: "https://stream.klassikradio.de/klassikrock/mp3-192/stream.klassikradio.de/", type: "mp3", cat: "classical" },
  { id: "s1w6za7", name: "KlassikRadio纯威尔第", url: "https://stream.klassikradio.de/pureverdi/mp3-192/stream.klassikradio.de/", type: "mp3", cat: "classical" },
  { id: "sb6h9zn", name: "KlassikRadio酒廊", url: "https://stream.klassikradio.de/lounge/mp3-192/stream.klassikradio.de/", type: "mp3", cat: "lofi" },
  { id: "s1xa4p5s", name: "KlassikRadio纯钢琴", url: "https://stream.klassikradio.de/piano/mp3-192/stream.klassikradio.de/", type: "mp3", cat: "classical" },
  { id: "s1x4w9i3", name: "KlassikRadio巴洛克", url: "https://stream.klassikradio.de/barock/mp3-192/stream.klassikradio.de/", type: "mp3", cat: "classical" },
  { id: "s1jsuknj", name: "KlassikRadio酒廊节拍", url: "https://stream.klassikradio.de/loungebeat/mp3-192/stream.klassikradio.de/", type: "mp3", cat: "lofi" },
  { id: "s460rxx", name: "KlassikRadio合唱", url: "https://stream.klassikradio.de/chor/mp3-192/stream.klassikradio.de/", type: "mp3", cat: "classical" },
  { id: "spxgewd", name: "KlassikRadio让米歇尔雅尔", url: "https://stream.klassikradio.de/jeanmicheljarre/mp3-192/stream.klassikradio.de/", type: "mp3", cat: "electronic" },
  { id: "s1kzvq7n", name: "KlassikRadio纯巴赫", url: "https://stream.klassikradio.de/purebach/mp3-192/stream.klassikradio.de/", type: "mp3", cat: "classical" },
  { id: "s1d902bp", name: "KlassikRadio纯贝多芬", url: "https://stream.klassikradio.de/purebeethoven/mp3-192/stream.klassikradio.de/", type: "mp3", cat: "classical" },
  { id: "swxxawh", name: "NTS慢焦点", url: "https://stream-relay-geo.ntslive.net/stream", type: "mp3", cat: "lofi" },
  { id: "s1117ev3", name: "PulsRadio舞曲", url: "https://icecast.pulsradio.com/puls80HD.mp3", type: "mp3", cat: "electronic" },
  { id: "s2x642c", name: "PulsRadio迷幻", url: "https://icecast.pulsradio.com/pulstranceHD.mp3", type: "mp3", cat: "electronic" },
];

const t = host.t;

// The plugin's own folder as a file: URL: the covers sit beside index.js.
const coverDir = (function () {
  const backslash = String.fromCharCode(92);
  let dir = String(host.dir || "").split(backslash).join("/");
  while (dir.length > 1 && dir.charAt(dir.length - 1) === "/") dir = dir.slice(0, dir.length - 1);
  if (!dir) return "";
  // A folder with a space in it stays one path once it's escaped.
  dir = dir.split(" ").join("%20").split("#").join("%23");
  return dir.charAt(0) === "/" ? "file://" + dir : "file:///" + dir;
})();

const coverOf = (id) => (coverDir ? coverDir + "/covers/" + id + ".jpg" : "");

// The stations, by their own ids, and each track's id back to its station.
const stationsById = {};
for (let i = 0; i < STATIONS.length; i++) stationsById[STATIONS[i].id] = STATIONS[i];

const stationIdOf = (trackId) => {
  const s = String(trackId);
  const mark = s.indexOf("~");
  return mark < 0 ? s : s.slice(0, mark);
};

const label = (s) => t(CATS_BY_KEY[s.cat].title);

function fail(code, message) {
  const e = new Error(message || code);
  e.code = code;
  return e;
}

// A station as the app lists it: its name, what it plays, and its cover.
function toStation(s) {
  return { id: s.id, name: s.name, description: label(s), imageUrl: coverOf(s.id) };
}

export function stations() {
  return STATIONS.map(toStation);
}

// A live stream runs for as long as the listener listens, so it has no length.
// Each answer gets an id of its own, so a stream that ended and is picked up
// again is a new track to the app rather than a repeat of the one before.
let instance = 0;

// How each station has been going: when it was last asked for, how many of
// those asks came right after a break, and which address went out last.
const tries = {};

function noteAttempt(s) {
  const now = Date.now();
  const t = tries[s.id] || (tries[s.id] = { at: 0, quick: 0, turn: 0 });
  if (t.at && now - t.at < 25000) t.quick++;
  else if (t.at) t.quick = 0;
  t.at = now;
  return t;
}

// The address for this attempt. A stream that broke within seconds of the last
// one says more about the address than about the station, so the next goes
// somewhere else; and once that has happened a few times, it goes to the
// lighter stream, which asks less of a poor connection.
function pickAddress(s, t) {
  const list = s.alts || [[s.url, s.type]];
  const full = Math.max(1, Math.min(s.slim || list.length, list.length));
  const slim = list.length - full;
  if (t.quick >= 3 && slim > 0) {
    const pick = Math.min(t.quick - 3, slim - 1);
    return list[full + pick];
  }
  t.turn++;
  return list[(t.turn - 1) % full];
}

// What each track was answered with, so asking again gives the same address.
const chosen = {};
let chosenCount = 0;

export function stationNext({ id }) {
  const s = stationsById[id];
  if (!s) throw fail("unavailable", t("this station is gone"));
  instance++;
  const trackId = s.id + "~" + instance;
  if (chosenCount >= 400) {
    for (const k in chosen) delete chosen[k];
    chosenCount = 0;
  }
  chosen[trackId] = pickAddress(s, noteAttempt(s));
  chosenCount++;
  return [
    {
      id: trackId,
      name: s.name,
      artists: [{ id: s.id, name: label(s) }],
      album: { id: s.id, name: label(s), imageUrl: coverOf(s.id) },
      duration: 0,
    },
  ];
}

export function stream({ id }) {
  const s = stationsById[stationIdOf(id)];
  if (!s) throw fail("unavailable", t("this station is gone"));
  const pick = chosen[id] || pickAddress(s, tries[s.id] || noteAttempt(s));
  return { url: pick[0], type: pick[1] };
}

// Home shows each category, a dozen stations of it, and See All for the rest.
export function home() {
  const sections = CATS.map(function (c) {
    return {
      title: t(c.title),
      stations: STATIONS.filter(function (s) {
        return s.cat === c.key;
      }).slice(0, 12).map(toStation),
      morePage: c.key,
    };
  });
  return {
    title: t("Network Radio"),
    description: t("Live streams, playing for as long as you listen"),
    sections: sections,
  };
}

export function browse({ page }) {
  const c = CATS_BY_KEY[page];
  if (!c) throw fail("unavailable", t("no such page"));
  const list = STATIONS.filter(function (s) {
    return s.cat === page;
  }).map(toStation);
  return {
    title: t(c.title),
    subtitle: t("Live streams, playing for as long as you listen"),
    sections: [{ stations: list }],
  };
}
