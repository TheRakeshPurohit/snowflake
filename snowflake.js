/**!
    Source: https://github.com/nextapps-de/snowflake
    License: Apache License 2.0
*/

(function(){

    "use strict";

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const dpi = window.devicePixelRatio || 1;
    const image = new Image();
    const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAGFBMVEXk7PTk7PTk7PTk7PTk7PTk7PQAAADk7PQLtLMUAAAAB3RSTlO18FHbI4YAkU+M0QAAAVVJREFUeF7F1T1PwzAQgGGGouwg5B8QEWaioqyVSsNKoXL2KPYcE6L371PLcp1GjU7A0IztI53Pvo8bK3y/BnkpgGoQAFwXmPvCg/ZZL4A3hg94rPheBOFbBCaCiyHqo9gpAHc44m4Ots6L9h1uC/+/Ws/AE3qapuFrBpo5GCdgX14G+UMAHaxsRjEFLb3dQB0BB0U9BR1uRwS2Acdw/hYVCkYbQJcB4zlogL6OWbQV9OchMhiKlKYBxinYA9omsAW4SyAHWCfQKgagjGADVLgUogGdA6sAdh4bGCMw0PuwOO2BCQlmoBPQ8eAQUzIJdKo8JQunBHN3uodXa8NZAfCRbPg5glnN6eW+2BBy+RtIIQ4JSIcU0xQvSrxq6bHE5xYLRi45uWjlspcbR249uXnl9pcHiDyC0hD7hJc0xMQxKA9SeRTLw1xeB9ffWfJilVfz/7f/D7vzJWHzmXRTAAAAAElFTkSuQmCC";

    let width, height, count, raf = 0, last = 0;
    let speed = 1, size = 3, density = 1, quality = 1.5, autostart = true;

    const snowflakes = [];
    const buffer = [];
    const flakes = [
        { r: 1.5, o: 0.3 },
        { r: 1.7, o: 0.4 },
        { r: 1.9, o: 0.6 },
        { r: 2.1, o: 0.8 },
        { r: 2.3, o: 1.0 },
        { r: 2.5, o: 1.0 },
        { r: 2.7, o: 0.8 },
        { r: 2.9, o: 0.6 },
        { r: 3.1, o: 0.4 },
        { r: 3.3, o: 0.3 }
    ];

    function createBuffer(index){

        const flake = flakes[index];
        const canvas = buffer[index] = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const width = Math.ceil(flake.r * dpi * quality * size);
        const blur = flake.r < 2.3
            ? (2.3 - flake.r) * 0.9 * dpi * quality
            : flake.r > 2.3
                ? (flake.r - 2.3) * 1.1 * dpi * quality
                : 0;

        canvas.height = canvas.width = width;
        ctx.globalAlpha = flake.o;
        ctx.filter = "blur(" + blur + "px)";
        ctx.drawImage(
            image,
            0,
            0,
            image.width,
            image.height,
            0,
            0,
            width,
            width
        );

        ctx.globalAlpha = flake.o / 1.5;
        ctx.fillStyle = "#e4ecf4";
        ctx.beginPath();
        ctx.arc(
            width / 2,
            width / 2,
            width / 2 / 2,
            0,
            Math.PI * 2,
            false
        );
        ctx.closePath();
        ctx.fill();

        return canvas;
    }

    /**
     * @constructor
     */

    function Snowflake(y){

        let index = Math.random() * flakes.length | 0;
        let flake = flakes[index];

        this.buffer = buffer[index] || createBuffer(index);
        this.r = flake.r * dpi * quality;
        this.w = Math.ceil(flake.r * dpi * quality * size);
        this.x = randomize(width);
        this.y = y || -this.w;
        this.o = flake.o;
        this.vy = flake.r * flake.r * dpi * quality / size / 2;
        this.vx = (0.5 - randomize()) / size * dpi * quality;
        this.deg = (1 - randomize(2)) * size / 180 * Math.PI;
    }

    function update(time){

        raf = window.requestAnimationFrame(update);
        if(!image.loaded) return;
        ctx.clearRect(0, 0, width, height);

        let scale = last ? (time - last) / (1000 / 60) : 1;
        last = time;

        for(let i = 0, flake; i < (count * density); i++) {

            flake = snowflakes[i];
            flake || (snowflakes[i] = flake = new Snowflake(randomize(height)));
            flake.y += flake.vy / scale * speed * (size / 3);
            flake.x += flake.vx / scale + Math.sin(flake.y / speed / (size / 3) * flake.deg) / 2;

            if((flake.y >= height + flake.w) ||
               (flake.x >= width + flake.w) ||
               (flake.x <= -flake.w)){

                snowflakes.length > (count * density)
                    ? snowflakes.splice(i--, 1)
                    : snowflakes[i] = new Snowflake(0);
            }
            else if(flake.y > 0){

                ctx.drawImage(
                    flake.buffer,
                    0,
                    0,
                    flake.w,
                    flake.w,
                    flake.x,
                    flake.y,
                    flake.w,
                    flake.w
                );
            }
        }
    }

    function resize(){

        let element = document.documentElement,
            body = document.body;

        width = (window.innerWidth || element.clientWidth || body.clientWidth) / 3 * dpi * quality;
        height = (window.innerHeight || element.clientHeight || body.clientHeight) / 3 * dpi * quality;
        count = ((width / (dpi * quality)) * (height / (dpi * quality)) / 1500) | 0;

        canvas.width = width;
        canvas.height = height;
    }

    /**
     * @param {number=} bound
     * @returns {number}
     */

    function randomize(bound){

        return Math.random() * (bound || 1);
    }

    function style(styles){

        const style = canvas.style;

        for(const key in styles){

            style.setProperty(key, styles[key]);
        }
    }

    function load(){

        resize();
        update(0);

        autostart = true;
        canvas.setAttribute("id", "snowflake");
        document.body.appendChild(canvas);
    }

    window.addEventListener("resize", resize, false);

    const controls = window["Snowflake"] = {
        "style": style,
        "speed": function(val){
            speed = val;
        },
        "size": function(val){
            size = val * 3;
            buffer.length = 0;
        },
        "quality": function(val){
            quality = 3 / 2 * Math.min(Math.max(val, 0.1), 2);
            buffer.length = 0;
            snowflakes.length = 0;
            resize();
        },
        "density": function(val){
            density = val;
        },
        "opacity": function(val){
            style({ "opacity": val });
        },
        "index": function(val){
            style({ "z-index": val });
        },
        "image": function(src){
            src && (image.loaded = false);
            image.src = src;
            buffer.length = 0;
        },
        "start": function(){
            autostart
                ? raf || update(0)
                : load();
            style({ "display": "" });
        },
        "stop": function(){
            cancelAnimationFrame(raf);
            style({ "display": "none" });
            raf = 0;
        }
    };

    style({
        "position": "fixed",
        "top": "0",
        "left": "0",
        "width": "100%",
        "height": "100%",
        "z-index": "999999",
        "pointer-events": "none"
    });

    const config = window["SnowflakeConfig"];

    if(config){

        for(let key in config){

            key === "start"
                ? autostart = config[key] !== false
                : controls[key](config[key]);
        }
    }

    image.loaded = false;
    image.onload = function(){ image.loaded = true; };
    image.onerror = function(){ image.onerror = null; image.src = base64; };
    image.src || (image.src = base64);

    if(autostart){

        document.readyState === "complete"
            ? load()
            : window.addEventListener("load", load, false);
    }

}());
