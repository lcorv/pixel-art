window.onload = () => {
    const qs = (el) => document.querySelector(el);
    const ce = (el) => document.createElement(el);
    const modal = qs(".modal");
    const modalContainer = qs(".modal-container");
    const modalBody = qs(".modal-body");
    const clear = qs(".clear");
    var title = 'senza-titolo';
    //window.localStorage.removeItem('savedPatterns');
    var saved = JSON.parse(window.localStorage.getItem('pattern'))
    var saved = [["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],["#ffffff","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#ffffff"],["#ffffff","#000000","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#000000","#ffffff"],["#ffffff","#000000","#2d2d2d","#969696","#969696","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#969696","#969696","#2d2d2d","#000000","#ffffff"],["#ffffff","#000000","#969696","#000000","#000000","#1e1e1e","#c19d0a","#c19d0a","#c19d0a","#c19d0a","#ffffff","#000000","#ffffff","#000000","#1e1e1e","#b4b4b4","#b4b4b4","#969696","#000000","#ffffff"],["#ffffff","#000000","#000000","#5a5a5a","#5a5a5a","#1e1e1e","#c19d0a","#c19d0a","#c19d0a","#c19d0a","#000000","#ffffff","#000000","#ffffff","#1e1e1e","#878787","#878787","#b4b4b4","#000000","#ffffff"],["#ffffff","#000000","#000000","#5a5a5a","#5a5a5a","#1e1e1e","#c19d0a","#c19d0a","#c19d0a","#c19d0a","#c19d0a","#c19d0a","#c19d0a","#c19d0a","#1e1e1e","#878787","#878787","#b4b4b4","#000000","#ffffff"],["#ffffff","#000000","#969696","#000000","#000000","#1e1e1e","#c19d0a","#c19d0a","#c19d0a","#c19d0a","#c19d0a","#c19d0a","#c19d0a","#c19d0a","#1e1e1e","#b4b4b4","#b4b4b4","#969696","#000000","#ffffff"],["#ffffff","#000000","#2d2d2d","#969696","#969696","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#969696","#969696","#2d2d2d","#000000","#ffffff"],["#ffffff","#000000","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#1e1e1e","#000000","#ffffff"],["#ffffff","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#ffffff"],["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#000000","#ffffff","#ffffff","#ffffff","#000000","#ffffff","#000000","#ffffff","#ffffff","#000000","#ffffff","#ffffff","#ffffff","#000000","#000000","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#000000","#ffffff","#ffffff","#ffffff","#000000","#ffffff","#000000","#ffffff","#ffffff","#000000","#ffffff","#ffffff","#000000","#ffffff","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#ffffff","#000000","#ffffff","#000000","#ffffff","#ffffff","#000000","#000000","#000000","#000000","#ffffff","#ffffff","#ffffff","#000000","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#ffffff","#000000","#ffffff","#000000","#ffffff","#ffffff","#000000","#ffffff","#ffffff","#000000","#ffffff","#ffffff","#ffffff","#ffffff","#000000","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#000000","#ffffff","#ffffff","#ffffff","#000000","#ffffff","#ffffff","#000000","#ffffff","#ffffff","#000000","#000000","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"]]
    var pointer = false;
    const close = qs(".close");
    const palette = qs(".palette");
    const size = qs(".size");
    var selectedColor = "#000000";
    const colorDisp = qs(".selected-color");
    const hexDisp = qs('.hex');
    var cellNum = 20;
    var colorPick = false;
    //77 7f ff 7e
    function createColor(hex) {
        let color = ce('div');
        color.className = 'color';
        if (hex == "000000") {
            color.classList.add('selected')
        }
        color.style.backgroundColor = `#${hex}`;
        palette.appendChild(color);
        color.addEventListener("click", () => {
            selectedColor = `#${hex}`;
            colorDisp.innerHTML = `#${hex}`;
            hexDisp.value = `#${hex}`;
            let colorsDivs = document.querySelectorAll('.color');
            colorsDivs.forEach((el) => el.classList.remove('selected'));
            color.classList.add('selected');
        })
    }
    hexDisp.addEventListener('change', () => {
        selectedColor = hexDisp.value;
        colorDisp.innerHTML = hexDisp.value;

    })

    function save() {
        window.localStorage.setItem('pattern', JSON.stringify(tableArr));
    }

    function generatePalette(num) {
        num = parseInt(num, 16);
        let color = "ffffff";
        let decimal = parseInt(color, 16);
        let ratio = parseInt(decimal / num);
        for (i = 0; i < num; i++) {
            hex = `${decimal.toString(16)}`;
            decimal = decimal - ratio;
            if (hex == "f0f0f") {
                hex = "000000"
                createColor(hex);
                return
            }
            createColor(hex);
        }
    }

    generatePalette("77");
    const gen = qs('.gen');
    const container = qs('.container');
    var elements = [];
    let tableArr = [];
    var story = [];
    var storyIndex = 0;
    let table = qs(".table");

    //create table cells
    function genTable(num) {
        cellNum = num; document.documentElement.style.setProperty("--cellNum", cellNum)
        elements = [];
        tableArr = [];
        table.innerHTML = ''
        for (i = 0; i < cellNum; i++) {
            tableArr.push([])
            for (e = 0; e < cellNum; e++) {
                tableArr[i].push('#ffffff')
                let cell = ce('div');
                cell.className = 'cell';
                cell.classList.add('white');
                table.appendChild(cell);
                elements.push(cell)
            }
        }
    }

    //load table cells
    function loadTable(pattern) {
        cellNum = pattern.length;
        qs('#size').value = cellNum; document.documentElement.style.setProperty("--cellNum", cellNum)
        elements = [];
        tableArr = pattern;
        table.innerHTML = ''
        for (i = 0; i < cellNum; i++) {
            for (e = 0; e < cellNum; e++) {
                let cell = ce('div');
                cell.className = 'cell';
                cell.style.backgroundColor = pattern[i][e]
                table.appendChild(cell);
                elements.push(cell);
            }
        }
    }

    if (saved) {
        loadTable(saved);
    }
    else {
        genTable(cellNum);
    }
    story.push(JSON.stringify(tableArr));
    clear.addEventListener('click', () => {
        genTable(cellNum);
        addToStory();
    })

    //resize table
    size.addEventListener('change', () => {
        genTable(parseInt(size.value))
        addToStory();
    })

    function selectElement(el) {
        changeColor(el);
        let parent = el.parentElement.children;
        nth = Array.prototype.indexOf.call(parent, el);
        line = Math.floor(nth / cellNum);
        column = nth % cellNum;
        tableArr[line][column] = selectedColor;
    }

    //story
    function addToStory(){
      storyIndex++;
      story = story.slice(0, storyIndex)
      story.push(JSON.stringify(tableArr));
    }
    function storyBack() {
        if (storyIndex > 0) {
            storyIndex--;
            //  console.log(`length: ${story.length} index:${storyIndex}`)
            qs('.next').disabled = false;
            loadTable(JSON.parse(story[storyIndex]));
            save();
            if (storyIndex == 0) {
                qs('.prev').disabled = true;
            }
        }
    }
    function storyNext() {
        if (storyIndex < story.length - 1) {
            storyIndex++;
            // console.log(`length: ${story.length} index:${storyIndex}`)  
            loadTable(JSON.parse(story[storyIndex]));
            save();
            qs('.prev').disabled = false;
            if (storyIndex == story.length - 1) {
                qs('.next').disabled = true;
            }
        }
    }
    qs('.prev').addEventListener('click', () => {
        storyBack()
    })
    qs('.next').addEventListener('click', () => {
        storyNext()
    })

    function changeColor(el) {
        el.style.backgroundColor = selectedColor;
    }
    function countCells() {
        qs('.modal-title').innerHTML = 'Pattern';
        let output = '';
        for (i = 0; i < cellNum; i++) {
            output += `<div class="row"> ${i + 1})`;
            let col = tableArr[i][0];
            let counter = 0;
            for (cell in tableArr[i]) {
                if (tableArr[i][cell] == col) {
                    counter++;
                }
                else {
                    output = `${output}<div class='square'><span>${counter}</span><div class="cell" style="background-color:${col}"></div></div>  `;
                    counter = 1;
                    col = tableArr[i][cell];
                }
                if (cell == cellNum - 1) {
                    output = `${output}<div class='square'><span>${counter}</span><div class="cell" style="background-color:${tableArr[i][cell]};display:inline-block"></div></div></div>`;
                    counter = 1;
                    col = tableArr[i][cell];
                }
            }
        }
        modalBody.innerHTML = output;
        let arrContainer = ce('div');
        arrContainer.innerHTML = JSON.stringify(tableArr);
        arrContainer.className = 'arr-container';
        modalBody.appendChild(arrContainer);
    }

    //pick a color from the table
    function rgbToHex(rgb){
      color = rgb.split(',');
      color =`#${decToHex(color[0].slice(4))}${decToHex(color[1])}${decToHex(color[2].slice(0,-1))}`;
      return color;
    }
    function decToHex(num){
      num = parseInt(num);
      num = num.toString(16);
      if(num.length<2){
        num = "0"+num;
      }
      return num
    }
    function pickColor(el){
      let color = rgbToHex(el.style.backgroundColor);
      let colorsDivs = document.querySelectorAll('.color');
      colorsDivs.forEach((el) => el.classList.remove('selected'));
      colorsDivs.forEach((el)=>{
        if(rgbToHex(el.style.backgroundColor) == color){
            el.classList.add('selected')
        }
      })
      selectedColor = color;
      hexDisp.value = color;
      colorDisp.innerHTML = color;   
    }
    function select(element, selectorX, selectorY) {
        let crossX = false;
        let crossY = false;
        let elementX1 = element.offsetLeft;
        let elementX2 = element.offsetLeft + element.clientWidth;

        if
            (
            (elementX1 - selectorX < 0 && elementX1 - selectorX > 0)
            || (elementX1 - selectorX < 0 && elementX2 - selectorX > 0)
            ||
            (elementX1 - selectorX > 0 && elementX2 - selectorX < 0)
        ) {
            crossX = true;
        }
        let elementY1 = element.offsetTop;
        let elementY2 = element.offsetTop + element.clientHeight;

        if
            (
            (elementY1 - selectorY < 0 && elementY2 - selectorY > 0)
            || (elementY1 - selectorY < 0 && elementY2 - selectorY > 0)
            ||
            (elementY1 - selectorY > 0 && elementY2 - selectorY < 0)
        ) {
            crossY = true;
        }
        if (crossX == true && crossY == true) {
            if(!colorPick){
            selectElement(element)
            }
            else{
              pickColor(element);
            }
        }
        else {
            // element.style.border='none'
        }
    }
    var touchX = 0;
    var touchY = 0;
    var count = 0;

    table.addEventListener('pointerdown', function (e) {
        pointer = true;
        touchY = e.pageY;
        touchX = e.pageX;
        elements.forEach((element) => select(element, touchX, touchY))
    });

    table.addEventListener('pointermove', function (e) {
        if (pointer) {
            touch = e;
            moveX = touch.pageX;
            moveY = touch.pageY;
            var tempRect = document.getElementById("tempRect" + count);
            elements.forEach((element) => select(element, moveX, moveY))
        }
    })

    table.addEventListener('pointerup', () => {
        if(!colorPick){
          save();
          addToStory();
          qs('.next').disabled = true;
          qs('.prev').disabled = false;
        }   
        pointer = false;
        colorPick = false;
        qs('.dropper').classList.remove('pushed');
    })

    gen.addEventListener('click', () => {
        countCells();
        openModal();
    })
    function displaySaved() {
        modalBody.innerHTML = '';
        qs('.modal-title').innerHTML = 'Salvati';
        let savedPatterns = window.localStorage.getItem('savedPatterns');
        if (savedPatterns) {
            JSON.parse(savedPatterns).forEach((pattern) => {
                let saved = ce('div');
                saved.value = pattern.name;
                saved.className = 'saved-container';
                opt = ce('div');
                opt.className = 'saved-option';
                opt.innerHTML = `<div><i class='fa fa-solid fa-folder-open'></i></div> ${pattern.name}`;
                opt.addEventListener('click', () => {
                    let pattern = JSON.parse(savedPatterns).filter((pattern) =>
                        pattern.name == saved.value
                    )
                    loadTable(pattern[0].pattern);
                    addToStory();
                    title = pattern[0].name;
                    closeModal();
                })
                btn = ce('button');
                btn.innerHTML = `<i class="fa fa-solid fa-trash"></i>`;
                btn.className = "delete-btn"
                btn.addEventListener('click', ()=>{
                    deleteLocal(pattern.name)
                });
                saved.appendChild(opt);
                saved.appendChild(btn);
                modalBody.appendChild(saved);
            })
        }
    }
    function deleteLocal(name){
        let savedPatterns = window.localStorage.getItem('savedPatterns');
        if(savedPatterns){
            let parsed = JSON.parse(savedPatterns)
            let patternIndex = parsed.findIndex((pattern) =>
                pattern.name == name
            )
            if(patternIndex){
                parsed.splice(patternIndex,1);
                window.localStorage.setItem('savedPatterns', JSON.stringify(parsed));
            }
            else{
                parsed.splice(0,1);
                window.localStorage.setItem('savedPatterns', JSON.stringify(parsed));
            }
            displaySaved();
        }
    }
    function saveLocal() {
        let name = prompt('Salva con nome', title);
        let item = {
            name: name,
            pattern: tableArr
        }
        if (name) {
            let savedPatterns = window.localStorage.getItem('savedPatterns');
            if (savedPatterns) {
                let parsed = JSON.parse(savedPatterns)
                let oldPattern = parsed.filter((pattern) =>
                    pattern.name == name
                )
                if (oldPattern[0]) {
                    parsed.map((pattern) => {
                        if (pattern.name == name) {
                            pattern.pattern = tableArr;
                        }
                    })
                    window.localStorage.setItem('savedPatterns', JSON.stringify(parsed));
                }
                else {
                    let toSave = JSON.parse(savedPatterns);
                    toSave.push(item);
                    window.localStorage.setItem('savedPatterns', JSON.stringify(toSave));
                }
            }
            else {
                let toSave = new Array;
                toSave.push(item);
                window.localStorage.setItem('savedPatterns', JSON.stringify(toSave));
            }
        }
        else {
            console.log('name requested')
        }
    }

    qs('.save').addEventListener('click', () => {
        saveLocal();
    })

    qs('.saved').addEventListener('click', () => {
        displaySaved();
        openModal();
    })

    //modal
    function closeModal() {
        modal.style.animation = '';
        modal.style.animation = 'close 0.2s forwards';
        window.setTimeout(() => {
            modalContainer.style.display = 'none';
            modalContainer.style.animation = 'closeModal 0.1s 1 forwards';
            modalContainer.style.animation = '';
        }, 200)
    }
    function openModal() {
        modal.style.animation = 'open 0.2s forwards'
        modalContainer.style.display = 'flex';
    }
    //close modal
    close.addEventListener('click', () => {
        closeModal();
    })
    modalContainer.addEventListener('click', () => {
        closeModal();
    })
    modal.addEventListener('click', (e) => {
        e.stopPropagation()
    })
    let canvas = qs('.canvas')
    let canvasContainer = qs('.canvas-container');
    let closeCanvasBtn = canvas.querySelector('.close-canvas');
    let canvasBody = qs('.canvas-body');
    qs('.print').addEventListener('click',()=>{
        canvasBody.innerHTML='';
        html2canvas(table).then(canvas => {
            let image = ce('img');
            image.src = canvas.toDataURL('image/png');
            image.addEventListener('click',()=>{
                let link = ce('a');
                link.download = title + '.png';
                link.href = canvas.toDataURL('image/png');
                link.click()
            })
            canvasBody.appendChild(image);
            openCanvas();
        });
    })
      //canvas
      function closeCanvas() {
        canvas.style.animation = '';
        canvas.style.animation = 'close 0.2s forwards';
        window.setTimeout(() => {
            canvasContainer.style.display = 'none';
            canvasContainer.style.animation = 'closecanvas 0.1s 1 forwards';
            canvasContainer.style.animation = '';
        }, 200)
    }
    function openCanvas() {
        canvas.style.animation = 'open 0.2s forwards'
        canvasContainer.style.display = 'flex';
    }
    //close canvas
    closeCanvasBtn.addEventListener('click', () => {
        closeCanvas();
    })
    canvasContainer.addEventListener('click', () => {
        closeCanvas();
    })
    canvas.addEventListener('click', (e) => {
        e.stopPropagation()
    })

    //pick color
    qs('.dropper').addEventListener('click',()=>{
     if(!colorPick){
      qs('.dropper').classList.add('pushed');
      colorPick = true;
      }
      else{
      qs('.dropper').classList.remove('pushed');
      colorPick = false;
      }
    })
}
