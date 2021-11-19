const leftSide = document.querySelector('.left-side');
const rightSide = document.querySelector('.right-side');

// InitialValues
let leftList = [
  { id: 'item1', checked: false, title: 'PHP' },
  { id: 'item2', checked: false, title: 'Python' },
  { id: 'item3', checked: false, title: 'Ruby' },
  { id: 'item4', checked: false, title: 'C++' },
];
let rightList = [
  { id: 'item5', checked: false, title: 'HTML' },
  { id: 'item6', checked: false, title: 'Css' },
  { id: 'item7', checked: false, title: 'JavaScript' },
  { id: 'item8', checked: false, title: 'Java' },
];

renderDom(leftList, rightList);

// Render Dom
function renderDom(leftListToRender, rightListToRender) {
  leftListToRender.forEach((item) => {
    leftSide.innerHTML += `<div class="box">
        <input type="checkbox" class="input-box" id="${item.id}" />
        <label for="${item.id}">${item.title}</label>
        </div>`;
  });

  rightListToRender.forEach((item) => {
    rightSide.innerHTML += `<div class="box">
          <input type="checkbox" class="input-box" id="${item.id}" />
          <label for="${item.id}">${item.title}</label>
          </div>`;
  });

  registerEvents();
}

// Clear Dom
function clearDom() {
  document.querySelectorAll('.side').forEach((el) => {
    el.innerHTML = '';
  });
}

// Event
function registerEvents() {
  const allToLeft = document.querySelector('.all-to-left');
  const checkedToLeft = document.querySelector('.checked-to-left');
  const allToRight = document.querySelector('.all-to-right');
  const checkedToRight = document.querySelector('.checked-to-right');

  if (leftList.length == 0) {
    allToRight.classList.add('disabled');
    checkedToRight.classList.add('disabled');
    allToLeft.classList.remove('disabled');
    checkedToLeft.classList.remove('disabled');
  } else {
    allToRight.classList.remove('disabled');
    checkedToRight.classList.remove('disabled');
  }
  if (rightList.length == 0) {
    allToLeft.classList.add('disabled');
    checkedToLeft.classList.add('disabled');
    allToRight.classList.remove('disabled');
    checkedToRight.classList.remove('disabled');
  } else {
    allToLeft.classList.remove('disabled');
    checkedToLeft.classList.remove('disabled');
  }

  allToRight.addEventListener('click', () => {
    rightList = rightList.concat(leftList);
    leftList = [];
    clearDom();
    renderDom(leftList, rightList);
  });

  allToLeft.addEventListener('click', () => {
    leftList = leftList.concat(rightList);
    rightList = [];
    clearDom();
    renderDom(leftList, rightList);
  });

  checkedToLeft.addEventListener('click', () => {
    const inputBox = document.querySelectorAll('.input-box');
    inputBox.forEach((chkBox) => {
      if (chkBox.checked == true) {
        rightList.forEach((item, index) => {
          if (item.id == chkBox.id) {
            leftList = leftList.concat(item);
            rightList.splice(index, 1);
          }
        });
      }
    });
    clearDom();
    renderDom(leftList, rightList);
  });
  checkedToRight.addEventListener('click', () => {
    const inputBox = document.querySelectorAll('.input-box');
    inputBox.forEach((chkBox) => {
      if (chkBox.checked == true) {
        leftList.forEach((item, index) => {
          if (item.id == chkBox.id) {
            rightList = rightList.concat(item);
            leftList.splice(index, 1);
          }
        });
      }
    });
    clearDom();
    renderDom(leftList, rightList);
  });
}
