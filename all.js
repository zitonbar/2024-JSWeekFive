
let data = [
  {
    "id": 0,
    "name": "肥宅心碎賞櫻3日",
    "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    "area": "高雄",
    "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    "group": 87,
    "price": 1400,
    "rate": 10
  },
  {
    "id": 1,
    "name": "貓空纜車雙程票",
    "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台北",
    "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    "group": 99,
    "price": 240,
    "rate": 2
  },
  {
    "id": 2,
    "name": "台中谷關溫泉會1日",
    "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台中",
    "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    "group": 20,
    "price": 1765,
    "rate": 7
  }
];
// 宣告一個變數，名稱 ticketsData，值為一個空陣列，用於儲存透過 forEach() data的值及頁面上新增的套票值(資料)，並重新渲染頁面所使用
let ticketsData = [];
function getTicketsData() {
  data.forEach(item => {
    ticketsData.push(item);
  })
};

// 抓取渲染套票資料的 html 結點(ul)
const ticketContainer = document.querySelector('.ticketCard-area');

function renderTickets() {
  let ticketsItem = "";
  // 宣告一個變數
  const dataToRender = filteredTicketsData.length === 0 ? ticketsData : filteredTicketsData;
  dataToRender.forEach(ticketItem => {
    ticketsItem += `
    <li class="ticketCard">
      <div class="ticketCard-img">
        <a href="#">
          <img src="${ticketItem.imgUrl}" alt="">
        </a>
        <div class="ticketCard-region">${ticketItem.area}</div>
        <div class="ticketCard-rank">${ticketItem.rate}</div>
      </div>
      <div class="ticketCard-content">
        <div>
          <h3>
            <a href="#" class="ticketCard-name">${ticketItem.name}</a>
          </h3>
          <p class="ticketCard-description">
          ${ticketItem.description}
          </p>
        </div>
        <div class="ticketCard-info">
          <p class="ticketCard-num">
            <span><i class="fas fa-exclamation-circle"></i>
            </span> 剩下最後 <span id="ticketCard-num"> ${ticketItem.group} </span> 組
          </p>
          <p class="ticketCard-price">
            TWD <span id="ticketCard-price">${ticketItem.price}</span>
          </p>
        </div>
      </div>
    </li>`;
  });
  ticketContainer.innerHTML = ticketsItem;
  // 呼叫計算資料渲染筆數的函式
  searchResultNum();
};

// 新增計算資料渲染筆數的功能
const resultTextNum = document.getElementById('searchResult-text');
// 檢查是否有抓取到搜尋資料筆數的 html tag
function searchResultNum(){
  // 新增頁面渲染資料的判斷式，如 filteredTicketsData 陣列長度為 0 ，則顯示 ticketsData 的陣列長度，如果不是為 0 ， 則顯示 filterTicketsData 的長度
  let textNum = filteredTicketsData.length === 0 ? ticketsData.length : filteredTicketsData.length;
  resultTextNum.textContent = `本次搜尋共 ${textNum} 筆資料`;
}


// 新增下拉選單篩選的監聽事件
let filteredTicketsData = [];
const dropdownFilterBtn = document.querySelector('.regionSearch');
dropdownFilterBtn.addEventListener('change', (event)=>{
  const selectedValue = event.target.value;
  filteredTicketsData = [];
  if(selectedValue === "全部地區"){
    filteredTicketsData = ticketsData;
  }else{
    filteredTicketsData = ticketsData.filter(item => item.area === selectedValue);
  }
  renderTickets();
  searchResultNum();
});

// 新增頁面輸入新增套票資料功能

// 新增 "必填" 的 html 結構，設定為一個變數，以便後續以變數形式在多處使用
const errorMessage = `<i class="fas fa-exclamation-circle"></i><span>必填!</span>`;
// 新增 "新增套票" 的監聽事件
document.querySelector('.addTicket-btn').addEventListener('click', function(){
  const form = document.querySelector('.addTicket-form');
  const ticketName = document.getElementById('ticketName').value.trim();
  const ticketImgUrl = document.getElementById('ticketImgUrl').value.trim();
  const ticketRegion = document.getElementById('ticketRegion').value;
  const ticketPrice = document.getElementById('ticketPrice').value.trim();
  const ticketNum = document.getElementById('ticketNum').value.trim();
  const ticketRate = document.getElementById('ticketRate').value.trim();
  const ticketDescription = document.getElementById('ticketDescription').value.trim();
  let isValid = true;
  if(!ticketName){
    document.getElementById('ticketName-message').innerHTML = errorMessage;
    isValid = false;
  }else{
    document.getElementById('ticketName-message').innerHTML = '';
  };
  if(!ticketImgUrl){
    document.getElementById('ticketImgUrl-message').innerHTML = errorMessage;
    isValid = false;
  }else{
    document.getElementById('ticketImgUrl-message').innerHTML = '';
  };
  if(!ticketRegion){
    document.getElementById('ticketRegion-message').innerHTML = errorMessage;
    isValid = false;
  }else{
    document.getElementById('ticketRegion-message').innerHTML = '';
  };
  if(!ticketPrice){
    document.getElementById('ticketPrice-message').innerHTML = errorMessage;
    isValid = false;
  }else{
    document.getElementById('ticketPrice-message').innerHTML =  '';
  };
  if(!ticketNum){
    document.getElementById('ticketNum-message').innerHTML = errorMessage;
    isValid = false;
  }else{
    document.getElementById('ticketNum-message').innerHTML = '';
  };
  if(!ticketRate){
    document.getElementById('ticketRate-message').innerHTML = errorMessage;
    isValid = false;
  }else{
    document.getElementById('ticketRate-message').innerHTML = '';
  };
  if(!ticketDescription){
    document.getElementById('ticketDescription-message').innerHTML = errorMessage;
    isValid = false;
  }else{
    document.getElementById('ticketDescription-message').innerHTML = '';
  }
  return isValid;
});





// function addTicketContent () {
//   if(ticketName || ticketImgUrl || ticketRegion || ticketPrice || ticketNum || ticketRate || ticketDescription)

// };


function init(){
  getTicketsData();
  renderTickets();
}

init();