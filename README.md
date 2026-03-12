# Real-Time Crypto Market Dashboard

A small real-time cryptocurrency market dashboard built with **Next.js**, **React**, and **TypeScript**.  
The application displays live market data using Binance public WebSocket streams and uses Binance public REST APIs for initial data loading and chart/statistics enrichment.

## Features

- Markets list page with 10 supported trading pairs
- Dedicated market details page for each pair
- Real-time live price updates using WebSocket
- Connection status indicator
- Automatic WebSocket reconnection
- Favorites with persistence via localStorage
- Recent price chart on the details page
- Additional market metrics such as:
  - 24h high
  - 24h low
  - volume
  - best bid / ask
- Loading, error, and empty states
- Clean component-based architecture with TypeScript

## Supported Markets

- BTCUSDT
- ETHUSDT
- BNBUSDT
- SOLUSDT
- XRPUSDT
- ADAUSDT
- DOGEUSDT
- AVAXUSDT
- DOTUSDT
- MATICUSDT

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Recharts

## Data Sources

### REST API
Used for:
- initial market data
- 24h statistics
- chart data

Base URL:
`https://data-api.binance.vision`

### WebSocket
Used for:
- live ticker updates on the market details page

Base URL:
`wss://stream.binance.com:9443`

## Project Structure

```text
src/
  app/
    page.tsx
    loading.tsx
    not-found.tsx
    markets/[symbol]/
      page.tsx
      loading.tsx
      not-found.tsx
      error.tsx

  components/
    markets/
    ui/

  hooks/
    useFavorites.ts
    useMarketTicker.ts

  lib/
    api/
    constants/
    formatters/
    storage/
    websocket/

  types/