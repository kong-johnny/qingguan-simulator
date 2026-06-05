const seasons = ["春", "夏", "秋", "冬"];

const statLabels = {
  people: "群众获得感",
  quality: "发展质量",
  ecology: "生态底线",
  finance: "财政健康",
  discipline: "纪律风险",
  reputation: "长期口碑",
};

const resourceLabels = {
  funds: "可用资金",
  energy: "精力体力",
  family: "家庭陪伴",
  capital: "组织信任",
  network: "人脉资源",
};

const stageNames = ["打基础", "见真章", "保晚节"];

const roles = [
  {
    id: "town",
    name: "乡镇主官",
    text: "矛盾最多，资源最紧。前期能不能把群众账摸清，决定后面有没有底气。",
    stats: { people: 48, quality: 42, ecology: 52, finance: 46, discipline: 20, reputation: 42 },
    resources: { funds: 58, energy: 76, family: 58, capital: 52, network: 34 },
  },
  {
    id: "street",
    name: "街道负责人",
    text: "小区治理、舆情处置、民生投诉密集，靠耐心、队伍和细活打开局面。",
    stats: { people: 50, quality: 40, ecology: 50, finance: 50, discipline: 18, reputation: 44 },
    resources: { funds: 52, energy: 78, family: 56, capital: 56, network: 38 },
  },
  {
    id: "bureau",
    name: "县直部门干部",
    text: "项目、材料、窗口服务都绕不开。越接近指标，越容易在实效和包装之间摇摆。",
    stats: { people: 44, quality: 46, ecology: 50, finance: 54, discipline: 17, reputation: 40 },
    resources: { funds: 62, energy: 72, family: 60, capital: 56, network: 40 },
  },
  {
    id: "park",
    name: "园区管委会",
    text: "招商压力大，生态红线硬。建功立业的机会多，踩线的诱惑也多。",
    stats: { people: 42, quality: 50, ecology: 44, finance: 50, discipline: 23, reputation: 38 },
    resources: { funds: 68, energy: 74, family: 55, capital: 54, network: 42 },
  },
];

