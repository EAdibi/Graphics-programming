function Camera(input) {
    // The following two parameters will be used to automatically create the cameraWorldMatrix in this.update()
    this.cameraYaw = 0;
    this.cameraPosition = new Vector3();

    this.cameraWorldMatrix = new Matrix4();
    var rotateSpeed = 60;

    // -------------------------------------------------------------------------
    this.getViewMatrix = function() {
        return this.cameraWorldMatrix.clone().inverse();
    }

    // -------------------------------------------------------------------------
    this.getForward = function() {
        // todo #6 - pull out the forward direction from the world matrix and return as a vector
        //         - recall that the camera looks in the "backwards" direction
        var m = this.cameraWorldMatrix.elements;
        return new Vector3(-m[8], -m[9], -m[10]);
    }
    // -------------------------------------------------------------------------
    this.update = function(dt) {
        var currentForward = this.getForward();

        if (input.up) {
            // todo #7 - move the camera position a little bit in its forward direction
            this.cameraPosition = this.cameraPosition.add(currentForward.multiplyScalar(dt));
        }

        if (input.down) {
            // todo #7 - move the camera position a little bit in its backward direction
            this.cameraPosition = this.cameraPosition.subtract(currentForward.multiplyScalar(dt));
        }
        

        if (input.left) {
            // todo #8 - add a little bit to the current camera yaw
            this.cameraYaw += rotateSpeed * dt;
        }

        if (input.right) {
            // todo #8 - subtract a little bit from the current camera yaw
            this.cameraYaw -= rotateSpeed * dt;
        }

        // todo #7 - create the cameraWorldMatrix from scratch based on this.cameraPosition
        var translationMatrix = new Matrix4().makeTranslation(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);
        this.cameraWorldMatrix = translationMatrix;

        // todo #8 - create a rotation matrix based on cameraYaw and apply it to the cameraWorldMatrix
        // (order matters!)
        var rotationMatrix = new Matrix4().makeRotationY(this.cameraYaw);
        this.cameraWorldMatrix = rotationMatrix.multiply(this.cameraWorldMatrix);

    }
}

// EOF 00100001-10