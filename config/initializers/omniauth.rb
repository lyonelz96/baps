Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify,
           Figaro.env.spotify_client_id,
           Figaro.env.spotify_client_secret,
           scope: 'user-follow-read'
end
