# Agent Skill：網頁應用開發

## 畫面拆解

### 1. Layout（版面配置）

- 主結構（Header、主內容區、Footer）
- 響應式設計（適應桌機/手機）
- 區塊分隔（如側邊欄、主區域、彈窗等）

### 2. Component（元件）

- AppHeader（頂部導覽列）
- SearchBar（搜尋欄）
- UnitDropdown（單位切換下拉選單）
- WeatherCard（天氣資訊卡片）
- Button（按鈕元件）
- LoadingSpinner（載入動畫）
- Notification（提示訊息）

### 3. Interaction（互動）

- 搜尋地點時自動補全
- 點擊單位切換下拉選單可選擇單位
- 點擊搜尋按鈕觸發查詢
- 資料載入時顯示 Loading
- 查詢失敗時顯示錯誤提示
- 點擊卡片可展開更多天氣細節

### 4. Data Model（資料模型）

- UserInput：{ location: string, unit: 'metric' | 'imperial' }
- WeatherData：{ temp: number, humidity: number, windSpeed: number, precipitation: number, ... }
- UIState：{ isLoading: boolean, error: string | null, showDropdown: boolean }
- SuggestionList：Array<{ name: string, id: string }>

---
