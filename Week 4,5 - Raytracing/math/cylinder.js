
class Cylinder {
    constructor(center, axis, radius, height) {
        this.center = center; 
        this.axis = axis.normalize(); 
        this.radius = radius;
        this.height = height;
    }

    raycast(ray) {
    
        let result = { hit: false };

        
        let oc = ray.origin.subtract(this.center);

        let a = ray.direction.x * ray.direction.x + ray.direction.z * ray.direction.z;
        let b = 2.0 * (oc.x * ray.direction.x + oc.z * ray.direction.z);
        let c = oc.x * oc.x + oc.z * oc.z - this.radius * this.radius;

        
        let discriminant = b * b - 4 * a * c;
        if (discriminant < 0) return result;

        let t0 = (-b - Math.sqrt(discriminant)) / (2 * a);
        let t1 = (-b + Math.sqrt(discriminant)) / (2 * a);

        
        let y0 = ray.origin.y + t0 * ray.direction.y;
        let y1 = ray.origin.y + t1 * ray.direction.y;

        let t = t0;
        if (y0 < this.center.y || y0 > this.center.y + this.height) {
            if (y1 < this.center.y || y1 > this.center.y + this.height) {
                return result; 
            }
            t = t1; 
        }

       
        let hitPoint = ray.origin.add(ray.direction.multiplyScalar(t));
        let normal = new Vector3(hitPoint.x - this.center.x, 0, hitPoint.z - this.center.z).normalize();

        result.hit = true;
        result.point = hitPoint;
        result.normal = normal;
        result.distance = t;

        return result;
    }
}