const events = [
  {
    stage: "early",
    tag: "调研",
    pressure: "开局摸底",
    title: "办公室建议用旧材料先撑过去",
    text: "第一份民生调研报告明早要交。真实走访要下村入户，今晚肯定回不了家；改旧材料则能准时交差。",
    choices: [
      { label: "连夜走访，只写真问题", note: "很累，但后续决策会少走弯路。", cost: { energy: 14, family: 8 }, effect: { people: 7, reputation: 8, quality: 5, discipline: -4, network: 5 }, risk: -3, log: "连夜入户调研，报告列出真实问题。" },
      { label: "抽样核实，先交短报告", note: "时间有限，但保证基本真实。", cost: { energy: 8, family: 3 }, effect: { people: 4, reputation: 4, quality: 3, network: 2 }, log: "抽样核实后提交短而实的调研报告。" },
      { label: "旧材料换标题", note: "最快，也最空。", cost: { energy: 1 }, effect: { discipline: 6, reputation: -4, quality: -3 }, hiddenRisk: 10, chance: { p: 0.25, pass: "材料侥幸过关，大家都松了一口气。", fail: "群众反映的问题和材料完全对不上，被点名重写。" }, log: "沿用旧材料，问题判断开始失真。" },
    ],
  },
  {
    stage: "early",
    tag: "民生",
    pressure: "群众堵门",
    title: "老旧小区供水反复爆管",
    text: "居民连续三次半夜停水。彻底改造费钱费协调，但你手头还有一个更容易出彩的广场改造项目。",
    choices: [
      { label: "先把管网改造啃下来", note: "花钱、费协调，但群众真能用上。", cost: { funds: 16, energy: 10, family: 5 }, effect: { people: 13, reputation: 9, finance: -5, quality: 3, network: 3 }, log: "暂缓广场改造，启动供水管网改造。" },
      { label: "临时抢修，广场照做", note: "年底材料好看，问题还会回来。", cost: { funds: 8, energy: 4 }, effect: { people: 2, reputation: -3, finance: -3, quality: 4 }, delayed: { people: -8, reputation: -5 }, hiddenRisk: 5, log: "选择抢修过渡，同时推进广场改造。" },
      { label: "让社区先做解释工作", note: "压力暂时转移，但信任会磨损。", cost: { energy: 2, capital: 2 }, effect: { people: -7, reputation: -5, discipline: 2 }, hiddenRisk: 4, log: "把问题压给社区解释，居民怨气增加。" },
    ],
  },
  {
    stage: "early",
    tag: "队伍",
    pressure: "干部疲惫",
    title: "基层干部被重复台账压得喘不过气",
    text: "几个骨干已经连轴转半个月。上面又临时要一批统计表，大家看你的眼神都有点发直。",
    choices: [
      { label: "砍掉重复台账，亲自向上说明", note: "替基层挡一挡，但要担压力。", cost: { capital: 5, energy: 7 }, effect: { people: 3, reputation: 7, discipline: -3, quality: 4, network: 5 }, log: "清理重复台账，向上级说明基层负担。" },
      { label: "自己带头通宵把表补齐", note: "能交差，但身体和家庭继续透支。", cost: { energy: 15, family: 7 }, effect: { capital: 3, reputation: 2, network: 2 }, log: "带头通宵补表，队伍压力暂时缓住。" },
      { label: "层层压下去，限时交表", note: "效率看起来高，怨气也积起来。", cost: { energy: 2 }, effect: { capital: 2, people: -3, reputation: -5, discipline: 4 }, hiddenRisk: 6, log: "继续压表格任务，基层怨气上升。" },
    ],
  },
  {
    stage: "early",
    tag: "家庭",
    pressure: "亲情拉扯",
    title: "孩子生日撞上防汛值守",
    text: "暴雨预警刚升级，家里也发来消息：孩子盼了很久的生日饭就在今晚。值班表上本来还有调整空间。",
    choices: [
      { label: "留在一线值守，之后认真补偿家人", note: "不是不顾家，是把责任扛完再补课。", cost: { energy: 8, family: 13 }, effect: { people: 8, reputation: 5, discipline: -3 }, log: "暴雨夜留守一线，家庭陪伴明显下降。" },
      { label: "协调换班，保证预案不断档", note: "尽力兼顾，但需要组织信任和同事支持。", cost: { capital: 6, family: 2 }, effect: { people: 3, reputation: 2 }, log: "协调换班，防汛预案保持运转。" },
      { label: "电话遥控，先回家吃饭", note: "人不在现场，风险会放大。", cost: { family: -5 }, effect: { people: -6, discipline: 5, reputation: -4 }, hiddenRisk: 8, chance: { p: 0.4, pass: "这一晚雨势转弱，没有出事。你心里却知道这不是制度。", fail: "低洼点位险些失守，现场缺位被群众拍了下来。" }, log: "防汛现场缺位，基层干部有怨言。" },
    ],
  },
  {
    stage: "early",
    tag: "人脉",
    pressure: "开局结网",
    title: "几位老同志愿意帮你打开局面",
    text: "他们熟悉历史遗留问题，也熟悉各方关系。有人提醒你：人脉是用来办事的，不是用来围猎的。",
    choices: [
      { label: "请他们帮忙梳理群众难题", note: "把关系用在公事上，慢慢攒真实信用。", cost: { energy: 7 }, effect: { network: 10, people: 5, reputation: 5, discipline: -2 }, log: "请老同志梳理群众难题和历史台账。" },
      { label: "先熟悉关系，保持距离", note: "谨慎稳妥，积累较慢。", cost: { energy: 4 }, effect: { network: 5, reputation: 2 }, log: "熟悉各方关系，但没有急着许诺。" },
      { label: "借机会多参加饭局", note: "人面熟得快，边界也变模糊。", cost: { family: 5 }, effect: { network: 12, capital: 3, discipline: 8, reputation: -3 }, hiddenRisk: 12, chance: { p: 0.45, pass: "饭局没有留下把柄，人脉涨得很快。", fail: "一次饭局照片流出，议论开始发酵。" }, log: "频繁参加饭局，人脉和风险同时上涨。" },
    ],
  },
  {
    stage: "middle",
    tag: "晋升",
    pressure: "关键考察",
    title: "组织考察前，大家都在问你有没有拿得出手的亮点",
    text: "一个长期民生项目快见效了，但镜头不够漂亮。另一个标志性工程能快速出片，只是债务和后续运营都没算清。",
    choices: [
      { label: "从实事里提炼亮点，不另造景", note: "可能不够耀眼，但站得住。", cost: { energy: 9, network: 4 }, effect: { capital: 8, reputation: 8, people: 6, quality: 4, discipline: -3 }, log: "从真实工作中提炼汇报亮点。" },
      { label: "压缩标志工程规模，严控债务", note: "有展示，也不赌未来。", cost: { funds: 14, energy: 8, capital: 3 }, effect: { capital: 8, quality: 7, people: 3, finance: -4, reputation: 2 }, log: "标志工程压缩规模，债务风险受控。" },
      { label: "大干快上，先把声势做出来", note: "建功窗口很短，账单会更长。", cost: { funds: 22, energy: 10 }, effect: { capital: 13, quality: 9, finance: -14, discipline: 7, reputation: -6 }, delayed: { finance: -8, discipline: 5 }, hiddenRisk: 12, log: "大型亮点工程快速上马，债务压力被推到未来。" },
    ],
  },
  {
    stage: "middle",
    tag: "招商",
    pressure: "排名落后",
    title: "招商企业带来高税收，也带来排污隐患",
    text: "企业承诺三年纳税翻番，条件是审批要快。环保专员提醒，污水处理方案还没经得起推敲。",
    choices: [
      { label: "卡住红线，补齐环评再谈", note: "招商进度会慢，但底线不能糊弄。", cost: { energy: 9, capital: 4 }, effect: { ecology: 12, discipline: -5, reputation: 7, quality: 3 }, log: "坚持环评先行，要求企业补齐治理方案。" },
      { label: "先签约，边建设边整改", note: "短期热闹，风险也埋进去了。", cost: { funds: 4, energy: 5 }, effect: { quality: 9, finance: 6, ecology: -13, discipline: 8, reputation: -4 }, delayed: { ecology: -8, discipline: 6 }, hiddenRisk: 9, log: "项目快速签约，环保隐患进入台账。" },
      { label: "包装成绿色示范项目", note: "材料漂亮，但事实经不起看。", cost: { capital: 2 }, effect: { quality: 5, discipline: 14, ecology: -9, reputation: -8 }, hiddenRisk: 18, chance: { p: 0.3, pass: "材料暂时蒙混过关，项目热度上升。", fail: "环保督查提前到来，包装材料被当场拆穿。" }, log: "用文字包装项目亮点，埋下作风风险。" },
    ],
  },
  {
    stage: "middle",
    tag: "历史遗留",
    pressure: "久拖不决",
    title: "烂尾安置房又有群众上访",
    text: "这不是你任内形成的问题，但群众只认政府。彻底解决要掏空预算，还要连续协调多方。",
    choices: [
      { label: "成立专班啃硬骨头", note: "会挤掉很多轻松项目。", cost: { funds: 18, energy: 13, family: 6, capital: 4 }, effect: { people: 15, reputation: 12, finance: -7, quality: 4, network: 3 }, log: "把烂尾安置房列为任期硬仗。" },
      { label: "分批解决，先保困难户", note: "进度慢，但方向是真的。", cost: { funds: 10, energy: 8 }, effect: { people: 8, reputation: 6, finance: -3 }, log: "安置房问题分批化解，先保困难群众。" },
      { label: "继续解释历史原因", note: "解释越多，群众越冷。", cost: { energy: 2 }, effect: { people: -10, reputation: -8, discipline: 3 }, hiddenRisk: 5, log: "继续解释历史原因，矛盾没有实质进展。" },
    ],
  },
  {
    stage: "middle",
    tag: "数据",
    pressure: "指标冲刺",
    title: "经济数据差一点就能进前列",
    text: "有人提出把尚未落地的意向项目提前计入，理由是“大家都这么干”。",
    choices: [
      { label: "实事求是，差多少报多少", note: "排名会难看，心里很稳。", cost: { capital: 5 }, effect: { discipline: -10, reputation: 8, quality: 2 }, log: "经济数据如实上报。" },
      { label: "备注口径，争取解释空间", note: "不虚报，但把情况讲清。", cost: { energy: 5 }, effect: { discipline: -4, capital: 2, reputation: 3 }, log: "用备注口径说明项目进度。" },
      { label: "先计进去，年底再补", note: "一念之差，会越来越难圆。", cost: {}, effect: { capital: 6, discipline: 15, reputation: -8, quality: -3 }, delayed: { discipline: 6, reputation: -5 }, hiddenRisk: 18, chance: { p: 0.5, pass: "项目年底前真的落了一部分，数据暂时圆上了。", fail: "统计核查追问原始凭证，提前计入的问题暴露。" }, log: "提前计入意向项目，数据风险升高。" },
    ],
  },
  {
    stage: "middle",
    tag: "征地",
    pressure: "工程卡点",
    title: "征地补偿争议卡住重点工程",
    text: "少数群众对补偿标准不认可，施工方催你“强推一下”。依法细做工作会拖慢进度。",
    choices: [
      { label: "逐户核账，依法公开标准", note: "慢，但能把心结打开。", cost: { energy: 12, family: 5 }, effect: { people: 10, reputation: 8, quality: 4, discipline: -4 }, log: "征地补偿逐户核账并公开标准。" },
      { label: "先调解重点户，工程分段推进", note: "把冲突拆小。", cost: { energy: 8, capital: 2 }, effect: { people: 5, quality: 4, reputation: 3 }, log: "调解重点户，工程分段推进。" },
      { label: "压着签字，先保进度", note: "工程快了，怨气深了。", cost: { capital: 3 }, effect: { quality: 7, people: -9, discipline: 8, reputation: -7 }, hiddenRisk: 12, log: "强压签字保进度，群众不满加深。" },
    ],
  },
  {
    stage: "late",
    tag: "晚节",
    pressure: "熟人请托",
    title: "老同学想承接民生项目",
    text: "老同学说公司资质齐全，还暗示会给你家里“照顾”。项目确实急，但招标流程不能省。",
    choices: [
      { label: "公开招标，主动报备关系", note: "清楚切割，慢一点也安心。", cost: { energy: 5, capital: 2 }, effect: { discipline: -12, reputation: 7, quality: 3 }, log: "主动报备回避关系，项目公开招标。" },
      { label: "允许正常参与，自己回避评审", note: "程序上谨慎，仍要盯紧细节。", cost: { energy: 6 }, effect: { discipline: -4, reputation: 2, quality: 2 }, log: "允许正常参与，自己回避评审环节。" },
      { label: "先给熟人做，保证速度", note: "方便背后是风险。", cost: { funds: 2 }, effect: { quality: 4, discipline: 16, reputation: -7 }, hiddenRisk: 20, chance: { p: 0.35, pass: "项目推进很快，暂时没人追问关系。", fail: "竞争公司实名投诉，回避问题被摆上桌面。" }, log: "熟人公司快速进场，廉政风险升高。" },
    ],
  },
  {
    stage: "late",
    tag: "饭局",
    pressure: "人情围猎",
    title: "项目老板邀你参加私人饭局",
    text: "对方说只是交朋友，地点却安排在私人会所。你刚好需要推动项目融资。",
    choices: [
      { label: "拒绝饭局，改在办公室谈", note: "边界清楚，事情也能谈。", cost: { capital: 1 }, effect: { discipline: -11, reputation: 5 }, log: "拒绝私人饭局，改为公开办公会沟通。" },
      { label: "带工作人员参加公开餐叙", note: "保持记录，避免私下空间。", cost: { energy: 3 }, effect: { discipline: -5, quality: 2 }, log: "公开餐叙并留痕，边界相对清楚。" },
      { label: "赴约，顺便摸摸情况", note: "理由再多，风险也是真的。", cost: { family: 2 }, effect: { discipline: 14, capital: 3, reputation: -6 }, hiddenRisk: 18, chance: { p: 0.42, pass: "饭局没有马上出事，你甚至拿到了一些项目消息。", fail: "私人会所记录被调取，事情开始失控。" }, log: "参加私人饭局，纪律风险明显上升。" },
    ],
  },
  {
    stage: "late",
    tag: "安全",
    pressure: "收官节点",
    title: "施工现场发生轻伤事故",
    text: "工程正赶节点，停工整改会影响排名。不停工则可能出更大事故。",
    choices: [
      { label: "立即停工，全面排查", note: "节点会掉，但生命安全没有折扣。", cost: { energy: 10, capital: 4 }, effect: { discipline: -7, reputation: 7, quality: 3, people: 5 }, log: "施工现场停工排查，安全隐患被清出。" },
      { label: "局部停工，重点区域整改", note: "折中方案，仍要盯紧。", cost: { energy: 7 }, effect: { discipline: -2, quality: 3, reputation: 2 }, log: "局部停工整改，工程降速。" },
      { label: "低调处理，继续赶工", note: "进度赢了，底线输了。", cost: { funds: 2 }, effect: { quality: 5, discipline: 12, people: -5, reputation: -7 }, delayed: { discipline: 8, people: -4 }, hiddenRisk: 16, chance: { p: 0.25, pass: "现场没有再出事故，项目按期推进。", fail: "复工后再次发生险情，前次低调处理被翻出。" }, log: "事故低调处理，安全风险累积。" },
    ],
  },
  {
    stage: "late",
    tag: "收官",
    pressure: "最后冲刺",
    title: "任期末能不能再上一个大项目",
    text: "有人提出用债务撬动大型综合体，剪彩很漂亮，但收益测算含糊。另一个方案是把钱投进排污、养老和基层服务。",
    choices: [
      { label: "投向基础服务，留下长效账", note: "剪彩少，后劲足。", cost: { funds: 18, energy: 12, family: 6 }, effect: { people: 14, reputation: 14, ecology: 5, finance: -4, quality: 5 }, log: "任期末把资源投向基础服务长效提升。" },
      { label: "压缩规模，严控债务上项目", note: "保留发展空间，不赌未来。", cost: { funds: 12, energy: 8, capital: 2 }, effect: { quality: 6, people: 5, reputation: 5, finance: -2 }, log: "项目压缩规模，债务风险受控。" },
      { label: "大干快上，争取收官漂亮", note: "掌声在当下，账单在后面。", cost: { funds: 22, energy: 9 }, effect: { capital: 10, quality: 8, finance: -16, discipline: 7, reputation: -8 }, delayed: { finance: -10, reputation: -6 }, hiddenRisk: 14, log: "大型综合体快速上马，债务压力被推到未来。" },
    ],
  },
  {
    stage: "any",
    tag: "舆情",
    pressure: "网上发酵",
    title: "短视频曝光窗口办事慢",
    text: "视频里群众等了两个小时。窗口负责人解释说系统故障加人手不足，宣传口建议先发一条强硬澄清。",
    choices: [
      { label: "公开道歉，现场改流程", note: "承认问题难看，但整改最快。", cost: { energy: 10, funds: 5 }, effect: { people: 10, reputation: 7, discipline: -2, quality: 4 }, log: "公开回应并优化窗口流程。" },
      { label: "先核实，再给出整改时限", note: "稳妥但需要顶住舆论压力。", cost: { energy: 7, capital: 2 }, effect: { people: 5, reputation: 5, quality: 3 }, log: "核实问题后发布整改时限。" },
      { label: "强调个例，要求删帖", note: "短期降温，长期伤信任。", cost: { capital: 2 }, effect: { people: -8, discipline: 7, reputation: -9 }, delayed: { people: -5, reputation: -5 }, hiddenRisk: 10, log: "试图压热度，群众信任受损。" },
    ],
  },
  {
    stage: "any",
    tag: "生态",
    pressure: "群众投诉",
    title: "河道黑水来自几家小作坊",
    text: "关停会影响几十户收入，不关停则下游村民天天闻臭味。转型需要资金和耐心。",
    choices: [
      { label: "整治污染，同时帮作坊转型", note: "最难也最实。", cost: { funds: 15, energy: 11, family: 4 }, effect: { ecology: 14, people: 8, reputation: 9, finance: -5 }, log: "河道整治和作坊转型一起推进。" },
      { label: "先限期整改，盯住排污", note: "中等强度，效果看执行。", cost: { energy: 7, funds: 4 }, effect: { ecology: 7, people: 4, reputation: 3 }, log: "小作坊限期整改，环保巡查加密。" },
      { label: "睁一只眼，保住收入", note: "眼前稳，河水会说话。", cost: {}, effect: { ecology: -13, people: -5, discipline: 5, reputation: -6 }, delayed: { ecology: -7, people: -4 }, hiddenRisk: 10, log: "污染作坊继续生产，河道问题恶化。" },
    ],
  },
  {
    stage: "any",
    tag: "学习",
    pressure: "认知更新",
    title: "支部学习要不要真讨论问题",
    text: "学习教育安排下来了。有人建议读完材料签个到，别耽误业务。你知道真正的作风问题不讨论就不会消失。",
    choices: [
      { label: "拿真实案例开刀，形成整改清单", note: "会有刺痛，但能改事。", cost: { energy: 8, capital: 3 }, effect: { discipline: -8, reputation: 6, people: 4, quality: 3 }, risk: -5, log: "支部学习直面真实案例，形成整改清单。" },
      { label: "学习和业务结合，挑两个问题整改", note: "不铺开，先做实。", cost: { energy: 5 }, effect: { discipline: -4, reputation: 3, quality: 2 }, risk: -2, log: "学习教育结合业务整改。" },
      { label: "照本宣科，材料留痕", note: "台账齐了，思想没动。", cost: { energy: 2 }, effect: { discipline: 5, reputation: -4, quality: -2 }, hiddenRisk: 5, log: "学习教育停留在留痕层面。" },
    ],
  },
  {
    stage: "early",
    tag: "信访",
    pressure: "积案初现",
    title: "一封十年前的信访件又被翻出来",
    text: "来访人材料厚厚一摞，前几任都说情况复杂。你刚到任，完全可以先按程序转办。",
    choices: [
      { label: "约来访人和承办部门当面核账", note: "很耗时间，但能看见问题根子。", cost: { energy: 11, family: 4 }, effect: { people: 8, reputation: 7, network: 4, discipline: -3 }, log: "把信访积案摆到桌面上逐项核账。" },
      { label: "先调阅档案，列入季度台账", note: "稳妥推进，不轻易承诺。", cost: { energy: 6 }, effect: { people: 3, reputation: 3, quality: 2 }, log: "调阅信访档案，列入季度台账。" },
      { label: "按程序转办，要求限期答复", note: "流程完整，但群众会觉得你没接住。", cost: { capital: 1 }, effect: { people: -4, reputation: -4, discipline: 2 }, hiddenRisk: 5, log: "积案被转办，来访人失望离开。" },
    ],
  },
  {
    stage: "early",
    tag: "预算",
    pressure: "开年盘子",
    title: "各部门都来争取第一笔预算",
    text: "宣传、城建、民政、农业都说自己最急。你若不尽快定盘子，很多工作会卡住。",
    choices: [
      { label: "按急难愁盼重新排优先级", note: "会得罪几个部门，但钱要跟着问题走。", cost: { energy: 9, capital: 5 }, effect: { people: 8, finance: 3, reputation: 5, network: -2 }, log: "按群众急难重新安排开年预算。" },
      { label: "保基本盘，预留机动资金", note: "不冒进，后面有余地。", cost: { energy: 5 }, effect: { finance: 6, reputation: 2, capital: 2 }, log: "开年预算保基本盘并预留机动。" },
      { label: "谁催得急先给谁", note: "眼前少冲突，长期会乱。", cost: { funds: 6 }, effect: { finance: -5, reputation: -5, discipline: 3 }, hiddenRisk: 5, log: "预算按催办压力分配，埋下失衡隐患。" },
    ],
  },
  {
    stage: "early",
    tag: "村情",
    pressure: "熟人社会",
    title: "几个村干部暗示可以帮你把场面撑起来",
    text: "他们熟悉基层，也有自己的小算盘。你需要他们支持，但不能被他们带着走。",
    choices: [
      { label: "逐村走访，群众和干部两头听", note: "慢，但不会只听一边。", cost: { energy: 12, family: 5 }, effect: { people: 7, network: 6, reputation: 5, discipline: -2 }, log: "逐村走访，交叉核实村情。" },
      { label: "先请村干部梳理问题清单", note: "效率高，但要防信息过滤。", cost: { energy: 5 }, effect: { network: 7, quality: 2, people: 1 }, log: "请村干部先梳理问题清单。" },
      { label: "依靠几个能人快速打开局面", note: "看似顺手，容易被关系绑住。", cost: { capital: 2 }, effect: { network: 10, discipline: 5, reputation: -3 }, hiddenRisk: 8, log: "依靠熟人能人快速推进，边界开始变模糊。" },
    ],
  },
  {
    stage: "early",
    tag: "窗口",
    pressure: "办事体验",
    title: "办事大厅排队长但投诉少",
    text: "窗口负责人说群众习惯了，没必要大动干戈。你现场看了半小时，发现老人填表很吃力。",
    choices: [
      { label: "重排流程，增设帮办岗", note: "要调人调班，群众马上能感受到。", cost: { funds: 8, energy: 9 }, effect: { people: 10, quality: 5, reputation: 5 }, log: "办事大厅增设帮办岗并重排流程。" },
      { label: "先做高峰期志愿服务", note: "成本较低，但不是根本改革。", cost: { energy: 5, network: 2 }, effect: { people: 4, reputation: 3 }, log: "高峰期安排志愿帮办。" },
      { label: "先观察一个月再说", note: "看似稳，群众继续排队。", cost: {}, effect: { people: -4, reputation: -3 }, hiddenRisk: 4, log: "办事大厅问题继续观察，群众等待没有减少。" },
    ],
  },
  {
    stage: "early",
    tag: "学习",
    pressure: "开局立规",
    title: "班子会上有人建议少讲纪律多讲发展",
    text: "大家都想快点把项目跑起来。你知道发展重要，但开局规矩不立，后面会越来越难管。",
    choices: [
      { label: "把纪律边界和发展任务一起讲清", note: "不空谈纪律，也不放松底线。", cost: { energy: 6, capital: 2 }, effect: { discipline: -7, reputation: 4, quality: 2 }, risk: -3, log: "班子会同步明确发展任务和纪律边界。" },
      { label: "先讲发展，纪律放到专题会上", note: "节奏更柔和，但力度弱一点。", cost: { energy: 3 }, effect: { quality: 3, capital: 2, discipline: -1 }, log: "先部署发展任务，纪律专题后置。" },
      { label: "默认大家心里有数", note: "最大的风险常常来自这种默认。", cost: {}, effect: { quality: 2, discipline: 5, reputation: -3 }, hiddenRisk: 6, log: "开局没有明确纪律边界。" },
    ],
  },
  {
    stage: "middle",
    tag: "攻坚",
    pressure: "机会窗口",
    title: "省级试点名额只剩一个",
    text: "试点如果拿下，能争取资金和政策；但申报材料必须建立在真实基础上，不能只靠包装。",
    choices: [
      { label: "拿真实短板申报，争取问题导向试点", note: "不够光鲜，但可能拿到真正支持。", cost: { energy: 12, capital: 5, network: 4 }, effect: { quality: 9, reputation: 8, people: 5, discipline: -3 }, log: "按真实短板申报省级试点。" },
      { label: "突出已有成绩，弱化困难", note: "更像申报材料，但实情少了一块。", cost: { energy: 7, network: 3 }, effect: { quality: 6, capital: 5, reputation: 1 }, hiddenRisk: 4, log: "申报材料突出成绩，弱化困难。" },
      { label: "找熟人打招呼，先拿名额", note: "机会可能来了，风险也来了。", cost: { network: 8, family: 3 }, effect: { capital: 8, quality: 5, discipline: 10, reputation: -5 }, hiddenRisk: 16, chance: { p: 0.38, pass: "关系运作暂时有效，试点名额落下来了。", fail: "申报过程被质疑不透明，试点资格暂停。" }, log: "试图通过关系争取试点名额。" },
    ],
  },
  {
    stage: "middle",
    tag: "产业",
    pressure: "群众增收",
    title: "合作社想扩大种植但销路没底",
    text: "群众希望增收，企业承诺包销却只愿口头保证。盲目扩大可能丰产不丰收。",
    choices: [
      { label: "先签保底订单，再小规模扩种", note: "慢一点，但不让群众赌身家。", cost: { energy: 10, network: 5 }, effect: { people: 9, quality: 6, reputation: 6, finance: 1 }, log: "推动保底订单后小规模扩种。" },
      { label: "政府补贴一季，边做边找销路", note: "能启动，但财政和市场都吃压。", cost: { funds: 12, energy: 6 }, effect: { people: 5, quality: 6, finance: -6 }, delayed: { finance: -4 }, log: "用补贴启动合作社扩种。" },
      { label: "包装成示范产业大面积铺开", note: "场面很热，风险也很大。", cost: { funds: 16, energy: 4 }, effect: { quality: 8, capital: 6, finance: -10, discipline: 5, reputation: -5 }, hiddenRisk: 10, log: "示范产业大面积铺开，销路风险未解。" },
    ],
  },
  {
    stage: "middle",
    tag: "教育",
    pressure: "资源分配",
    title: "学校操场破损，汇报片也要拍",
    text: "孩子们雨天没法上体育课。拍摄团队建议先把校门口和荣誉墙修好，镜头效果更好。",
    choices: [
      { label: "先修操场和排水", note: "镜头不华丽，但孩子天天受益。", cost: { funds: 13, energy: 6 }, effect: { people: 10, reputation: 8, quality: 3 }, log: "学校操场和排水先行改造。" },
      { label: "操场小修，校门同步美化", note: "兼顾展示，但实用效果打折。", cost: { funds: 12, energy: 5 }, effect: { people: 4, capital: 3, reputation: 1, finance: -3 }, log: "操场小修，校门美化同步推进。" },
      { label: "先拍片，后面再说", note: "孩子们会记得这个选择。", cost: { funds: 5 }, effect: { capital: 4, people: -7, reputation: -7, discipline: 4 }, hiddenRisk: 5, log: "优先拍摄汇报片，操场问题后延。" },
    ],
  },
  {
    stage: "middle",
    tag: "医疗",
    pressure: "急难愁盼",
    title: "卫生院夜间急诊缺人",
    text: "偏远片区夜间看病难，补齐排班要增加经费，还要说服医生轮值。",
    choices: [
      { label: "补贴夜班，建转诊联动", note: "成本不低，但急病等不起。", cost: { funds: 14, energy: 8 }, effect: { people: 12, reputation: 8, finance: -4, quality: 3 }, log: "卫生院夜诊和转诊联动启动。" },
      { label: "先买设备，排班慢慢谈", note: "设备可见，服务未必跟上。", cost: { funds: 10, energy: 4 }, effect: { quality: 4, people: 2, finance: -3 }, log: "先采购设备，夜间服务仍不稳定。" },
      { label: "要求卫生院自行克服", note: "不花钱，但问题留在群众身上。", cost: { capital: 1 }, effect: { people: -8, reputation: -6, discipline: 2 }, hiddenRisk: 4, log: "要求卫生院自行克服，夜诊缺口未补。" },
    ],
  },
  {
    stage: "middle",
    tag: "城建",
    pressure: "拆违碰硬",
    title: "一处违建背后牵着多个熟人",
    text: "群众反映多年，违建占了消防通道。拆，关系上会难看；不拆，安全账没人替你背。",
    choices: [
      { label: "依法拆除并公开依据", note: "得罪人，但消防通道必须畅通。", cost: { energy: 10, network: 6, capital: 3 }, effect: { people: 9, discipline: -5, reputation: 7, quality: 3 }, log: "依法拆除占用消防通道的违建。" },
      { label: "先约谈整改，限期自拆", note: "留缓冲，也留监督压力。", cost: { energy: 7, capital: 2 }, effect: { people: 4, reputation: 3, discipline: -2 }, log: "约谈违建业主限期自拆。" },
      { label: "暂缓处理，避免激化矛盾", note: "矛盾没激化，风险也没消失。", cost: {}, effect: { people: -6, discipline: 5, reputation: -5 }, delayed: { discipline: 5, people: -4 }, hiddenRisk: 9, log: "违建问题暂缓处理。" },
    ],
  },
  {
    stage: "middle",
    tag: "考察",
    pressure: "推荐人选",
    title: "一个能干的干部也有不少争议",
    text: "他推进项目很有办法，但群众说他脾气硬、听不进意见。推荐他会见效快，也可能放大作风问题。",
    choices: [
      { label: "先压担子也设监督边界", note: "用其所长，也管住风险。", cost: { energy: 8, capital: 3 }, effect: { quality: 6, reputation: 4, discipline: -2, network: 3 }, log: "给争议干部压担子并设置监督边界。" },
      { label: "安排到攻坚专班试用", note: "先观察，不急着定性。", cost: { energy: 5 }, effect: { quality: 4, capital: 2 }, log: "安排争议干部到攻坚专班试用。" },
      { label: "只看业绩，直接重用", note: "短期冲得快，作风风险也快。", cost: { capital: 2 }, effect: { quality: 8, discipline: 7, people: -4, reputation: -3 }, hiddenRisk: 8, log: "直接重用争议干部，作风风险升高。" },
    ],
  },
  {
    stage: "late",
    tag: "退休前",
    pressure: "老关系回头",
    title: "多年老朋友说想在你离任前办件事",
    text: "他说不是大事，只是一个手续能不能快点。你知道越到最后，越有人试探边界。",
    choices: [
      { label: "按程序办，并把请求记录下来", note: "不给最后一公里留下口子。", cost: { energy: 4, capital: 1 }, effect: { discipline: -9, reputation: 5 }, log: "将老朋友请托按程序记录处理。" },
      { label: "提醒他材料齐全就正常办", note: "保留情面，也守住流程。", cost: { energy: 3 }, effect: { discipline: -4, reputation: 2 }, log: "提醒老朋友按材料清单正常办理。" },
      { label: "最后帮一次，算还人情", note: "晚节往往就毁在'最后一次'。", cost: { network: 2 }, effect: { discipline: 16, reputation: -8, capital: -4 }, hiddenRisk: 22, chance: { p: 0.32, pass: "手续顺利办完，没有马上起波澜。", fail: "同类申请人质疑插队，线索被提交。" }, log: "替老朋友加快手续办理。" },
    ],
  },
  {
    stage: "late",
    tag: "荣誉",
    pressure: "评先评优",
    title: "上面征求先进典型材料",
    text: "材料组想把几个未完成项目写成已完成。你确实做了很多事，但还没到能盖棺定论的时候。",
    choices: [
      { label: "只写已完成的，未完成讲进展", note: "不把半成品写成成绩。", cost: { capital: 4 }, effect: { discipline: -8, reputation: 7 }, log: "先进材料如实区分完成和推进中事项。" },
      { label: "把表述写得稳一点", note: "留有余地，但仍有包装。", cost: { energy: 3 }, effect: { capital: 3, reputation: 1, discipline: 2 }, hiddenRisk: 3, log: "先进材料采用模糊表述。" },
      { label: "照顾整体效果，先写圆满", note: "看起来完美，最怕有人认真核。", cost: {}, effect: { capital: 6, discipline: 12, reputation: -5 }, hiddenRisk: 16, chance: { p: 0.42, pass: "材料顺利上报，没有被追问细节。", fail: "未完项目被现场核验，材料被要求退回。" }, log: "把未完项目写成圆满完成。" },
    ],
  },
  {
    stage: "late",
    tag: "交接",
    pressure: "后任将至",
    title: "继任者想提前了解真实账本",
    text: "有些问题说出来会影响你的任期观感，不说出来后任可能踩坑。",
    choices: [
      { label: "把成绩、问题、风险都交清楚", note: "功劳少一点，后劲稳一点。", cost: { energy: 7, capital: 2 }, effect: { reputation: 8, discipline: -5, quality: 3 }, log: "向继任者完整交接真实账本。" },
      { label: "先交重点问题，细账后续补", note: "不算遮掩，但还不彻底。", cost: { energy: 4 }, effect: { reputation: 3, quality: 2 }, log: "向继任者交接重点问题清单。" },
      { label: "只交成绩台账，问题留给后面", note: "体面退场，后续难看。", cost: {}, effect: { reputation: -8, discipline: 6, capital: 3 }, delayed: { reputation: -8, discipline: 5 }, hiddenRisk: 12, log: "交接时只突出成绩，隐去风险。" },
    ],
  },
  {
    stage: "late",
    tag: "身体",
    pressure: "长期透支",
    title: "体检报告提示几个指标亮红灯",
    text: "医生说再这样熬下去不行。可收官任务还压着，很多人等你拍板。",
    choices: [
      { label: "调整节奏，授权班子分担", note: "不是退缩，是让系统能运转。", cost: { capital: 4 }, effect: { energy: 10, family: 5, quality: 2, reputation: 2 }, risk: -2, log: "调整节奏并授权班子分担任务。" },
      { label: "只减少非必要会议", note: "能缓一点，但压力还在。", cost: { energy: 2 }, effect: { energy: 5, family: 2 }, log: "压缩非必要会议，稍微恢复状态。" },
      { label: "硬扛到任期结束", note: "意志很硬，身体未必答应。", cost: { energy: 10, family: 5 }, effect: { reputation: 4, energy: -8 }, hiddenRisk: 4, chance: { p: 0.35, pass: "你硬撑过这一阵，但明显慢了下来。", fail: "你在连续会议后病倒，几项工作被迫延期。" }, log: "继续硬扛收官任务。" },
    ],
  },
  {
    stage: "late",
    tag: "债务",
    pressure: "收尾付款",
    title: "几个项目的尾款集中到期",
    text: "项目都能说出意义，但财政支付压力是真的。有人建议先拖供应商，账面就好看了。",
    choices: [
      { label: "压减新开支，按合同支付", note: "不潇洒，但守信用。", cost: { funds: 15, energy: 6 }, effect: { finance: 3, reputation: 6, discipline: -3, quality: 2 }, log: "压减新开支，按合同支付项目尾款。" },
      { label: "协商分期，公开说明原因", note: "难看但透明。", cost: { energy: 7, capital: 3 }, effect: { finance: 2, reputation: 3 }, log: "与供应商协商分期并公开说明。" },
      { label: "先拖着，任期内账面别难看", note: "账不会消失，只会换人背。", cost: {}, effect: { finance: -8, discipline: 8, reputation: -7 }, delayed: { finance: -8, reputation: -5 }, hiddenRisk: 15, log: "项目尾款被拖延到任期之后。" },
    ],
  },
  {
    stage: "late",
    tag: "审计",
    pressure: "离任复盘",
    title: "离任审计预通知到了",
    text: "审计组会重点看项目决策、资金流向和整改闭环。你可以把问题主动摊开，也可以赌他们查不到细处。",
    choices: [
      { label: "主动自查，把问题先整改", note: "有些账不好看，但主动补救还有机会。", cost: { energy: 10, capital: 4 }, effect: { discipline: -10, reputation: 6, finance: 2 }, risk: -6, log: "离任审计前主动自查并整改问题。" },
      { label: "按要求准备材料，不额外发挥", note: "合规应对，但不主动揭短。", cost: { energy: 5 }, effect: { discipline: -2, capital: 2 }, log: "按离任审计要求准备材料。" },
      { label: "找人打听审计重点，避重就轻", note: "也许能躲过一时，风险会更集中。", cost: { network: 5 }, effect: { discipline: 12, reputation: -6, capital: -3 }, hiddenRisk: 18, chance: { p: 0.3, pass: "审计重点暂时没有落到你的薄弱处。", fail: "审计组发现材料口径异常，扩大了核查范围。" }, log: "试图打听审计重点并避重就轻。" },
    ],
  },
  {
    stage: "any",
    tag: "突发",
    pressure: "极端天气",
    title: "强对流天气打乱了所有安排",
    text: "原定调研、会议、项目验收全部撞上应急值守。计划再周密，也要给突发留余量。",
    choices: [
      { label: "转入应急响应，压后非急事项", note: "计划乱了，但安全优先。", cost: { energy: 10, family: 5 }, effect: { people: 7, reputation: 4, discipline: -2 }, log: "转入应急响应，压后非急事项。" },
      { label: "保重点应急，其他线上处理", note: "兼顾效率和底线。", cost: { energy: 7, capital: 2 }, effect: { people: 4, quality: 2 }, log: "重点应急事项现场处理，其余线上协调。" },
      { label: "按原计划推进，基层自行应对", note: "日程没乱，风险给了基层。", cost: {}, effect: { people: -6, reputation: -5, discipline: 5 }, hiddenRisk: 8, log: "按原计划推进，基层独自应急。" },
    ],
  },
  {
    stage: "any",
    tag: "网络",
    pressure: "留言刷屏",
    title: "政务号评论区突然被同一诉求刷屏",
    text: "有真实问题，也有人借机带节奏。删评最快，核查最慢。",
    choices: [
      { label: "公开接诉，线下核查", note: "慢，但把问题和情绪都接住。", cost: { energy: 9, capital: 3 }, effect: { people: 7, reputation: 6, discipline: -2 }, log: "公开接诉并安排线下核查。" },
      { label: "先置顶说明核查进度", note: "稳住节奏，再查事实。", cost: { energy: 5 }, effect: { reputation: 4, people: 3 }, log: "置顶说明核查进度。" },
      { label: "批量删评，避免扩散", note: "页面清净了，信任更脏了。", cost: { capital: 1 }, effect: { reputation: -9, people: -5, discipline: 6 }, hiddenRisk: 12, log: "批量删除评论，舆情隐患加深。" },
    ],
  },
  {
    stage: "any",
    tag: "群众",
    pressure: "临时求助",
    title: "一户困难家庭突然断了收入",
    text: "按常规救助流程要等材料齐全，但眼前生活已经撑不住。特事特办也要守程序。",
    choices: [
      { label: "启动临时救助并补齐程序", note: "先托底，再把手续做严。", cost: { funds: 8, energy: 6 }, effect: { people: 9, reputation: 5, discipline: -2 }, log: "启动临时救助并补齐程序。" },
      { label: "先由社区垫付，部门跟进", note: "能救急，但不能长期这么靠。", cost: { network: 3, energy: 4 }, effect: { people: 5, reputation: 2 }, log: "社区先行垫付救急，部门后续跟进。" },
      { label: "等材料齐全再办理", note: "程序没错，人可能等不起。", cost: {}, effect: { people: -7, reputation: -6, discipline: 1 }, log: "困难家庭等待材料齐全后再办理救助。" },
    ],
  },
];

