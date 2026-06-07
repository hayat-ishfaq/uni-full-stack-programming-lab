function normalizeCountryCode(value) {
  if (!value) {
    return ''
  }

  const normalized = value.trim().toLowerCase()

  if (!/^[a-z]{2}$/.test(normalized)) {
    return ''
  }

  return normalized
}

module.exports = { normalizeCountryCode }
