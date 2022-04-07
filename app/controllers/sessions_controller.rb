class SessionsController < ApplicationController
  def create
    session[:user] = request.env['omniauth.auth'].except(:extra)
  end
end
