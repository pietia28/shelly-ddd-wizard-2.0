export const Cover = {
    service: "Cover",
    methods: {
        open: {
            method: "Open",
            params: {},
            extras: ["id"]
        },
        close: {
            method: "Close",
            params: {},
            extras: ["id"]
        },
        stop: {
            method: "Stop",
            params: {},
            extras: ["id"]
        },
        to_pos: {
            method: "GoToPosition",
            params: {},
            extras: ["id", "pos"]
        }
    }
};
