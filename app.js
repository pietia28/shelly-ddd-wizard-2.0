import { Switch } from "./devices/switch.js";
import { Light } from "./devices/light.js";
import { RGBW } from "./devices/rgbw.js";
import { Cover } from "./devices/cover.js";

document.addEventListener("DOMContentLoaded", () => {
    const deviceMap = {
        pro1: Switch,
        pro2: Switch,
        pro4pm: Switch,
        plug: Switch,
        dimmer2: Light,
        "light-plus": Light,
        roller: Cover,
        rgbw2: RGBW,
        other: null
    };

    const deviceEl = document.getElementById("device");
    const actionEl = document.getElementById("action");
    const extrasWrapper = document.getElementById("extras");
    const ipEl = document.getElementById("ip");
    const generateBtn = document.getElementById("generate");
    const outputEl = document.getElementById("output");
    const outputWrapper = document.getElementById("outputWrapper");
    const copyBtn = document.getElementById("copy");

    function clearElement(el) {
        while (el.firstChild) el.removeChild(el.firstChild);
    }

    function loadActions() {
        const dev = deviceMap[deviceEl.value];
        clearElement(actionEl);
        clearElement(extrasWrapper);
        if (!dev) return;

        Object.keys(dev.methods).forEach(cmd => {
            const opt = document.createElement("option");
            opt.value = cmd;
            opt.textContent = cmd.toUpperCase();
            actionEl.appendChild(opt);
        });

        loadExtrasForAction();
    }

    function loadExtrasForAction() {
        const dev = deviceMap[deviceEl.value];
        clearElement(extrasWrapper);
        if (!dev) return;

        const action = actionEl.value;
        const method = dev.methods[action];
        if (!method) return;

        const extras = method.extras || [];
        extras.forEach(extra => {
            const label = document.createElement("label");
            label.textContent = extra.toUpperCase();
            const input = document.createElement("input");
            input.id = extra;
            input.name = extra;
            input.placeholder = `Enter ${extra}`;
            input.type = "number";

            if (extra === "red" || extra === "green" || extra === "blue" || extra === "white") {
                input.min = 0;
                input.max = 255;
            } else if (extra === "brightness" || extra === "pos" || extra === "gain" || extra === "temp") {
                input.min = 0;
                input.max = 100;
            } else if (extra === "toggle_after" || extra === "duration") {
                input.min = 0;
            } else if (extra === "id") {
                input.min = 0;
                input.step = 1;
            }

            extrasWrapper.append(label, input);
        });
    }

    function buildUrl() {
        const ip = ipEl.value.trim();
        if (!ip) {
            alert("Please enter the device IP.");
            return "";
        }

        const dev = deviceMap[deviceEl.value];
        if (!dev) {
            alert("Unsupported device.");
            return "";
        }

        const action = actionEl.value;
        const { method, params, extras } = dev.methods[action];

        const query = new URLSearchParams();
        Object.entries(params).forEach(([k, v]) => query.set(k, v));

        (extras || []).forEach(extra => {
            const val = document.getElementById(extra)?.value;
            if (val) query.set(extra, val);
        });

        return `http://${ip}/rpc/${dev.service}.${method}?${query.toString()}`;
    }

    function copyToClipboard(text) {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => alert("URL copied!"));
    }

    deviceEl.addEventListener("change", loadActions);
    actionEl.addEventListener("change", loadExtrasForAction);

    generateBtn.addEventListener("click", () => {
        const url = buildUrl();
        if (url) {
            outputEl.textContent = url;
            outputWrapper.classList.remove("hidden");
        }
    });

    copyBtn.addEventListener("click", () => copyToClipboard(outputEl.textContent));

    loadActions();
});
