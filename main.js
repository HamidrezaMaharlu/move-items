const storage = []

class Side {
    constructor(title) {
        this.title = title
        this._checked = false
        this._id = Date.now().toString()
    }

    set status(val) {
        this._checked = val
    }

    set side(val) {
        this._side = val
    }
}

class LefSide extends Side {
    constructor(title) {
        super(title);
        this._side = "leftSide"
    }
}

class RightSide extends Side {
    constructor(title) {
        super(title);
        this._side = "rightSide"
    }
}


const leftInput = document.getElementById("left");
const rightInput = document.getElementById("right");
const addToLeftBtn = document.querySelector(".addToLeft");
const addToRightBtn = document.querySelector(".addToRight");
const leftSideSection = document.querySelector(".leftSide");
const rightSideSection = document.querySelector(".rightSide");
const operateSection = document.querySelector(".operate");

addToLeftBtn.addEventListener("click", function () {
    storage.push(new LefSide(leftInput.value));
    leftInput.value = ""
    render(storage)
})
addToRightBtn.addEventListener("click", function () {
    storage.push(new RightSide(rightInput.value));
    rightInput.value = ""
    render(storage)
})

function render(data) {
    leftSideSection.innerHTML = "";
    rightSideSection.innerHTML = "";
    operateSection.innerHTML = "";
    data.forEach(item => {
        if (item._side === "leftSide") {
            console.log(item._id)
            leftSideSection.insertAdjacentHTML("beforeend", `<div class="job">
<i class="bi bi-circle" onclick="checked.call(this,${item._id})"></i>
<label>${item.title}</label>
</div>`)
        }
        if (item._side === "rightSide") {
            rightSideSection.insertAdjacentHTML("beforeend", `<div class="job">
<i class="bi bi-circle" onclick="checked.call(this,${item._id})"></i>
<label>${item.title}</label>
</div>`)
        }
    })
    operateSection.insertAdjacentHTML("beforeend", `
        ${data.filter(item => item._side === "leftSide").length > 0 ? `<button class="leftToAll" onclick="leftToALL()"> >> </button>` : `<button class="leftToAll disable" disabled> >> </button>`}
        ${data.filter(item => item._side === "leftSide").length > 0 ? `<button class="leftToChecked" onclick="leftToCheck()" > > </button>` : `<button class="leftToChecked disable" disabled> > </button>`}
        ${data.filter(item => item._side === "rightSide").length > 0 ? `<button class="rightToAll" onclick="rightToALL()"> << </button>` : `<button class="rightToAll disable" disabled> << </button>`}
        ${data.filter(item => item._side === "rightSide").length > 0 ? `<button class="rightToChecked" onclick="rightToCheck()"> < </button>` : `<button class="rightToChecked disable" disabled> < </button>`}
         `)
}

render(storage)

function leftToALL() {
    storage.forEach(item => item.side = "rightSide")
    render(storage)
}

function rightToALL() {
    storage.forEach(item => item.side = "leftSide")
    render(storage)
}

function leftToCheck() {
    storage.forEach(item =>{
       if(item._checked) item.side = "rightSide"
    })
    render(storage)
    storage.forEach(item => item.status = false)
}
function rightToCheck() {
    storage.forEach(item =>{
        if(item._checked) item.side = "leftSide"
    })
    render(storage)
    storage.forEach(item => item.status = false)
}

function checked(id) {
    const find = storage.find(item=>item._id==id)
    find.status=!find._checked
    this.classList.remove("bi-circle")
    this.classList.add("bi-check-circle")
}