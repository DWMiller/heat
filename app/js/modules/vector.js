let vectorPrototype = {
    x: 0,
    y: 0,
    length: 0,
    normalize: function() {
        this.x = this.x / this.length;
        this.y = this.y / this.length;
        return this;
    },
    calcLength: function() {
        this.length = Math.sqrt(this.x * this.x + this.y * this.y);
        return length;
    }
}

function vector(origin, target) {
    let vector = _.extend({}, Object.create(vectorPrototype), {
        x: origin.x - target.x,
        y: origin.y - target.y
    });

    vector.calcLength();
    vector.normalize();

    return vector;
}
