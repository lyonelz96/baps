require 'http'

class LandingPageController < ApplicationController
  before_action :require_login

  def dashboard
    render json: followed_artists
  end

  private

  def require_login
    redirect_to root_path if current_user.nil?
  end

  def followed_artists
    url = 'https://api.spotify.com/v1/me/following'
    token = current_user['credentials']['token']

    artists = []
    next_url = nil

    loop do
      response = http_artists_json_response(token, next_url || url)

      artists += response['artists']['items']
      next_url = response['artists']['next']

      return artists unless next_url
    end
  end

  def http_artists_json_response(token, url)
    JSON.parse HTTP
      .headers('Content-Type' => 'application/json')
      .auth("Bearer #{token}")
      .get(url, params: { type: 'artist', limit: 50 })
  end
end