const annualEvents = [
  {
    year: 1,
    title: "第一年述职：基础账本摊开了",
    text: "这一年你不是每件事都办漂亮，但摸清了不少底数。真正的开局，不是先造声势，而是知道难题在哪里。",
    condition: (s) => s.resources.network >= 42 && s.stats.reputation >= 48,
    effect: { capital: 5, network: 5, reputation: 3 },
  },
  {
    year: 2,
    title: "第二年述职：建功窗口打开了",
    text: "组织看见了你前期积累的人脉、台账和群众基础，一个更大的攻坚机会摆到你面前。",
    condition: (s) => s.resources.network >= 48 && s.stats.people >= 55 && s.stats.discipline <= 42,
    effect: { capital: 7, quality: 5, reputation: 4 },
  },
  {
    year: 3,
    title: "第三年述职：掌声和风险同时靠近",
    text: "成绩开始显现，找你的人也多了。越是临近收官，越有人劝你“差不多就行”。",
    condition: (s) => s.stats.quality >= 58 || s.stats.reputation >= 62,
    effect: { capital: 4, network: 4, discipline: 2 },
  },
  {
    title: "家人提醒你已经很久没一起吃晚饭",
    text: "日历上很多空白都被临时会议填满。真正的担当，也需要学会修复身边人的失落。",
    condition: (s) => s.resources.family <= 35,
    effect: { family: -6, energy: -4, reputation: 2 },
  },
  {
    title: "审计发现几个项目台账说不清",
    text: "当初为了赶进度留下的模糊地带，现在变成了问责风险。",
    condition: (s) => s.hiddenRisk >= 45 || s.stats.discipline >= 55,
    effect: { discipline: 8, capital: -6, reputation: -6 },
  },
];

