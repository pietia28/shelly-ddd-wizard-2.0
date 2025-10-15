# Shelly DDD Wizard (Gen2 RPC)

A simple web-based tool to generate control URLs for **Shelly Gen2 devices** using the **RPC API**.  
This wizard helps you quickly create URLs for testing, debugging, or integrating Shelly devices without writing code manually.  

---

## 🚀 Features

- Supports **Shelly Gen2 RPC API** (`/rpc/Service.Method?...`)  
- Modular design – each device type has its own definition in `devices/*.js`  
- Dynamic form fields depending on selected device and action  
- Copy generated URL to clipboard with one click  
- Modern UI with clean styles  

---

## 📂 Supported Components

### 🔌 Switch  
- Methods: `Set (on/off)`, `Toggle`  
- Parameters: `id`, `on`, `toggle_after`  

### 💡 Light  
- Methods: `Set (on/off)`, `Toggle`  
- Parameters: `id`, `on`, `brightness`, `transition_duration`, `toggle_after`, `offset`  

### 🌈 RGBW  
- Methods: `Set (on/off)`, `Toggle`  
- Parameters:  
  - `id`  
  - `on`  
  - `brightness` (1–100)  
  - `rgb` (comma-separated `R,G,B`, 0–255 each)  
  - `white` (0–255)  
  - `transition_duration`  
  - `toggle_after`  
  - `offset` (-100…100)  
  - `offset_white` (-255…255)  

### 🪟 Cover  
- Methods: `Open`, `Close`, `Stop`, `GoToPosition`  
- Parameters: `id`, `pos` (0–100 for position)  

---

## 📖 How to Use

1. Clone or download this repository.  
2. Open `index.html` in your browser.  
3. Select a **device** and an **action** from the dropdowns.  
4. Fill in the required and optional parameters.  
5. Click **Generate URL** to get the RPC call.  
6. Copy the URL and test it in your browser or automation system.  

---

## 🛠️ Project Structure

```
/shelly-wizard
 ├── index.html        # main UI
 ├── style/style.css   # styles
 ├── app.js            # main logic
 └── devices/          # per-device definitions
      ├── switch.js
      ├── light.js
      ├── rgbw.js
      └── cover.js
```

---

## 📌 Example

Turn on a Switch on channel 0:  

```
http://192.168.1.50/rpc/Switch.Set?id=0&on=true
```

Set RGBW light to red, brightness 80%:  

```
http://192.168.1.51/rpc/RGBW.Set?id=0&rgb=255,0,0&brightness=80
```

Move cover to 50% position:  

```
http://192.168.1.52/rpc/Cover.GoToPosition?id=0&pos=50
```

---

## 🔮 Future Work / Roadmap

- [ ] Add **support for JSON/POST requests** (`/rpc` with body)  
- [ ] Extend support to other Shelly components:  
  - Input  
  - Thermostat  
  - PM (Power Meter)  
  - Sensor devices  
- [ ] Add **validation for parameter ranges** (e.g., RGB 0–255, brightness 1–100)  
- [ ] Provide **ready-to-use examples** for common automations  
- [ ] Option to **export generated calls** to scripts or automation platforms  
- [ ] Multi-language UI  

---

## 📜 License

MIT – feel free to use and modify. Contributions are welcome!
