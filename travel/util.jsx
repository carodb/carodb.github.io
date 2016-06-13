Circles = Klass(Effect, {
    description : "Circles on a sine wave. Use fixed timestep for smooth traces.",
    controls : [ "stroke", "fill", "blur" ],
    stroke : false,
    fill : true,
    blur : true,
    blurFill : "rgba(0,0,0, 0.1)",
    normalFill : "rgba(0,0,50, 1)",
    circleGradient : {
        type : "radial",
        endRadius : 15,
        colorStops : [
            [ 0, "rgba(100,195,90,1)" ],
            [ 0.2, "rgba(5,10,80,0.4)" ],
            [ 1, "rgba(10,0,40,0)" ]
        ]
    },

    initialize : function (canvas, controlContainer) {
        Effect.initialize.call(this, canvas, controlContainer)
        this.canvas.fill = this.blurFill
        for (var i=0; i<20; i++)
            this.scene.append(this.makeCircle((i/20) * 4 * Math.PI))
        this.scene.strokeWidth = 3
        this.scene.rotation = [0.05, this.canvas.width/2, this.canvas.height/2]
        this.scene.compositeOperation = 'lighter'
        this.scene.fill = new Gradient(this.circleGradient)
        this.scene.stroke = '#ffeeaa'
    },

    makeCircle : function (offset) {
        var circle = new Circle(15)
        circle.circles = this
        circle.offset = offset
        circle.addFrameListener(this.circleMotion)
        return circle
    },

    circleMotion : function (t) {
        this.fill = this.circles.fill
        this.stroke = this.circles.stroke
        var trw = this.root.width+160
        this.x = -50 + ((t/15 + (this.offset / (4*Math.PI) * trw)) % trw)
        this.y = this.root.height*0.5 + Math.sin(this.offset + t/400) * 20
        this.scale = 1.5+Math.cos(this.offset*Math.PI*4 + t/1600)
    },

    setBlur : function (blur) {
        this.blur = blur
        this.canvas.fill = (this.blur ? this.blurFill : this.normalFill)
    }
})