const incidentEvents = [
  {
    title: "连续攻坚后，你在会场上短暂耳鸣",
    text: "这段时间你把最难的事都揽在身上，干部们佩服你，也开始担心你撑不住。医生建议你至少休息两天，但明天还有协调会。",
    condition: (s) => s.serviceBurden >= 18 || s.resources.energy <= 34,
    effect: { energy: -9, family: -3, reputation: 2 },
    effectText: "精力 -9，家庭陪伴 -3，长期口碑 +2",
  },
  {
    title: "家人发来一条很短的消息",
    text: "消息只有一句：'你忙吧。' 你知道这不是理解，而是失望攒到说不动了。",
    condition: (s) => s.serviceBurden >= 16 || s.resources.family <= 38,
    effect: { family: -10, energy: -4 },
    effectText: "家庭陪伴 -10，精力体力 -4",
  },
  {
    title: "财政所提醒你：好事实事也要算账",
    text: "几个民生项目都是真需要，但支付节点挤到一起，账上现金流开始紧。为民办事不是喊口号，钱从哪里来必须说清。",
    condition: (s) => s.stats.people >= 58 || s.resources.funds <= 34,
    effect: { funds: -10, finance: -5, capital: -2 },
    effectText: "可用资金 -10，财政健康 -5，组织信任 -2",
  },
  {
    title: "基层干部私下抱怨：好事太多也会累",
    text: "你坚持把事办实，但每个项目都要台账、协调、验收。队伍不是铁打的，善作为也要会统筹。",
    condition: (s) => s.serviceBurden >= 22 || s.resources.energy <= 42,
    effect: { energy: -7, network: -4, people: -2 },
    effectText: "精力体力 -7，人脉资源 -4，群众获得感 -2",
  },
  {
    title: "一段断章取义的视频被转发",
    text: "你在现场说'这个问题不能今天就承诺'，本意是要依法核账，却被剪成了不作为。真实工作有时比漂亮表态更难被理解。",
    condition: (s) => s.stats.reputation >= 55 || s.stats.people >= 55,
    effect: { reputation: -8, capital: -4, energy: -4 },
    effectText: "长期口碑 -8，组织信任 -4，精力体力 -4",
  },
  {
    title: "上级临时抽调你去专班",
    text: "你前期表现不错，新的任务也找上门。机会是真的，额外负担也是真的。",
    condition: (s) => s.stats.reputation >= 60 && s.resources.capital >= 48,
    effect: { capital: 5, energy: -10, family: -5, quality: 3 },
    effectText: "组织信任 +5，发展质量 +3，精力体力 -10，家庭陪伴 -5",
  },
  {
    title: "一次侥幸选择被群众重新提起",
    text: "你以为那件事已经过去了。可基层记忆很长，群众也会把前后账连起来看。",
    condition: (s) => s.hiddenRisk >= 30,
    effect: { discipline: 7, reputation: -6, capital: -4 },
    effectText: "纪律风险 +7，长期口碑 -6，组织信任 -4",
  },
  {
    title: "难得的好运：老问题自己松动了一点",
    text: "前任留下的一个协调难点突然有了转机。不是每次努力都有回报，但这次天平朝你这边偏了一下。",
    condition: (s) => s.luck > 0.72,
    effect: { funds: 6, network: 5, energy: 3 },
    effectText: "可用资金 +6，人脉资源 +5，精力体力 +3",
  },
  {
    title: "临时迎检通知压了下来",
    text: "检查组明天到，几个真实问题还没完全整改。有人建议先把资料补齐、现场清一清，你知道真正整改没有捷径。",
    condition: (s) => s.stats.quality >= 48 || s.hiddenRisk >= 24,
    effect: { energy: -8, family: -4, discipline: 3 },
    effectText: "精力体力 -8，家庭陪伴 -4，纪律风险 +3",
  },
  {
    title: "政务系统突然故障",
    text: "窗口排队的人越聚越多，后台技术人员还在排查。数字化能提效，也会在故障时把压力集中到一线。",
    condition: (s) => s.stats.people >= 45,
    effect: { people: -5, reputation: -5, energy: -5 },
    effectText: "群众获得感 -5，长期口碑 -5，精力体力 -5",
  },
  {
    title: "供应商在楼道里堵住了你",
    text: "他说项目已经验收，尾款却迟迟没到。每一个'为民办事'的项目背后，都有合同、现金流和信用。",
    condition: (s) => s.resources.funds <= 42 || s.stats.finance <= 42,
    effect: { finance: -5, reputation: -4, capital: -3 },
    effectText: "财政健康 -5，长期口碑 -4，组织信任 -3",
  },
  {
    title: "家属被熟人绕着请托",
    text: "对方没有直接找你，而是找到了家里人。你发现边界不是只在办公室里才需要守。",
    condition: (s) => s.resources.network >= 50 || s.hiddenRisk >= 20,
    effect: { discipline: 5, family: -5, reputation: -3 },
    effectText: "纪律风险 +5，家庭陪伴 -5，长期口碑 -3",
  },
  {
    title: "一名干部因为过劳请了长假",
    text: "他是你最能依靠的骨干之一。工作往前冲的时候，队伍承受力也在被消耗。",
    condition: (s) => s.serviceBurden >= 20 || s.resources.energy <= 38,
    effect: { energy: -6, quality: -4, network: -4 },
    effectText: "精力体力 -6，发展质量 -4，人脉资源 -4",
  },
];

