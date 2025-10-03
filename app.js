document.addEventListener('DOMContentLoaded', () => {
    const deviceTypes = {
        relay: {
            path: 'relay',
            commands: ['on', 'off', 'toggle'],
            extras: ['timer']
        },
        light: {
            path: 'light',
            commands: ['on', 'off', 'toggle'],
            extras: ['timer', 'brightness']
        },
        roller: {
            path: 'roller',
            commands: ['open', 'close', 'stop', 'to_pos'],
            extras: ['roller_pos', 'duration']
        },
        color: {
            path: 'color',
            commands: ['on', 'off', 'toggle'],
            extras: ['timer', 'red', 'green', 'blue', 'white']
        }
    };

    const devices = {
        pro1: 'relay',
        pro2: 'relay',
        pro4pm: 'relay',
        plug: 'relay',
        dimmer2: 'light',
        'light-plus': 'light',
        roller: 'roller',
        rgbw2: 'color',
        other: null
    };

    const deviceEl = document.getElementById('device');
    const actionEl = document.getElementById('action');
    const extrasWrapper = document.getElementById('extras');
    const ipEl = document.getElementById('ip');
    const channelEl = document.getElementById('channel');
    const generateBtn = document.getElementById('generate');
    const outputEl = document.getElementById('output');
    const outputWrapper = document.getElementById('outputWrapper');
    const copyBtn = document.getElementById('copy');

    function clearElement(el) {
        while (el.firstChild) el.removeChild(el.firstChild);
    }

    function loadActions() {
        const type = devices[deviceEl.value];
        clearElement(actionEl);
        clearElement(extrasWrapper);
        if (!type || !deviceTypes[type]) return;

        const { commands, extras } = deviceTypes[type];
        commands.forEach(cmd => {
            const opt = document.createElement('option');
            opt.value = cmd;
            opt.textContent = cmd.toUpperCase();
            actionEl.appendChild(opt);
        });

        extras.forEach(extra => {
            const label = document.createElement('label');
            label.setAttribute('for', extra);
            label.textContent = extra.replace('_', ' ').toUpperCase();
            const input = document.createElement('input');
            input.id = extra;
            input.name = extra;
            input.placeholder = `Enter ${extra}`;
            input.type = 'number';
            if (extra === 'red' || extra === 'green' || extra === 'blue' || extra === 'white') {
                input.min = 0;
                input.max = 255;
            } else if (extra === 'brightness' || extra === 'roller_pos') {
                input.min = 0;
                input.max = 100;
            } else {
                input.min = 0;
            }
            extrasWrapper.append(label, input);
        });
    }

    function buildUrl() {
        const ip = ipEl.value.trim();
        if (!ip) {
            alert('Please enter the device IP.');
            return '';
        }

        const type = devices[deviceEl.value];
        if (!type || !deviceTypes[type]) {
            alert('Unsupported or unknown device type.');
            return '';
        }

        const { path, extras } = deviceTypes[type];
        const action = actionEl.value;
        const channel = channelEl.value.trim() || '0';

        const params = new URLSearchParams();

        if (type === 'roller') {
            if (action === 'to_pos') {
                params.set('roller_pos', document.getElementById('roller_pos')?.value || '');
            } else {
                params.set('go', action);
            }
        } else {
            params.set('turn', action);
        }

        extras.forEach(extra => {
            const val = document.getElementById(extra)?.value;
            if (val) params.set(extra, val);
        });

        return `http://${ip}/${path}/${channel}?${params.toString()}`;
    }

    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed'; // avoid scrolling to bottom
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
            document.execCommand('copy');
            alert('URL copied to clipboard!');
        } catch (err) {
            alert('Copy failed.');
        }
        document.body.removeChild(textarea);
    }

    function copyToClipboard(text) {
        if (!text) return;
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text)
                .then(() => alert('URL copied to clipboard!'))
                .catch(() => fallbackCopy(text));
        } else {
            fallbackCopy(text);
        }
    }

    // Event listeners
    deviceEl.addEventListener('change', loadActions);

    generateBtn.addEventListener('click', () => {
        const url = buildUrl();
        if (url) {
            outputEl.textContent = url;
            outputWrapper.classList.remove('hidden');
        }
    });

    copyBtn.addEventListener('click', () => {
        copyToClipboard(outputEl.textContent);
    });

    // Initialize
    loadActions();
});
