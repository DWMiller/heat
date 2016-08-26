function generateCells() {
    cells = [];
    cellsLookup = {};

    let stamp = stampit.compose(particle, cell);
    for (let x = 0; x < config.w; x += config.cellSize) {
        cellsLookup[x] = {};
        for (let y = 0; y < config.h; y += config.cellSize) {
            let settings = {
                x: x,
                y: y,
            }
            let cell = stamp.create(settings);
            cells.push(cell);
            cellsLookup[x][y] = cell;
        }
    }
}

function setSurroundingCells() {
    cells.forEach(function(cell) {

        if (cell.y > 0 && cell.x > 0) {
            //top left
            cell.surrounding.push(cellsLookup[cell.x - config.cellSize][cell.y - config.cellSize]);
        }

        if (cell.y > 0) {
            //top
            cell.surrounding.push(cellsLookup[cell.x][cell.y - config.cellSize]);
        }

        if (cell.y > 0 && cell.x + config.cellSize < config.w) {
            //top right
            cell.surrounding.push(cellsLookup[cell.x + config.cellSize][cell.y - config.cellSize]);
        }

        if (cell.x + config.cellSize < config.w) {
            //right
            cell.surrounding.push(cellsLookup[cell.x + config.cellSize][cell.y]);
        }

        if (cell.x + config.cellSize < config.w && cell.y + config.cellSize < config.h) {
            //bottom right
            cell.surrounding.push(cellsLookup[cell.x + config.cellSize][cell.y + config.cellSize]);
        }

        if (cell.y + config.cellSize < config.h) {
            //bottom
            cell.surrounding.push(cellsLookup[cell.x][cell.y + config.cellSize]);
        }

        if (cell.x > 0 && cell.y + config.cellSize < config.h) {
            //bottom left
            cell.surrounding.push(cellsLookup[cell.x - config.cellSize][cell.y + config.cellSize]);
        }

        if (cell.x > 0) {
            //left
            cell.surrounding.push(cellsLookup[cell.x - config.cellSize][cell.y]);
        }
    });
}

function render() {
    // canvasUtil.clear(ctx);

    cells.forEach(function(cell) {
        if (cell.changed) {
            cell.draw(ctx);
        }
    })

}

function startSimulation() {
    requestAnimationFrame(simulate);
}

function simulate() {
    heater.apply();
    heater.lose();
    heater.spread();

    render();
    requestAnimationFrame(simulate);
}

function start() {
    config.h = document.body.clientHeight;
    config.w = document.body.clientWidth;

    canvas.width = config.w;
    canvas.height = config.h;

    generateCells();
    setSurroundingCells();

    heater = heatSource.create({
        cells: cells
    });

    if (!started) {
        startSimulation();
    }

    started = true;
}

let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d'),
    started = false,
    cells, cellsLookup, heater;

start();

// var gui = new dat.GUI({
//     autoPlace: false
// });

// var customContainer = document.getElementById('gui');
// customContainer.appendChild(gui.domElement);

// gui.add(config, 'addTarget');
// gui.add(config, 'removeTarget');
// gui.add(config, 'moreLines');
// gui.add(config, 'lessLines');
// gui.add(config, 'lineWidth').min(1).step(1);
// gui.add(config, 'movingLines');
// gui.add(config, 'movingTargets');
