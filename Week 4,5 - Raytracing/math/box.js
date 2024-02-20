// box.js
var Box = function(minCorner, maxCorner) {
    if (!(this instanceof Box)) {
        console.error("Box constructor must be called with the new operator");
    }

    if (!(minCorner instanceof Vector3) || !(maxCorner instanceof Vector3)) {
        console.error("minCorner and maxCorner must be instances of Vector3");
    }

    this.min = minCorner;
    this.max = maxCorner;
};

Box.prototype = {
    raycast: function(ray) {
        let tMin = (this.min.x - ray.origin.x) / ray.direction.x;
        let tMax = (this.max.x - ray.origin.x) / ray.direction.x;

        if (tMin > tMax) [tMin, tMax] = [tMax, tMin]; 

        let tyMin = (this.min.y - ray.origin.y) / ray.direction.y;
        let tyMax = (this.max.y - ray.origin.y) / ray.direction.y;

        if (tyMin > tyMax) [tyMin, tyMax] = [tyMax, tyMin];

        if ((tMin > tyMax) || (tyMin > tMax))
            return { hit: false };

        if (tyMin > tMin)
            tMin = tyMin;

        if (tyMax < tMax)
            tMax = tyMax;

        let tzMin = (this.min.z - ray.origin.z) / ray.direction.z;
        let tzMax = (this.max.z - ray.origin.z) / ray.direction.z;

        if (tzMin > tzMax) [tzMin, tzMax] = [tzMax, tzMin];

        if ((tMin > tzMax) || (tzMin > tMax))
            return { hit: false };

        if (tzMin > tMin)
            tMin = tzMin;

        if (tzMax < tMax)
            tMax = tzMax;

       
        var hitPoint = ray.origin.add(ray.direction.multiplyScalar(tMin));
        var normal = this.calculateNormal(hitPoint, ray.direction);

        return {
            hit: true,
            point: hitPoint,
            normal: normal,
            distance: tMin
        };
    },

    calculateNormal: function(hitPoint, direction) {
        var epsilon = 1e-4;
        var normal = new Vector3(0, 0, 0);

        if (Math.abs(hitPoint.x - this.min.x) < epsilon) normal.x = -1;
        else if (Math.abs(hitPoint.x - this.max.x) < epsilon) normal.x = 1;

        if (Math.abs(hitPoint.y - this.min.y) < epsilon) normal.y = -1;
        else if (Math.abs(hitPoint.y - this.max.y) < epsilon) normal.y = 1;

        if (Math.abs(hitPoint.z - this.min.z) < epsilon) normal.z = -1;
        else if (Math.abs(hitPoint.z - this.max.z) < epsilon) normal.z = 1;

        return normal;
    }
};
