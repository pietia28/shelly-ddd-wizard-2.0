export const Switch = {
    service: "Switch",
    methods: {
        on: {
            method: "Set",
            params: { on: true },
            extras: ["id", "toggle_after"]
        },
        off: {
            method: "Set",
            params: { on: false },
            extras: ["id", "toggle_after"]
        },
        toggle: {
            method: "Toggle",
            params: {},
            extras: ["id"]
        }
    }
};
