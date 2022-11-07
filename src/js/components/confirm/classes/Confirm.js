import { icons } from "../modules/icons";
import { tools } from "../modules/tools";

class Confirm {
    constructor(data) {
        Object.assign(this, data);

        this.isClose = false;

        this.init();
    }

    init() {
        this.open();
    }

    question() {
        return new Promise((resolve, reject) => {
            if (!this.confirm || !this.acceptButton || !this.cancelButton || !this.closeButton) {
                reject("There was a problem creating the modal window");
                return;
            }

            this.confirm.addEventListener("click", () => {
                resolve(null);
                this.close();
            });

            this.acceptButton.addEventListener("click", () => {
                resolve(true);
                this.close();
            });

            this.cancelButton.addEventListener("click", () => {
                resolve(false);
                this.close();
            });

            this.closeButton.addEventListener("click", () => {
                resolve(null);
                this.close();
            });
        });
    }

    async open() {
        this.confirm = this.create();
        document.body.appendChild(this.confirm);

        if (document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)) {
            document.body.classList.add("noscroll");
        }

        await tools.animationend(this.confirm);
    }

    create() {
        const confirm = document.createElement("div");
        confirm.addEventListener("mousedown", this.checkClose.bind(this));
        confirm.addEventListener("touchstart", this.checkClose.bind(this), { passive: true });
        confirm.addEventListener("click", () => {
            if (this.isClose) {
                this.close();
            }
        });
        confirm.classList.add("confirm", "in");

        const content = document.createElement("div");
        content.classList.add("content");
        content.addEventListener("click", (e) => e.stopPropagation());
        confirm.appendChild(content);

        const header = document.createElement("div");
        header.classList.add("header");
        content.appendChild(header);

        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = this.title;
        header.appendChild(title);

        this.closeButton = document.createElement("button");
        this.closeButton.type = "button";
        this.closeButton.classList.add("close");
        header.appendChild(this.closeButton);

        const closeIcon = icons.get("x-lg");
        this.closeButton.appendChild(closeIcon);

        const body = document.createElement("div");
        body.classList.add("body");
        content.appendChild(body);

        const description = document.createElement("div");
        description.classList.add("description");
        description.textContent = this.description;
        body.appendChild(description);

        const footer = document.createElement("div");
        footer.classList.add("footer");
        content.appendChild(footer);

        this.cancelButton = document.createElement("button");
        this.cancelButton.type = "button";
        this.cancelButton.arialLabel = "Cancelar";
        this.cancelButton.classList.add("btn", "secondary-btn");
        this.cancelButton.textContent = this.cancel;
        footer.appendChild(this.cancelButton);

        this.acceptButton = document.createElement("button");
        this.acceptButton.type = "button";
        this.acceptButton.arialLabel = "Aceptar";
        this.acceptButton.classList.add("btn", "primary-btn");
        this.acceptButton.textContent = this.accept;
        footer.appendChild(this.acceptButton);

        return confirm;
    }

    checkClose(e) {
        if (e.target === this.confirm) {
            this.isClose = true;
        }
    }

    async close() {
        this.isClose = false;

        document.body.classList.remove("noscroll");
        this.confirm.classList.add("out");

        await tools.animationend(this.confirm);

        this.destroy();
    }

    destroy() {
        this.confirm.remove();
        delete this;
    }
}

export default Confirm;