let state = createBlankState();

function createBlankState() {
  return {
    role: null,
    turn: 0,
    stats: {},
    resources: {},
    log: [],
    delayed: [],
    annualReview: null,
    gameOver: false,
    hiddenRisk: 0,
    serviceBurden: 0,
    luck: Math.random(),
    usedEventIds: [],
    recentTags: [],
    usedIncidentTitles: [],
    pendingIncident: null,
  };
}

function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function stageOfTurn(turn = state.turn) {
  const year = Math.floor(turn / 4) + 1;
  if (year <= 1) return "early";
  if (year <= 3) return "middle";
  return "late";
}

function stageLabel() {
  const stage = stageOfTurn();
  if (stage === "early") return stageNames[0];
  if (stage === "middle") return stageNames[1];
  return stageNames[2];
}

function startRole(roleId) {
  const role = roles.find((item) => item.id === roleId);
  state = createBlankState();
  state.role = role;
  state.stats = { ...role.stats };
  state.resources = { ...role.resources };
  state.log = [`到任${role.name}，任期正式开始。你的隐藏运气值是 ${(state.luck * 100).toFixed(0)}，但没人知道它会救你几次。`];
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("resultScreen").classList.add("hidden");
  document.getElementById("playScreen").classList.remove("hidden");
  render();
}

