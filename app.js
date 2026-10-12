const lessons=[
{id:1,title:"你好！",sub:"Chào bạn!",level:"HSK 1",words:8,read:[["你好！","Nǐ hǎo!","Xin chào!"],["你叫什么名字？","Nǐ jiào shénme míngzi?","Bạn tên là gì?"],["我叫李明。","Wǒ jiào Lǐ Míng.","Tôi tên là Lý Minh."],["很高兴认识你。","Hěn gāoxìng rènshi nǐ.","Rất vui được làm quen với bạn."]]},
{id:2,title:"你吃什么？",sub:"Bạn ăn gì?",level:"HSK 1",words:10,read:[["你吃什么？","Nǐ chī shénme?","Bạn ăn gì?"],["我吃米饭。","Wǒ chī mǐfàn.","Tôi ăn cơm."],["你喝咖啡吗？","Nǐ hē kāfēi ma?","Bạn uống cà phê không?"],["我喝茶。","Wǒ hē chá.","Tôi uống trà."]]},
{id:3,title:"明天天气怎么样？",sub:"Thời tiết ngày mai thế nào?",level:"HSK 2",words:12,read:[["明天天气怎么样？","Míngtiān tiānqì zěnmeyàng?","Thời tiết ngày mai thế nào?"],["明天可能会下雨。","Míngtiān kěnéng huì xiàyǔ.","Ngày mai có thể sẽ mưa."],["你要多穿一点儿。","Nǐ yào duō chuān yìdiǎnr.","Bạn nên mặc thêm một chút."]]}
];
const vocab=[
["你好","nǐ hǎo","xin chào","HSK 1"],["名字","míngzi","tên","HSK 1"],["认识","rènshi","quen, biết","HSK 1"],["高兴","gāoxìng","vui, vui mừng","HSK 1"],
["吃","chī","ăn","HSK 1"],["米饭","mǐfàn","cơm","HSK 1"],["喝","hē","uống","HSK 1"],["咖啡","kāfēi","cà phê","HSK 1"],
["天气","tiānqì","thời tiết","HSK 2"],["明天","míngtiān","ngày mai","HSK 1"],["可能","kěnéng","có thể","HSK 2"],["下雨","xiàyǔ","mưa","HSK 2"],
["穿","chuān","mặc","HSK 2"],["一点儿","yìdiǎnr","một chút","HSK 2"],["喜欢","xǐhuan","thích","HSK 1"],["学习","xuéxí","học tập","HSK 1"]
];
let state=JSON.parse(localStorage.getItem("cnStudy")||'{"done":[],"words":[]}');
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function save(){localStorage.setItem("cnStudy",JSON.stringify(state));updateProgress()}
function show(id){$$(".view").forEach(x=>x.classList.remove("active"));$("#"+id).classList.add("active");$$(".nav").forEach(x=>x.classList.toggle("active",x.dataset.view===id));window.scrollTo({top:0,behavior:"smooth"})}
function updateProgress(){let p=Math.round(state.done.length/lessons.length*100);$("#homeProgress").textContent=p+"%";$("#homeBar").style.width=p+"%";$("#statLessons").textContent=state.done.length;$("#statWords").textContent=state.words.length;$("#statRate").textContent=p+"%";$("#weekBar").style.width=Math.min(100,state.done.length/3*100)+"%"}
function renderLessons(){let html=lessons.map(l=>`<div class="lesson-item" onclick="openLesson(${l.id})"><div class="lesson-no">${l.id}</div><div><b>${l.title}</b><div>${l.sub}</div></div><span class="meta">${l.level} · ${l.words} từ ${state.done.includes(l.id)?"✓ Đã học":"→"}</span></div>`).join("");$("#lessonList").innerHTML=html;$("#lessonCards").innerHTML=lessons.map(l=>`<div class="card" onclick="openLesson(${l.id})"><span class="num">BÀI ${String(l.id).padStart(2,"0")}</span><h3>${l.title}</h3><p>${l.sub}</p><small>${l.level} · ${l.words} từ</small></div>`).join("")}
function openLesson(id){let l=lessons.find(x=>x.id===id);show("lessonDetail");$("#detail").innerHTML=`<div class="detail-head"><p class="eyebrow">${l.level} · BÀI ${l.id}</p><h1>${l.title}</h1><p>${l.sub}</p><div class="audio"><button class="primary" onclick="speakLesson(${l.id})">🔊 Nghe bài</button><select class="speed" id="speed"><option value=".7">0.7×</option><option value=".9">0.9×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option></select></div></div><div class="detail-grid"><div class="reading"><h3>📖 Bài đọc</h3>${l.read.map((x,i)=>`<div class="line" onclick="speak(${JSON.stringify(x[0])})"><div class="cn">${x[0]}</div><div class="py">${x[1]}</div><div class="vi">${x[2]}</div></div>`).join("")}</div><aside class="side"><h3>🎯 Nhiệm vụ</h3><p>Đọc to từng câu, nghe lại và ghi nhớ từ mới.</p><button class="primary" onclick="completeLesson(${l.id})">${state.done.includes(l.id)?"✓ Đã hoàn thành":"Đánh dấu hoàn thành"}</button></aside></div>`}
function speak(text){if(!("speechSynthesis"in window)){alert("Trình duyệt không hỗ trợ đọc tiếng Trung.");return}speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(text);u.lang="zh-CN";u.rate=+($("#speed")?.value||1);speechSynthesis.speak(u)}
function speakLesson(id){let l=lessons.find(x=>x.id===id);speak(l.read.map(x=>x[0]).join(" "))}
function completeLesson(id){if(!state.done.includes(id))state.done.push(id);save();renderLessons();openLesson(id)}
function renderVocab(){let q=($("#search")?.value||"").toLowerCase(),lev=$("#level")?.value||"all";let arr=vocab.filter(x=>(lev==="all"||x[3]===lev)&&x.join(" ").toLowerCase().includes(q));$("#vocabGrid").innerHTML=arr.map(x=>`<div class="word" onclick="speak('${x[0]}');addWord('${x[0]}')"><div class="cn">${x[0]}</div><small>${x[1]} · ${x[3]}</small><div class="meaning">${x[2]}</div><small>🔊 Chạm để nghe</small></div>`).join("")||"<p>Không tìm thấy từ.</p>"}
function addWord(w){if(!state.words.includes(w)){state.words.push(w);save()}}
$$("[data-view]").forEach(b=>b.addEventListener("click",()=>show(b.dataset.view)));
$("#mobileMenu").onclick=()=>$(".topbar").classList.toggle("open");$("#backLessons").onclick=()=>show("lessons");$("#search").oninput=renderVocab;$("#level").onchange=renderVocab;$("#reset").onclick=()=>{if(confirm("Đặt lại toàn bộ tiến độ?")){state={done:[],words:[]};save();renderLessons();renderVocab()}};
renderLessons();renderVocab();updateProgress();
