# lumel_task

## 📦 Prerequisites
- Node.js >= 16
- MongoDB instance (local or remote)
- Create a `.env` file in the root directory with:
```
PORT=3000
MONGO_DB_URL=
DATABASE=lumel
```


## 🚀 Getting Started
1. Install dependencies:
```bash
npm install
```

2. Place your input file `sample.csv` in the root directory.

3. Run the server:
```bash
npm run dev
```

This starts the API at `http://localhost:3000`

## 🔄 CSV Data Refresh
- Auto-refreshes daily at 12 AM using cron.
- Logs are saved to `refresh.log`
- You can trigger a manual refresh:
```http
POST /api/refresh
Body: { "filePath": "./sample.csv" }
```

## 📊 API Endpoints
- `GET /api/revenue?from=&to=&region=&product=`
- `POST /api/refresh`

