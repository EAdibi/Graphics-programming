function Camera(input) {
    this.cameraWorldMatrix = new Matrix4();
    this.cameraYaw = 0;
    this.cameraPosition = new Vector3();

    // -------------------------------------------------------------------------
    this.getViewMatrix = function() {
        return this.cameraWorldMatrix.clone().inverse();
    }

    // -------------------------------------------------------------------------
    this.getPosition = function() {
        return this.cameraPosition;
    }

    // -------------------------------------------------------------------------
    this.update = function(dt) {
        // Extract the basis vector corresponding to forward
        var currentForward = new Vector3(
            this.cameraWorldMatrix.elements[2],
            this.cameraWorldMatrix.elements[6],
            this.cameraWorldMatrix.elements[10]
        );

        if (input.up) {
            this.cameraPosition.subtract(currentForward.multiplyScalar(10 * dt));
        }

        if (input.down) {
            this.cameraPosition.add(currentForward.multiplyScalar(10 * dt));
        }

        if (input.left) {
            this.cameraYaw += 1;
        }

        if (input.right) {
            this.cameraYaw -= 1;
        }

        this.cameraWorldMatrix.setRotationY(this.cameraYaw);
        this.cameraWorldMatrix.translate(this.cameraPosition);
    }





    this.moveForward = function(distance) {
        var forward = new Vector3(
            -this.cameraWorldMatrix.elements[2], // Note: Assuming column-major order
            -this.cameraWorldMatrix.elements[6],
            -this.cameraWorldMatrix.elements[10]
        ).normalize();
        this.cameraPosition = this.cameraPosition.add(forward.multiplyScalar(distance));
        this.updateCameraMatrix();
    };

    this.moveBackward = function(distance) {
        var forward = new Vector3(
            -this.cameraWorldMatrix.elements[2],
            -this.cameraWorldMatrix.elements[6],
            -this.cameraWorldMatrix.elements[10]
        ).normalize();
        this.cameraPosition = this.cameraPosition.subtract(forward.multiplyScalar(distance));
        this.updateCameraMatrix();
    };

    this.moveRight = function(distance) {
        var right = new Vector3(
            this.cameraWorldMatrix.elements[0],
            this.cameraWorldMatrix.elements[4],
            this.cameraWorldMatrix.elements[8]
        ).normalize();
        this.cameraPosition = this.cameraPosition.add(right.multiplyScalar(distance));
        this.updateCameraMatrix();
    };

    this.moveLeft = function(distance) {
        var right = new Vector3(
            this.cameraWorldMatrix.elements[0],
            this.cameraWorldMatrix.elements[4],
            this.cameraWorldMatrix.elements[8]
        ).normalize();
        this.cameraPosition = this.cameraPosition.subtract(right.multiplyScalar(distance));
        this.updateCameraMatrix();
    };

    this.updateCameraMatrix = function() {
        this.cameraWorldMatrix.setRotationY(this.cameraYaw);
        this.cameraWorldMatrix.translate(this.cameraPosition);
    };
}