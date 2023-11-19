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
    var pointer = false;
    const close = qs(".close");
    const palette = qs(".palette");
    const size = qs(".size");
    var selectedColor = "#000000";
    const colorDisp = qs(".selected-color");
    const hexDisp = qs('.hex');
    var cellNum = 20;
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
        cellNum = pattern.length; document.documentElement.style.setProperty("--cellNum", cellNum)
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
        genTable(cellNum)
    })

    //resize table
    size.addEventListener('change', () => {
        genTable(parseInt(size.value))
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

    function selectColor(value) {
        color = value;

    }

    function countCells() {
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
                    output = `${output} <span>${counter}</span><div class="cell" style="background-color:${col}"></div> `;
                    counter = 1;
                    col = tableArr[i][cell];
                }
                if (cell == cellNum - 1) {
                    output = `${output}<span>${counter}</span><div class="cell" style="background-color:${tableArr[i][cell]};display:inline-block"></div></div>`;
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
            selectElement(element)
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
        save();
        storyIndex++;
        story = story.slice(0, storyIndex)
        story.push(JSON.stringify(tableArr));
        qs('.next').disabled = true;
        qs('.prev').disabled = false;
        pointer = false;
    })

    gen.addEventListener('click', () => {
        countCells();
        openModal();
    })
    function displaySaved() {
        modalBody.innerHTML = '';
        let savedPatterns = window.localStorage.getItem('savedPatterns');
        if (savedPatterns) {
            JSON.parse(savedPatterns).forEach((pattern) => {
                let saved = ce('div');
                saved.value = pattern.name;
                saved.className = 'saved-container';
                opt = ce('div');
                opt.className = 'saved-option';
                opt.innerHTML = pattern.name;
                opt.addEventListener('click', () => {
                    let pattern = JSON.parse(savedPatterns).filter((pattern) =>
                        pattern.name == saved.value
                    )
                    loadTable(pattern[0].pattern);
                    title = pattern[0].name;
                    closeModal();
                })
                btn = ce('button');
                btn.innerHTML = `<i class="fa fa-solid fa-trash"></i>`;
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
}
