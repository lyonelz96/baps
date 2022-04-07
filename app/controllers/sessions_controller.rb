class SessionsController < ApplicationController
  def create
    session[:user] = request.env['omniauth.auth'].except(:extra)
    redirect_to dashboard_path(session[:user][:uid])
  end
end
