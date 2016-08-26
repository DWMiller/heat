let physics = {
    hitTest: function(object1, object2) {
        let difX = Math.abs(object2.x - object1.x),
            difY = Math.abs(object2.y - object1.y),
            threshold = 1;
        return !(difX > threshold || difY > threshold);
    },
    move: function(object, vector) {
        object.x -= vector.x;
        object.y -= vector.y;
    }
}