function currentEvent() {
  if (state.annualReview) return state.annualReview;
  return pickEvent();
}

function pickEvent() {
  if (state.currentEvent) return state.currentEvent;
  const stage = stageOfTurn();
  const stageEvents = events
    .map((event, index) => ({ event, index }))
    .filter(({ event }) => event.stage === stage);
  const anyEvents = events
    .map((event, index) => ({ event, index }))
    .filter(({ event }) => event.stage === "any");
  const rollStageOnly = Math.random() < 0.72;
  const primary = rollStageOnly ? stageEvents : [...stageEvents, ...anyEvents];
  const secondary = rollStageOnly ? [...stageEvents, ...anyEvents] : stageEvents;
  const source =
    filterEventPool(primary).length ? filterEventPool(primary) :
    filterEventPool(secondary).length ? filterEventPool(secondary) :
    primary.filter(({ index }) => !state.usedEventIds.includes(index)).length ? primary.filter(({ index }) => !state.usedEventIds.includes(index)) :
    secondary.length ? secondary :
    events.map((event, index) => ({ event, index }));
  const pickedItem = source[randomBetween(0, source.length - 1)];
  const picked = pickedItem.event;
  state.currentEvent = picked;
  return picked;
}

function filterEventPool(pool) {
  return pool.filter(({ event, index }) => {
    const unused = !state.usedEventIds.includes(index);
    const tagFresh = !state.recentTags.includes(event.tag);
    return unused && tagFresh;
  });
}

