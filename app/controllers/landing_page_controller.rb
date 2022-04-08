require 'http'

class LandingPageController < ApplicationController
  before_action :require_login, :refresh_token

  def dashboard
    @user = current_user
  end

  private

  def require_login
    redirect_to root_path if current_user.nil?
  end

  def refresh_token
    return unless token_expired?

    response = http_refresh_token_json_response

    current_user['credentials']['token'] = response['access_token']
    current_user['credentials']['expires_at'] = (Time.now + response['expires_in']).to_i
  end

  def token_expired?
    Time.now.to_i > current_user['credentials']['expires_at']
  end

  def followed_artists
    url = 'https://api.spotify.com/v1/me/following'

    artists = []
    next_url = nil

    loop do
      response = http_artists_json_response(next_url || url)

      artists += response['artists']['items']
      next_url = response['artists']['next']

      return artists unless next_url
    end
  end

  def http_artists_json_response(url)
    token = current_user['credentials']['token']

    JSON.parse HTTP
      .headers('Content-Type' => 'application/json')
      .auth("Bearer #{token}")
      .get(url, params: { type: 'artist', limit: 50 })
  end

  def http_refresh_token_json_response
    url = 'https://accounts.spotify.com/api/token'
    base64_encoded_auth = Base64.strict_encode64("#{Figaro.env.spotify_client_id}:#{Figaro.env.spotify_client_secret}")
    headers = { 'Content-Type' => 'application/x-www-form-urlencoded',
                'Authorization' => "Basic #{base64_encoded_auth}" }
    params = { 'grant_type' => 'refresh_token', 'refresh_token' => current_user['credentials']['refresh_token'] }

    JSON.parse HTTP
      .headers(headers)
      .post(url, params: params)
  end
end
