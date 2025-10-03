export const Light = {
    service: "Light",
    methods: {
        on: {
            method: "Set",
            params: { on: true },
            extras: ["id", "brightness", "transition_duration", "toggle_after", "offset"]
        },
        off: {
            method: "Set",
            params: { on: false },
            extras: ["id", "transition_duration", "toggle_after"]
        },
        toggle: {
            method: "Toggle",
            params: {},
            extras: ["id"]
        }
    }
};
