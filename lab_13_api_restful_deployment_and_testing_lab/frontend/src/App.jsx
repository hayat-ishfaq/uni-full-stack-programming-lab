import { useState } from 'react'
import './App.css'

const DEFAULT_LIMIT = 6

function App() {
  const [activeTab, setActiveTab] = useState('weather')
  const [city, setCity] = useState('Dhaka')
  const [country, setCountry] = useState('us')
  const [weather, setWeather] = useState(null)
  const [news, setNews] = useState(null)
  const [weatherStatus, setWeatherStatus] = useState('idle')
  const [newsStatus, setNewsStatus] = useState('idle')
  const [weatherError, setWeatherError] = useState('')
  const [newsError, setNewsError] = useState('')

  const fetchWeather = async () => {
    const normalizedCity = city.trim()
    if (!normalizedCity) {
      setWeatherError('Enter a city name to get the forecast.')
      return
    }

    setWeatherStatus('loading')
    setWeatherError('')

    try {
      const response = await fetch(
        `/api/weather/${encodeURIComponent(normalizedCity)}`,
      )
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Unable to fetch weather data.')
      }

      setWeather(data)
      setWeatherStatus('success')
    } catch (error) {
      setWeatherStatus('error')
      setWeatherError(error.message)
    }
  }

  const fetchNews = async () => {
    const normalizedCountry = country.trim().toLowerCase()
    if (!/^[a-z]{2}$/.test(normalizedCountry)) {
      setNewsError('Use a valid 2-letter country code (e.g. us, gb, in).')
      return
    }

    setNewsStatus('loading')
    setNewsError('')

    try {
      const response = await fetch(
        `/api/news/${normalizedCountry}?limit=${DEFAULT_LIMIT}`,
      )
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Unable to fetch news data.')
      }

      setNews(data)
      setNewsStatus('success')
    } catch (error) {
      setNewsStatus('error')
      setNewsError(error.message)
    }
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-text">
          <p className="eyebrow">Lab 13 | Express + Vite + MongoDB Atlas</p>
          <h1>Unified Weather and News Hub</h1>
          <p className="subtitle">
            Switch between real-time city forecasts and top headlines with a
            single API-powered workspace.
          </p>
          <div className="tab-row" role="tablist" aria-label="App menu">
            <button
              type="button"
              className={activeTab === 'weather' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('weather')}
            >
              Weather
            </button>
            <button
              type="button"
              className={activeTab === 'news' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('news')}
            >
              News
            </button>
          </div>
        </div>
        <div className="hero-card">
          <div className="metric">
            <span className="label">Backend routes</span>
            <strong>/api/weather</strong>
            <strong>/api/news</strong>
          </div>
          <div className="metric">
            <span className="label">External services</span>
            <strong>OpenWeather</strong>
            <strong>News API</strong>
          </div>
        </div>
      </header>

      <main className="panel">
        {activeTab === 'weather' ? (
          <section className="panel-content" aria-live="polite">
            <div className="panel-header">
              <div>
                <h2>City Weather Forecast</h2>
                <p>Search any city and get live temperature + conditions.</p>
              </div>
              <form
                className="form-row"
                onSubmit={(event) => {
                  event.preventDefault()
                  fetchWeather()
                }}
              >
                <input
                  type="text"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="Enter city name"
                  aria-label="City name"
                />
                <button type="submit" className="primary">
                  {weatherStatus === 'loading' ? 'Loading...' : 'Get Weather'}
                </button>
              </form>
            </div>

            {weatherError && <p className="error">{weatherError}</p>}

            {weather && (
              <div className="result-grid">
                <div className="result-card">
                  <span>City</span>
                  <strong>{weather.city}</strong>
                </div>
                <div className="result-card">
                  <span>Temperature</span>
                  <strong>{weather.temperature}°C</strong>
                </div>
                <div className="result-card">
                  <span>Condition</span>
                  <strong className="capitalize">{weather.condition}</strong>
                </div>
                <div className="result-card">
                  <span>Humidity</span>
                  <strong>{weather.humidity}%</strong>
                </div>
              </div>
            )}
          </section>
        ) : (
          <section className="panel-content" aria-live="polite">
            <div className="panel-header">
              <div>
                <h2>Top Headlines</h2>
                <p>Fetch 5-10 latest headlines by country code.</p>
              </div>
              <form
                className="form-row"
                onSubmit={(event) => {
                  event.preventDefault()
                  fetchNews()
                }}
              >
                <input
                  type="text"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  placeholder="Country code (us, gb, in)"
                  aria-label="Country code"
                />
                <button type="submit" className="primary">
                  {newsStatus === 'loading' ? 'Loading...' : 'Get News'}
                </button>
              </form>
            </div>

            {newsError && <p className="error">{newsError}</p>}

            {news?.articles?.length ? (
              <div className="news-list">
                {news.articles.map((article, index) => (
                  <article key={`${article.url}-${index}`} className="news-card">
                    {article.imageUrl ? (
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="news-image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="news-image placeholder" aria-hidden="true">
                        <span>No image</span>
                      </div>
                    )}
                    <div className="news-content">
                      <h3>{article.title}</h3>
                      <p className="meta">
                        {article.source || 'Unknown source'} ·{' '}
                        {article.publishedAt
                          ? new Date(article.publishedAt).toLocaleString()
                          : 'No date'}
                      </p>
                      <a href={article.url} target="_blank" rel="noreferrer">
                        Read
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              newsStatus === 'success' && (
                <p className="empty">No headlines found for this country.</p>
              )
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        <p>
          API endpoints: <span>/api/weather/:city</span> ·{' '}
          <span>/api/news/:country</span>
        </p>
      </footer>
    </div>
  )
}

export default App
