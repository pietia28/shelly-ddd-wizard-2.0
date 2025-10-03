export const RGBW = {
    service: "RGBW",
    methods: {
        on: {
            method: "Set",
            params: { on: true },
            extras: [
                "id",
                "brightness",
                "rgb",               // [r,g,b]
                "white",
                "transition_duration",
                "toggle_after",
                "offset",
                "offset_white"
            ]
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
