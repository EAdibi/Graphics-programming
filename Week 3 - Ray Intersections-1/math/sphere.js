/*
 * An object type representing an implicit sphere.
 *
 * @param center A Vector3 object representing the position of the center of the sphere
 * @param radius A Number representing the radius of the sphere.
 * 
 * Example usage:
 * var mySphere = new Sphere(new Vector3(1, 2, 3), 4.23);
 * var myRay = new Ray(new Vector3(0, 1, -10), new Vector3(0, 1, 0));
 * var result = mySphere.raycast(myRay);
 * 
 * if (result.hit) {
 *   console.log("Got a valid intersection!");
 * }
 */


var Sphere = function(center, radius) {

  if (!(this instanceof Sphere)) {
    console.error("Sphere constructor must be called with the new operator");
  }

  
  if (!(center instanceof Vector3)) {
    console.error("Invalid center parameter, defaulting to zero vector");
    center = new Vector3(); 
  }

  if (typeof radius !== 'number') {
    console.error("Invalid radius parameter, defaulting to 1");
    radius = 1; 
  }

  this.center = center;
  this.radius = radius;


  if (!(this.center instanceof Vector3)) {
    console.error("The sphere center must be a Vector3");
  }

  if (typeof this.radius !== 'number') {
    console.error("The radius must be a Number");
  }
};





Sphere.prototype = {
  raycast: function(ray) {
  
    var rayToSphere = this.center.subtract(ray.origin);

    var tca = rayToSphere.dot(ray.direction);

    if (tca < 0) {
      return { hit: false, point: null, normal: null, distance: null };
    }


    var d2 = rayToSphere.dot(rayToSphere) - tca * tca;
    var radiusSquared = this.radius * this.radius;

  
    if (d2 > radiusSquared) {
      return { hit: false, point: null, normal: null, distance: null };
    }
    
    var thc = Math.sqrt(radiusSquared - d2);
    var t0 = tca - thc;
    var t1 = tca + thc;

    var intersectionDistance = Math.min(t0, t1);
    var intersectionPoint = ray.origin.add(ray.direction.multiplyScalar(intersectionDistance));

 
    if (intersectionDistance < 0) {
      return { hit: false, point: null, normal: null, distance: null };
    }

    
    var normal = intersectionPoint.clone().subtract(this.center).normalize();


    // var normal = intersectionPoint.subtract(this.center);

    // if the intersection point is outside the sphere
    // if (intersectionDistance > 0) {
    //   normal.normalize(); // Point outward
    // } else {
    //   normal.normalize().negate(); // Point inward
    // }


    
    return {
      hit: true,
      point: intersectionPoint,
      normal: normal,
      distance: intersectionDistance
    };
  }
};
