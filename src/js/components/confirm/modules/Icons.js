export const icons = (() => {
    const icons = [
        {
            name: "x-lg",
            paths: [
                {
                    d: "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z",
                },
            ],
        },
    ];

    const createIcon = (icon) => {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", `${icon.width || 16}`);
        svg.setAttribute("height", `${icon.height || 16}`);
        svg.setAttribute("fill", "currentColor");
        svg.setAttribute("viewBox", `0 0 ${icon.width || 16} ${icon.height || 16}`);
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

        icon.paths.forEach((path) => {
            const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
            if (path.fillRule) {
                pathElement.setAttribute("fill-rule", path.fillRule);
            }
            pathElement.setAttribute("d", path.d);
            svg.appendChild(pathElement);
        });

        return svg;
    };

    const get = (name) => {
        const icon = icons.find((icon) => icon.name === name);
        if (!icon) {
            return null;
        }
        return createIcon(icon);
    };

    return {
        get,
    };
})();