function markEventUsed(event) {
  const index = events.indexOf(event);
  if (index >= 0) state.usedEventIds.push(index);
  state.recentTags.unshift(event.tag);
  state.recentTags = state.recentTags.slice(0, 4);
}

function turnLabel() {
  const year = Math.floor(state.turn / 4) + 1;
  const season = seasons[state.turn % 4];
  return `第 ${year} 年 ${season} · ${stageLabel()}`;
}

function formatCost(cost = {}) {
  const parts = Object.entries(cost)
    .filter(([, value]) => value)
    .map(([key, value]) => `${resourceLabels[key]}${value > 0 ? "-" : "+"}${Math.abs(value)}`);
  return parts.length ? parts.join(" / ") : "无需额外资源";
}

function canAfford(cost = {}) {
  return Object.entries(cost).every(([key, value]) => value <= 0 || state.resources[key] >= value);
}

function applyDelta(delta = {}) {
  Object.entries(delta).forEach(([key, value]) => {
    if (key in state.stats) state.stats[key] = clamp(state.stats[key] + value);
    if (key in state.resources) state.resources[key] = clamp(state.resources[key] + value);
  });
}

function choose(choiceIndex) {
  const event = currentEvent();
  if (choiceIndex === -1) {
    forceCompromise(event);
    return;
  }
  const choice = event.choices[choiceIndex];
  if (!choice || !canAfford(choice.cost)) return;

  Object.entries(choice.cost || {}).forEach(([key, value]) => {
    state.resources[key] = clamp(state.resources[key] - value);
  });

  applyDelta(choice.effect);
  accumulateServiceBurden(choiceIndex, choice);
  state.hiddenRisk = clamp(state.hiddenRisk + (choice.hiddenRisk || 0) + (choice.risk || 0));
  resolveChance(choice);
  if (choice.delayed) state.delayed.push(choice.delayed);
  state.log.unshift(`${turnLabel()}：${choice.log}`);

  if (state.annualReview) {
    state.annualReview = null;
  } else {
    markEventUsed(event);
    state.currentEvent = null;
    state.turn += 1;
    applyDelayedConsequences();
    recoverResources();
    applyLateStageFatigue();
    maybeHiddenRiskBurst();
    maybeRandomIncident();
    maybeAnnualReview();
  }

  checkEnd();
  render();
}

function forceCompromise(event) {
  applyDelta({ people: -8, reputation: -7, discipline: 5, energy: -6, capital: -4 });
  state.hiddenRisk = clamp(state.hiddenRisk + 8);
  state.serviceBurden = clamp(state.serviceBurden + 8);
  state.log.unshift(`${turnLabel()}：资源见底，只能用最低标准兜底处理“${event.title}”。`);

  if (state.annualReview) {
    state.annualReview = null;
  } else {
    markEventUsed(event);
    state.currentEvent = null;
    state.turn += 1;
    applyDelayedConsequences();
    recoverResources();
    applyLateStageFatigue();
    maybeHiddenRiskBurst();
    maybeRandomIncident();
    maybeAnnualReview();
  }

  checkEnd();
  render();
}

function accumulateServiceBurden(choiceIndex, choice) {
  const costTotal = Object.values(choice.cost || {})
    .filter((value) => value > 0)
    .reduce((sum, value) => sum + value, 0);
  const base = choiceIndex === 0 ? 8 : choiceIndex === 1 ? 4 : 1;
  const extra = Math.floor(costTotal / 10);
  state.serviceBurden = clamp(state.serviceBurden + base + extra - (choice.hiddenRisk ? 2 : 0));
}

function resolveChance(choice) {
  if (!choice.chance) return;
  const luckBonus = state.luck * 0.18;
  const riskPenalty = state.hiddenRisk / 260;
  const passRate = Math.max(0.05, Math.min(0.9, choice.chance.p + luckBonus - riskPenalty));
  if (Math.random() < passRate) {
    state.log.unshift(`侥幸判定：${choice.chance.pass}`);
    state.hiddenRisk = clamp(state.hiddenRisk - 3);
  } else {
    state.log.unshift(`爆雷判定：${choice.chance.fail}`);
    applyDelta({ discipline: 9, reputation: -7, capital: -4 });
    state.hiddenRisk = clamp(state.hiddenRisk + 8);
  }
}

function applyDelayedConsequences() {
  if (!state.delayed.length) return;
  if (Math.random() < 0.68) {
    const delta = state.delayed.shift();
    applyDelta(delta);
    state.log.unshift(`${turnLabel()}：前期选择的后果开始显现。`);
  }
}

function recoverResources() {
  const burdenPenalty = Math.floor(state.serviceBurden / 18);
  state.resources.funds = clamp(state.resources.funds + randomBetween(3, 6));
  state.resources.energy = clamp(state.resources.energy + randomBetween(4, 7) - burdenPenalty);
  state.resources.family = clamp(state.resources.family + randomBetween(2, 5) - Math.floor(burdenPenalty / 2));
  state.resources.capital = clamp(state.resources.capital + randomBetween(2, 4));
  state.resources.network = clamp(state.resources.network + randomBetween(1, 3));
  state.serviceBurden = clamp(state.serviceBurden - randomBetween(2, 5));

  if (state.resources.family < 24) {
    state.resources.energy = clamp(state.resources.energy - 4);
    state.log.unshift(`${turnLabel()}：家庭亏欠开始反噬你的状态。`);
  }
  if (state.resources.energy < 18) {
    state.stats.people = clamp(state.stats.people - 3);
    state.log.unshift(`${turnLabel()}：长期透支让判断和耐心都变差了。`);
  }
}

function applyLateStageFatigue() {
  if (stageOfTurn() !== "late") return;
  const fatigue = randomBetween(3, 7);
  state.resources.energy = clamp(state.resources.energy - fatigue);
  state.resources.family = clamp(state.resources.family - randomBetween(1, 4));
  state.log.unshift(`${turnLabel()}：任期后段精力自然下滑，保晚节变得更难。`);
}

function maybeHiddenRiskBurst() {
  const burstRate = Math.max(0, (state.hiddenRisk - 24) / 130);
  if (Math.random() < burstRate) {
    const hit = randomBetween(5, 13);
    applyDelta({ discipline: hit, reputation: -randomBetween(4, 9), capital: -randomBetween(2, 7) });
    state.hiddenRisk = clamp(state.hiddenRisk - randomBetween(8, 18));
    state.log.unshift(`风险爆发：过去积累的侥幸账被翻出来一笔，纪律风险上升 ${hit}。`);
  }
}

function maybeRandomIncident() {
  if (state.pendingIncident || state.gameOver) return;
  const stageBonus = stageOfTurn() === "late" ? 0.09 : stageOfTurn() === "middle" ? 0.05 : 0.02;
  const burdenRate = state.serviceBurden / 180;
  const riskRate = state.hiddenRisk / 240;
  const lowResourceRate = (state.resources.energy < 35 || state.resources.family < 35 || state.resources.funds < 30) ? 0.12 : 0;
  const triggerRate = Math.min(0.58, 0.12 + stageBonus + burdenRate + riskRate + lowResourceRate);
  if (Math.random() >= triggerRate) return;

  const pool = incidentEvents.filter((incident) => incident.condition(state) && !state.usedIncidentTitles.includes(incident.title));
  if (!pool.length) return;
  const incident = pool[randomBetween(0, pool.length - 1)];
  applyDelta(incident.effect);
  state.serviceBurden = clamp(state.serviceBurden + 4);
  state.pendingIncident = incident;
  state.usedIncidentTitles.push(incident.title);
  state.log.unshift(`意外事件：${incident.title}`);
}

