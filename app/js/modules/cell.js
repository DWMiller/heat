let cell = stampit({
    color: '#000',
    draw(ctx) {
        ctx.fillStyle = 'rgb(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ')';
        ctx.fillRect(this.x, this.y, config.cellSize, config.cellSize);
        ctx.stroke();
        this.changed = false;
    },
    calcColor() {
        this.color = {
            r: 0 + this.heat,
            g: 0 + this.heat,
            b: 0 + this.heat
        }
        this.changed = true;
    },
    increaseHeat(val) {
        this.heat += val;
        this.heat = Math.round(this.heat);
        this.calcColor();
    },
    decreaseHeat(val) {
        if (this.heat > val) {
            this.heat -= val;
        } else {
            this.heat = 0;
        }
        this.heat = Math.round(this.heat);
        this.calcColor();
    }
}, {
    heat: 0,
    changed: true,
    surrounding: []
});
