type Platform = "MacOS" | "web";





// Factory Method

interface Button {
    render(): void;
    onClick(handler: () => void): void;
}

class MacOSButton implements Button {
    private handler: (() => void) | null = null;

    render(): void {
        console.log("[MacOS] Drawing a native OS button")
    }

    onClick(handler: () => void): void {
        console.log("[MacOS] Binding a native click event");
        this.handler = handler;
    }
}

class HTMLButton implements Button {
    private handler: (() => void) | null = null;

    render(): void {
        console.log("[Web] Rendering <button>OK</button>")
    }

    onClick(handler: () => void): void {
        console.log("[Web] Adding a browser 'click' listener");
        this.handler = handler;
    }
}

abstract class Dialog {
    abstract createButton(): Button;

    render(): void {
        const okButton = this.createButton();
        okButton.onClick(() => this.close());
        okButton.render();
    }

    close(): void {
            console.log("Dialog closed")
    }
}

class MacOSDialog extends Dialog {
    override createButton(): Button {
        return new MacOSButton ()
    }
}

class WebDialog extends Dialog {
    override createButton(): Button {
        return new HTMLButton()
    }
}

interface AppConfig {
    platform: Platform
}

class Application {
    private readonly dialog: Dialog;

    constructor(config: AppConfig) {
        this.dialog = Application.chooseDialog(config.platform)
    }

    private static chooseDialog(platform: Platform): Dialog {
        switch (platform) {
            case "MacOS":
                return new MacOSDialog();
            case "web":
                return new WebDialog();
            default: {
                const unknown: never = platform;
                throw new Error(`Unknown platform: ${String(unknown)}`)
            }
        }
    }

    run(): void {
        this.dialog.render()
    }
}

new Application({platform: "MacOS"}).run();
new Application({ platform: "web"}).run();