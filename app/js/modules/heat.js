let heatSource = stampit({
    apply: function() {
        this.cells.forEach(function(cell) {
            cell.increaseHeat(config.heatRate);
        });
    },
    lose: function() {
        this.cells.forEach(function(cell) {
            let surroundingCount = cell.surrounding.length;

            let edges = 8 - surroundingCount;

            let losses = cell.heat / 2 * edges;

            cell.decreaseHeat(losses);
        });
    },
    spread: function() {
        this.cells.forEach(function(cell) {
            let lower = [];

            cell.surrounding.forEach(function(n) {
                if (cell.heat > 10 && cell.heat / 0.8 > n.heat) {
                    lower.push(n);
                }
            }, this)

            if (lower.length > 0) {
                this.equalize(cell, util.arrayRand(lower));
            }

        }, this);
    },
    equalize: function(cell1, cell2) {
        let val = cell1.heat * 0.1;
        cell1.decreaseHeat(val);
        cell2.increaseHeat(val);
    }
}, {
    cells: []
});