function maybeAnnualReview() {
  if (state.turn > 0 && state.turn % 4 === 0 && state.turn < 16) {
    const year = Math.floor(state.turn / 4);
    const review = annualEvents.find((item) => (!item.year || item.year === year) && item.condition(state)) || {
      title: `第${year}年述职：有些账还欠着`,
      text: "有些事见效，有些账还欠着。任期不会因为一句口号变轻，下一年还得继续往前走。",
      effect: { energy: 4, capital: 2 },
    };
    state.annualReview = {
      tag: "年终述职",
      pressure: "年度复盘",
      title: review.title,
      text: review.text,
      choices: [
        {
          label: "把复盘结果带回下一年",
          note: "不回避问题，也不否定已经走过的路。",
          cost: {},
          effect: review.effect,
          log: review.title,
        },
      ],
    };
  }
}

function checkEnd() {
  const s = state.stats;
  const r = state.resources;
  if (s.discipline >= 82) {
    endGame("纪律红线失守", "任期还没结束，审计和群众举报已经把问题推到台前。那些曾经看似省事的选择，最终变成最沉重的账。");
    return;
  }
  if (r.energy <= 4) {
    endGame("透支到无法履职", "你把自己烧得太快，很多事还没办完，身体和情绪先倒下了。真正的久久为功，也需要有节奏地担当。");
    return;
  }
  if (r.family <= 2) {
    endGame("功业未成，家书先冷", "你一直在一线，但家庭陪伴被压到几乎归零。这个结局不否定担当，只提醒你：长期作战也需要把身边人的支持守住。");
    return;
  }
  if (state.turn >= 16 && !state.annualReview) {
    if (s.people >= 76 && s.reputation >= 76 && s.discipline <= 35 && s.ecology >= 55 && s.finance >= 35) {
      endGame("清廉务实，功业在人心", "四年里没有每次都风光，却把一批难题实实在在往前推了。群众知道你花了钱、熬了夜、欠了家人很多陪伴，也知道你始终没有把原则拿去交换掌声。");
    } else if (s.discipline <= 38 && s.people >= 64 && s.reputation >= 64) {
      endGame("稳扎稳打，口碑渐起", "任期账本并不完美，但大方向站得住。你把不少资源投向了不显眼的地方，时间久了，真实改变开始长出来。");
    } else if (s.quality >= 70 && s.people < 52) {
      endGame("数据漂亮，群众无感", "报表上有增速，镜头里有亮点，可群众最急的几件事没有真正落地。这样的政绩看得见，却站不久。");
    } else if (s.finance < 22) {
      endGame("一时热闹，债务压身", "几个项目确实轰轰烈烈，但财政账越滚越紧。后来者接过来的不是功劳簿，而是一串沉重的还款计划。");
    } else if (state.hiddenRisk >= 55 && state.luck > 0.75) {
      endGame("惊险过关，侥幸不是本事", "你几次踩在边缘却没有当场爆雷。运气很好，但群众和组织不会永远替侥幸买单。下一任期再这样走，未必还能全身而退。");
    } else {
      endGame("有得有失，仍需淬炼", "你经历了很多真实拉扯，也做成了一些事。但正确政绩观不是知道一次就够，它要在每次压力袭来时重新选择。");
    }
  }
}

function endGame(title, text) {
  state.gameOver = true;
  state.ending = { title, text };
}

function renderRoles() {
  const grid = document.getElementById("roleGrid");
  grid.innerHTML = roles
    .map((role) => `<button class="role-card" type="button" data-role="${role.id}"><strong>${role.name}</strong><span>${role.text}</span></button>`)
    .join("");
  grid.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => startRole(button.dataset.role));
  });
}

function renderMeters() {
  const meters = document.getElementById("meters");
  meters.innerHTML = Object.entries(statLabels)
    .map(([key, label]) => {
      const value = state.stats[key] ?? 50;
      const isRisk = key === "discipline";
      const warn = (!isRisk && value < 35) || (isRisk && value > 55);
      return `<div class="meter">
        <div class="meter-label"><span>${label}</span><strong>${value}</strong></div>
        <div class="bar ${isRisk ? "risk" : ""} ${warn ? "warn" : ""}"><i style="width:${value}%"></i></div>
      </div>`;
    })
    .join("");
}

function renderResources() {
  const resources = document.getElementById("resources");
  resources.innerHTML = Object.entries(resourceLabels)
    .map(([key, label]) => {
      const value = state.resources[key] ?? 50;
      return `<div class="resource">
        <div class="resource-label"><span>${label}</span><strong>${value}</strong></div>
        <div class="bar ${value < 25 ? "warn" : ""}"><i style="width:${value}%"></i></div>
      </div>`;
    })
    .join("");
}

function renderLog() {
  const list = document.getElementById("logList");
  list.innerHTML = state.log.slice(0, 12).map((item) => `<li>${item}</li>`).join("");
}

function renderEvent() {
  if (!state.role) return;

  document.getElementById("termLabel").textContent = state.gameOver ? "任期结束" : turnLabel();
  document.getElementById("roleLabel").textContent = state.role.name;

  if (state.gameOver) {
    document.getElementById("playScreen").classList.add("hidden");
    document.getElementById("resultScreen").classList.remove("hidden");
    document.getElementById("endingTitle").textContent = state.ending.title;
    document.getElementById("endingText").textContent = state.ending.text;
    document.getElementById("endingBadges").innerHTML = [
      `群众获得感 ${state.stats.people}`,
      `纪律风险 ${state.stats.discipline}`,
      `长期口碑 ${state.stats.reputation}`,
      `家庭陪伴 ${state.resources.family}`,
      `隐藏风险 ${state.hiddenRisk}`,
    ].map((item) => `<span>${item}</span>`).join("");
    return;
  }

  const event = currentEvent();
  const hasAffordableChoice = event.choices.some((choice) => canAfford(choice.cost));
  document.getElementById("eventTag").textContent = `${event.tag} · ${stageLabel()}`;
  document.getElementById("eventPressure").textContent = event.pressure;
  document.getElementById("eventTitle").textContent = event.title;
  document.getElementById("eventText").textContent = event.text;
  const choicesHtml = event.choices
    .map((choice, index) => {
      const disabled = canAfford(choice.cost) ? "" : "disabled";
      const blocked = disabled ? "资源不足，无法选择" : formatCost(choice.cost);
      const randomTip = choice.chance ? " · 含随机判定" : "";
      return `<button class="choice-card" type="button" data-choice="${index}" ${disabled}>
        <strong>${choice.label}</strong>
        <span>${choice.note}</span>
        <span class="cost">${blocked}${randomTip}</span>
      </button>`;
    })
    .join("");
  const fallbackHtml = hasAffordableChoice ? "" : `<button class="choice-card" type="button" data-choice="-1">
        <strong>资源见底，最低标准兜底</strong>
        <span>这不是好办法，只是让事情不至于当场失控。群众、组织和纪律账都会受损。</span>
        <span class="cost">无需额外资源 · 后果严重</span>
      </button>`;
  document.getElementById("choiceList").innerHTML = choicesHtml + fallbackHtml;
  document.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => choose(Number(button.dataset.choice)));
  });
}

function renderIncident() {
  const modal = document.getElementById("incidentModal");
  if (!modal) return;
  if (!state.pendingIncident) {
    modal.classList.add("hidden");
    return;
  }
  document.getElementById("incidentTitle").textContent = state.pendingIncident.title;
  document.getElementById("incidentText").textContent = state.pendingIncident.text;
  document.getElementById("incidentEffect").textContent = state.pendingIncident.effectText;
  modal.classList.remove("hidden");
}

function closeIncident() {
  state.pendingIncident = null;
  renderIncident();
  checkEnd();
  render();
}

function render() {
  renderMeters();
  renderResources();
  renderLog();
  renderEvent();
  renderIncident();
}

function restart() {
  state = createBlankState();
  document.getElementById("termLabel").textContent = "第 1 年 春";
  document.getElementById("roleLabel").textContent = "岗位待定";
  document.getElementById("startScreen").classList.remove("hidden");
  document.getElementById("playScreen").classList.add("hidden");
  document.getElementById("resultScreen").classList.add("hidden");
  document.getElementById("incidentModal").classList.add("hidden");
  render();
}

document.getElementById("restartTop").addEventListener("click", restart);
document.getElementById("restartEnd").addEventListener("click", restart);
document.getElementById("incidentClose").addEventListener("click", closeIncident);
renderRoles();
restart();
