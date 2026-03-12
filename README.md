# Real-Time Crypto Market Dashboard

A real-time cryptocurrency market dashboard built with **Next.js**, **React**, and **TypeScript**.

The application uses **Binance public REST APIs** for initial market data and chart data, and **Binance public WebSocket streams** for live market updates.

## Repository

Crypto Market Dashboard  
https://github.com/majd007n82-ui/Crypto-Market-Dashboard.git

## Features

- Markets list page with 10 supported trading pairs
- Dedicated market details page for each supported market
- Real-time market updates on the details page via WebSocket
- Combined WebSocket stream for live updates on the markets list page
- Connection status indicators
- Automatic reconnection for live socket streams
- Manual retry controls for live connection recovery
- Favorites persistence using localStorage
- Favorites-only filter on the markets list page
- Selectable chart ranges on the market details page
- Additional market metrics such as:
  - 24h high
  - 24h low
  - volume
  - best bid / ask
- Loading, error, and not-found states
- Responsive card-based UI

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
- initial market list data
- market details data
- chart data

Base URL:
`https://data-api.binance.vision`

### WebSocket
Used for:
- real-time market details updates
- combined live updates for the markets list page

Base URL:
`wss://stream.binance.com:9443`

## Project Structure

```text
src/
  app/
    page.tsx
    loading.tsx
    error.tsx
    not-found.tsx
    markets/[symbol]/
      page.tsx
      loading.tsx
      error.tsx
      not-found.tsx

  components/
    markets/
    ui/

  hooks/
    useFavorites.ts
    useMarketTicker.ts
    useMarketsTickerStream.ts

  lib/
    api/
    constants/
    formatters/
    storage/
    websocket/

  types/





  Architecture Notes
App structure

The app uses the Next.js App Router.
The main markets list page and market details pages are implemented as route-based pages under src/app.

Data fetching

Initial market data and chart data are fetched from Binance public REST endpoints on the server side.

Real-time updates

The app uses client-side WebSocket hooks for live market data:

the details page subscribes to the selected market ticker stream

the markets list page uses a combined WebSocket stream for multiple markets

State management

State is intentionally lightweight:

server-side fetching for initial page data

local React state inside custom hooks for live WebSocket updates

localStorage for favorites persistence and filtering

Failure handling

Route validation returns notFound() for unsupported symbols

Dedicated loading, error, and not-found pages improve UX

If REST succeeds but WebSocket fails, the UI still shows the latest loaded data and displays the socket state clearly

Manual retry actions are available for socket recovery

Assumptions

Only a fixed list of 10 supported symbols is included

Real-time updates are most important on the market details page, while the markets list also receives lightweight combined live updates

Chart data is loaded from REST and is range-selectable, but is not streamed live with kline sockets

Binance public endpoints are available without authentication for market data use cases

Technical Trade-offs

The chart is loaded through REST only, which keeps the implementation simpler and more stable within the assignment time constraint

A lightweight custom hook approach was used instead of introducing heavier global state libraries

The app prioritizes clarity, maintainability, and resilience over adding more advanced charting complexity such as live candlestick streaming

What I Would Improve With More Time

Add optional live kline updates for the chart

Add market sorting options such as top gainers / top losers

Add unit tests for formatters, storage helpers, and WebSocket hooks

Improve accessibility and keyboard navigation further

Add more responsive polish for smaller screens

Add small performance optimizations around memoization and stream update batching

Notes

This project uses public Binance market data only and does not require authentication or private API access.