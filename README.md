# Snowflake Plugin (Canvas-based)
### Usage

Insert this snippet into `<HEAD>` or `<BODY>` tag of your html page:

```html
<script src="https://cdn.jsdelivr.net/gh/nextapps-de/snowflake@master/snowflake.min.js"></script>
```

### Demo

[https://nextapps-de.github.io/snowflake/demo/index.html](https://nextapps-de.github.io/snowflake/demo/index.html)

## Controls

### Hide/Stop Snowflake:

```js
Snowflake.stop();
```

### Show/Start Snowflake:

```js
Snowflake.start();
```

> The library will automatically start when loading the library

### Set Flake Speed

```js
// twice
Snowflake.speed(2);
// half
Snowflake.speed(0.5);
// standard
Snowflake.speed(1);
```

### Set Flake Density

```js
// twice
Snowflake.density(2);
// half
Snowflake.density(0.5);
// standard
Snowflake.density(1);
```

> The amount of flakes is calculated by the pixel amount of the viewport.

### Set Flake Size

```js
// twice
Snowflake.size(2);
// half
Snowflake.size(0.5);
// standard
Snowflake.size(1);
```

### Set Flake Quality

```js
// Best
Snowflake.quality(2);
// Low
Snowflake.quality(0.5);
// Standard
Snowflake.quality(1);
```

> Higher quality consumes more performance, lower quality will instead gain performance.

### Adjust Opacity:

```js
Snowflake.opacity(0.5);
```

### Adjust Z-Index:

```js
Snowflake.index(1);
```

> If you have issues to place the snowflake as background behind other elements try using a negative z-index value e.g. `Snowflake.index(-1);`.

### Adjust Position

```js
Snowflake.style({ 
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
});
```

### Custom Flake Image-Source

```js
Snowflake.image("img/background.jpg");
```

Or

```js
Snowflake.image("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAADFBMVEXk7PTk7PTk7PQAAAAAkx47AAAABHRSTlOQSfwAyZGfwAAAAdRJREFUeF6Fk7FOhEAQhvcNrHwCO+xteQfj5hKfQHmAa6m0sCGxv5soiSxcQWd5lJprzcWExt7KUIzJBRh3djYIWEgCu/kIP//M/qNIrr7yGw++EI4m4LBdZxPQ3N6XE9AWRTUBFBQ0BbvNCLShFSl5FfCOQCT3uwPXv+DKgWjpAa5yB+o1ULOEknCbOoCPIE7xLnGgK4Cap/uEsIgdWATATkNCs7eA94l1aojQUgGZdWr1agGkL3Lr1OpFx9rXEsXUA3VmKK4GNobpADBjUCcD6HIGUShARBBEwoMaEDAdAcwQrIQAEUEQCVKv1LKn5Yq9V3SiPsOeXa+3/KzajTokLI+P3IsobjLVpvQZ2p7YXnQb2lVqb3R9oxeB2evzVAcLVcyuv2Bf6MsbrQOj9fkDf9JaJWuJRd1WHUqS3wJREDel2lVi7Jkby8Z21LOlMz7GpqJT9U1kLRmEyC5EH778FKGGcYMSBMxGIAoRunwAVsI1OR4ApgxERIkEAxFRIuGOMvdAa+MPW2ufD/bu4yCA3/4GhnQA1EmkfD4K4PIldLNYwhDcw3JVEnJPFPdiFu2refhfGPQOvI0GKOF1PGIpzYbQTAGHfwJ4PP4ZdYRyAtiHgB9fc1w25BtOVgAAAABJRU5ErkJggg==");
```

Disable flake image and just draw circle:

```js
Snowflake.image("");
```

### Custom CSS

```css
#snowflake{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 1;
    z-index: 99;
}
```

### Provide Config (Recommended)

Apply a config object to `window.SnowflakeConfig` before loading the library:  

```js
window.SnowflakeConfig = {
    speed: 1.2,
    size: 1.2,
    quality: 2.0,
    density: 2.0,
    opacity: 0.5,
    index: 9,
    image: "img/background.jpg",
    style: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
};
```

### Disable Autostart

```js
window.SnowflakeConfig = { 
    start: false
};
```

Or

```js
window.SnowflakeConfig = { 
    stop: true
};
```

### License:

Apache License 2.0